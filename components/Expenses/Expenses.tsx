import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { nanoid } from '@reduxjs/toolkit';
import { formatDate } from '../../utils';
import { addExpense } from '../../store/projectSlice';
import {
  AddIcon,
  Button,
  Collapsable,
  Empty,
  NextArrow,
  PageHighlight,
  PageInfo,
  PrevArrow,
} from '../UI';
import {
  ExpensesList,
  AddExpense,
  SearchIcon,
  SearchBtnText,
  ExpenseControls,
} from './Expenses.style';
import NewExpense from './NewExpense';
import Expense from './Expense';
import { ExpenseType, IExpense } from '../../types';
import ExpensesDetails from './ExpensesDetails';
import ExpenseSearch from './ExpenseSearch';

interface IProps {
  title: string;
  expenseType: ExpenseType;
}

export type SearchDate = {
  month: number;
  year: number;
};

export type SearchQuery = {
  name: string | null;
  date: SearchDate | null;
};

const expensesNumPerPage = 5;

const Expenses = ({ title, expenseType }: IProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const expenses = useAppSelector((state) => state.project[expenseType]);
  const [currentExpensesPageIndex, setCurrentExpensesPageIndex] = useState(0);
  const [searchActive, setSearchActive] = useState(false);
  const [searchingBy, setSearchingBy] = useState<SearchQuery | null>(null);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const paginatedExpenses = useMemo(() => {
  // const sortedList = useMemo(() => {
    let filteredExpenses = expenses;
    if (searchingBy) {
      filteredExpenses = expenses.filter((expense) => {
        if (searchingBy.name) {
          const nameMatched = expense.name
            .toLowerCase()
            .includes(searchingBy.name.toLowerCase());
          return nameMatched;
        }

        if (searchingBy.date) {
          const expenseDate: SearchDate = {
            month: new Date(expense.date).getMonth(),
            year: new Date(expense.date).getFullYear(),
          };

          return (
            expenseDate.month === searchingBy.date.month &&
            expenseDate.year === searchingBy.date.year
          );
        }
      });
    }

    const sortedList = filteredExpenses
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const paginatedList: Array<IExpense[]> = [];
    for (let i = 0; i < sortedList.length; i++) {
      const pageIndex = Math.floor(i / expensesNumPerPage);
      if (paginatedList[pageIndex] === undefined) paginatedList[pageIndex] = [];
      const expenseToInsert = sortedList[i];
      paginatedList[pageIndex].push(expenseToInsert);
    }

    setCurrentExpensesPageIndex(0);

    return paginatedList;
    // return sortedList;
  }, [expenses, searchingBy]);

  const expensesList = paginatedExpenses[currentExpensesPageIndex]
    ? paginatedExpenses[currentExpensesPageIndex].map((expense) => (
        <Expense key={expense.id} expense={expense} expenseType={expenseType} />
      ))
    : [];

  // const expensesList = sortedList.map((expense) => (
  //   <Expense key={expense.id} expense={expense} expenseType={expenseType} />
  // ));

  const addHandler = (expenseData: Omit<IExpense, 'id'>) => {
    const newExpense: IExpense = {
      ...expenseData,
      id: nanoid(6),
    };
    dispatch(addExpense({ expense: newExpense, expenseType }));

    setIsAdding(false);
    document.body.style.overflow = '';
  };

  const searchHandler = (searchQuery: SearchQuery) => {
    setSearchingBy(searchQuery);
    closeModal('search');
  };

  const openModal = (modalName: 'expense' | 'search') => {
    if (modalName === 'expense') setIsAdding(true);
    if (modalName === 'search') setSearchActive(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modalName: 'expense' | 'search') => {
    if (modalName === 'expense') setIsAdding(false);
    if (modalName === 'search') setSearchActive(false);
    document.body.style.overflow = '';
  };

  const prevPageHandler = () =>
    setCurrentExpensesPageIndex((prev) =>
      prev === 0 ? paginatedExpenses.length - 1 : prev - 1
    );

  const nextPageHandler = () =>
    setCurrentExpensesPageIndex((prev) =>
      prev === paginatedExpenses.length - 1 ? 0 : prev + 1
    );

  let currentPage =
    paginatedExpenses.length > 0 ? currentExpensesPageIndex + 1 : 0;

  return (
    <Collapsable cardTitle={title}>
      {expenses.length > 0 && <ExpensesDetails expenseType={expenseType} />}

      {/* Add Expense top section */}
      <AddExpense>
        {/* Page Selector */}
        <PageInfo>
          <Button grayColor small narrow onClick={prevPageHandler}>
            <PrevArrow />
          </Button>
          <PageHighlight>{currentPage}</PageHighlight> din{' '}
          {paginatedExpenses.length}
          <Button grayColor small narrow onClick={nextPageHandler}>
            <NextArrow />
          </Button>
        </PageInfo>

        {/* Expense action buttons */}
        <ExpenseControls>
          {/* Search Button */}
          {expensesList.length > 0 && !searchingBy && (
            <Button narrowOnSmall small onClick={() => openModal('search')}>
              <SearchBtnText>Căutare</SearchBtnText>
              <SearchIcon />
            </Button>
          )}
          {/* Cancel Search Button */}
          {searchingBy && (
            <Button narrowOnSmall small onClick={() => setSearchingBy(null)}>
              <SearchBtnText isSearching={true}>Anulează</SearchBtnText>
              <SearchIcon />
            </Button>
          )}
          {/* Add Expense Button */}
          {editMode && !searchingBy && (
            <Button
              narrow={expensesList.length > 0}
              small
              onClick={() => openModal('expense')}>
              {!expensesList.length && 'Adaugă'}
              <AddIcon />
            </Button>
          )}
        </ExpenseControls>

        {expensesList.length > 0 && searchingBy && (
          <Empty mt customMb={-6} wFull>
            Rezultatele căutării:{' '}
            <strong>
              {searchingBy.date
                ? formatDate(
                    new Date(
                      searchingBy.date.year,
                      searchingBy.date.month
                    ).toISOString(),
                    true
                  )
                : searchingBy.name}
            </strong>
          </Empty>
        )}
      </AddExpense>

      {searchActive && (
        <ExpenseSearch
          onClose={() => closeModal('search')}
          searchHandler={searchHandler}
        />
      )}

      <ExpensesList>
        {expensesList.length > 0 && expensesList}
        {!expensesList.length && searchingBy && (
          <Empty mt>
            Niciun rezultat pentru{' '}
            <strong>
              {searchingBy.date
                ? formatDate(
                    new Date(
                      searchingBy.date.year,
                      searchingBy.date.month
                    ).toISOString(),
                    true
                  )
                : searchingBy.name}
            </strong>
          </Empty>
        )}
        {!expensesList.length && !searchingBy && (
          <Empty mt>Nicio achiziție.</Empty>
        )}
      </ExpensesList>

      {isAdding && editMode && (
        <NewExpense
          title="Adăugați o achiziție"
          onSubmit={addHandler}
          onCancel={() => closeModal('expense')}
        />
      )}
    </Collapsable>
  );
};

export default Expenses;
