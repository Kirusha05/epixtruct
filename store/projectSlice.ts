import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ClientView,
  ExpenseType,
  IAvans,
  IAvansExchange,
  IExpense,
  IMuncitor,
  IProject,
  ISalariu,
  ProjectProps
} from '../types';
import { roundAmount, EMPTY_PROJECT, totalSalaryByCurrency } from '../utils';
import { HYDRATE } from 'next-redux-wrapper';

const projectSlice = createSlice({
  name: 'projects',
  initialState: EMPTY_PROJECT,
  reducers: {
    setProject(_, action: PayloadAction<IProject>) {
      const newProject = { ...action.payload };
      // Empty arrays aren't accepted by Firebase DB, so implicitly set empty "salarii" in the store
      for (let worker of newProject.workers) {
        if (!worker.salarii) worker.salarii = [];
      }
      return newProject;
    },
    setProjectName(state, action: PayloadAction<string>) {
      const newName = action.payload;
      state.name = newName;

      // for (let expense of state.achizitii) {
      //   if (!expense.currency) expense.currency = 'mdl';
      // }
    },
    invertClientAccess(state, action: PayloadAction<ProjectProps>) {
      const propToInvert = action.payload;
      const invertedProp = !state.clientAccess[propToInvert];
      state.clientAccess[propToInvert] = invertedProp;
    },
    addAvans(state, action: PayloadAction<IAvans>) {
      const avans = action.payload;

      state.avansuri.push(avans);

      const { details } = state;
      details.totalCredit[avans.currency] = roundAmount(
        details.totalCredit[avans.currency] + avans.amount
      );
      details.remainingCredit[avans.currency] = roundAmount(
        details.totalCredit[avans.currency] - details.usedCredit[avans.currency]
      );
    },
    deleteAvans(state, action: PayloadAction<string>) {
      const avansID = action.payload;

      const avansIdx = state.avansuri.findIndex(
        (avans) => avans.id === avansID
      );
      const avans = state.avansuri[avansIdx];
      const { details } = state;

      // Substract the remaining currency from the current total amount
      details.totalCredit[avans.currency] = roundAmount(
        details.totalCredit[avans.currency] - avans.amountAvailableForExchange
      );

      // Calculate the new remaining amount
      details.remainingCredit[avans.currency] = roundAmount(
        details.totalCredit[avans.currency] - details.usedCredit[avans.currency]
      );

      // Substract the exchanged amount (in MDL) from the current total MDL amount
      if (avans.exchanges) {
        const avansExchangesAmount = avans.exchanges.reduce(
          (acc, cur) => acc + cur.amountInMDL,
          0
        );

        details.totalCredit.mdl = roundAmount(
          details.totalCredit.mdl - avansExchangesAmount
        );
        details.remainingCredit.mdl = roundAmount(
          details.totalCredit.mdl - details.usedCredit.mdl
        );
      }

      state.avansuri.splice(avansIdx, 1);
    },
    addExchange(
      state,
      action: PayloadAction<{ avansID: string; exchange: IAvansExchange }>
    ) {
      const { avansID, exchange } = action.payload;

      const avansIdx = state.avansuri.findIndex(
        (avans) => avans.id === avansID
      );

      const avans = state.avansuri[avansIdx];
      avans.amountAvailableForExchange = roundAmount(
        avans.amountAvailableForExchange - exchange.amount
      );

      // Create Exchanges array if not existing and/or add the new exchange
      if (!avans.exchanges) avans.exchanges = [];
      avans.exchanges.push(exchange);

      const { totalCredit, usedCredit, remainingCredit } = state.details;
      const exchangedCurrency = avans.currency;

      // Substract the amount exchanged from the total credit of the exchanged currency
      totalCredit[exchangedCurrency] = roundAmount(
        totalCredit[exchangedCurrency] - exchange.amount
      );

      // Add the amount in MDL exchanged to the total credit in MDL
      totalCredit.mdl = roundAmount(totalCredit.mdl + exchange.amountInMDL);

      // Calculate the remaining credit for the exchanged currency
      remainingCredit[exchangedCurrency] = roundAmount(
        totalCredit[exchangedCurrency] - usedCredit[exchangedCurrency]
      );

      // Calculate the remaining credit for MDL
      remainingCredit.mdl = roundAmount(totalCredit.mdl - usedCredit.mdl);
    },
    removeExchange(
      state,
      action: PayloadAction<{ avansID: string; exchangeID: string }>
    ) {
      const { avansID, exchangeID } = action.payload;

      const avansIdx = state.avansuri.findIndex(
        (avans) => avans.id === avansID
      );
      const avans = state.avansuri[avansIdx];

      const exchangeIdx = avans.exchanges!.findIndex(
        (exchange) => exchange.id === exchangeID
      );
      const exchange = avans.exchanges![exchangeIdx];

      const { details } = state;

      // Add the exchange amount back to the total amount of the given currency
      details.totalCredit[avans.currency] = roundAmount(
        details.totalCredit[avans.currency] + exchange.amount
      );

      // Calculate the new remaining amount for the given currency
      details.remainingCredit[avans.currency] = roundAmount(
        details.totalCredit[avans.currency] - details.usedCredit[avans.currency]
      );

      // Remove the exchange amount in MDL from total MDL amount
      details.totalCredit.mdl = roundAmount(
        details.totalCredit.mdl - exchange.amountInMDL
      );

      // Calculate the new remaining amount for MDL
      details.remainingCredit.mdl = roundAmount(
        details.totalCredit.mdl - details.usedCredit.mdl
      );

      // Add the exchanged amount to availableForExchange
      avans.amountAvailableForExchange = roundAmount(avans.amountAvailableForExchange + exchange.amount);
      
      // Finally remove the exchange from the array
      avans.exchanges!.splice(exchangeIdx, 1);
    },
    addExpense(
      state,
      action: PayloadAction<{ expense: IExpense; expenseType: ExpenseType }>
    ) {
      const { expense, expenseType } = action.payload;
      state[expenseType].push(expense);

      const { currency } = expense;
      const { details } = state;

      details.usedCredit[currency] = roundAmount(
        details.usedCredit[currency] + expense.totalPrice
      );
      details.remainingCredit[currency] = roundAmount(
        details.totalCredit[currency] - details.usedCredit[currency]
      );
    },
    editExpense(
      state,
      action: PayloadAction<{ expense: IExpense; expenseType: ExpenseType }>
    ) {
      const { expense: modifiedExpense, expenseType } = action.payload;
      let expenseIdx = state[expenseType].findIndex(
        (item) => item.id === modifiedExpense.id
      );
      let oldExpense = state[expenseType][expenseIdx];

      // We have to assume that even the frickin currency could have been modified
      const { currency: oldCurrency } = oldExpense;
      const { currency: modifiedCurrency } = modifiedExpense;
      const { details } = state;

      // Substract the old expense credit from the used credit of old currency
      details.usedCredit[oldCurrency] = roundAmount(
        details.usedCredit[oldCurrency] -
          oldExpense.totalPrice
      );

      // Add the modified expense credit to the used credit of the modified currency
      details.usedCredit[modifiedCurrency] = roundAmount(
        details.usedCredit[modifiedCurrency] + 
        modifiedExpense.totalPrice
      )

      // Recalculate the remaining credit of old currency
      details.remainingCredit[oldCurrency] = roundAmount(
        details.totalCredit[oldCurrency] - details.usedCredit[oldCurrency]
      );
      
      // Recalculate the remaining credit of modified currency
      details.remainingCredit[modifiedCurrency] = roundAmount(
        details.totalCredit[modifiedCurrency] - details.usedCredit[modifiedCurrency]
      );

      // Update the expense at the original index
      state[expenseType][expenseIdx] = modifiedExpense;
    },
    deleteExpense(
      state,
      action: PayloadAction<{ expenseID: string; expenseType: ExpenseType }>
    ) {
      const { expenseID, expenseType } = action.payload;
      const expenseIdx = state[expenseType].findIndex(
        (expense) => expense.id === expenseID
      );
      const expense = state[expenseType][expenseIdx];

      const { currency } = expense;
      const { details } = state;

      details.usedCredit[currency] = roundAmount(
        details.usedCredit[currency] - expense.totalPrice
      );
      details.remainingCredit[currency] = roundAmount(
        details.totalCredit[currency] - details.usedCredit[currency]
      );
      state[expenseType].splice(expenseIdx, 1);
    },
    addWorker(state, action: PayloadAction<IMuncitor>) {
      const newWorker = action.payload;
      state.workers.push(newWorker);
    },
    deleteWorker(state, action: PayloadAction<string>) {
      const workerID = action.payload;
      const workerIdx = state.workers.findIndex(
        (worker) => worker.id === workerID
      );

      const salarii = state.workers[workerIdx].salarii || [];
      const { details } = state;

      const totalEUR = totalSalaryByCurrency(salarii, 'eur');
      const totalUSD = totalSalaryByCurrency(salarii, 'usd');
      const totalMDL = totalSalaryByCurrency(salarii, 'mdl');

      /* Remove the whole salary sum of each currency from 
        the used credit and calculate new remaining credit */
      details.usedCredit.eur = roundAmount(details.usedCredit.eur - totalEUR);
      details.remainingCredit.eur = roundAmount(
        details.totalCredit.eur - details.usedCredit.eur
      );

      details.usedCredit.usd = roundAmount(details.usedCredit.usd - totalUSD);
      details.remainingCredit.usd = roundAmount(
        details.totalCredit.usd - details.usedCredit.usd
      );

      details.usedCredit.mdl = roundAmount(details.usedCredit.mdl - totalMDL);
      details.remainingCredit.mdl = roundAmount(
        details.totalCredit.mdl - details.usedCredit.mdl
      );

      // Finally remove the worker from the array
      state.workers.splice(workerIdx, 1);
    },
    addSalariu(
      state,
      action: PayloadAction<{ salariu: ISalariu; workerID: string }>
    ) {
      const { salariu, workerID } = action.payload;

      const worker = state.workers.find((worker) => worker.id === workerID)!;
      worker.salarii.push(salariu);

      const { currency } = salariu;
      const { details } = state;

      details.usedCredit[currency] = roundAmount(
        details.usedCredit[currency] + salariu.amount
      );
      details.remainingCredit[currency] = roundAmount(
        details.totalCredit[currency] - details.usedCredit[currency]
      );
    },
    deleteSalariu(
      state,
      action: PayloadAction<{ salariuID: string; workerID: string }>
    ) {
      const { salariuID, workerID } = action.payload;

      const worker = state.workers.find((worker) => worker.id === workerID)!;
      const salariuIdx = worker.salarii.findIndex(
        (salariu) => salariu.id === salariuID
      );
      const salariu = worker.salarii[salariuIdx];

      const { currency } = salariu;
      const { details } = state;

      details.usedCredit[currency] = roundAmount(
        details.usedCredit[currency] - salariu.amount
      );
      details.remainingCredit[currency] = roundAmount(
        details.totalCredit[currency] - details.usedCredit[currency]
      );
      worker.salarii.splice(salariuIdx, 1);
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.project
      };
    }
  }
});

export const {
  setProject,
  invertClientAccess,
  setProjectName,
  addAvans,
  deleteAvans,
  addExchange,
  removeExchange,
  addExpense,
  editExpense,
  deleteExpense,
  addWorker,
  deleteWorker,
  addSalariu,
  deleteSalariu
} = projectSlice.actions;
export default projectSlice.reducer;
