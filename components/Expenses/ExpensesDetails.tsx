import { useAppSelector } from '../../hooks';
import { ExpenseType, IExpense } from '../../types';
import { formatAmount, roundAmount } from '../../utils';
import { AmountBox, DetailsBox, DetailItem, DetailsTitle } from '../UI';

const getAmount = (array: IExpense[]) =>
  formatAmount(
    roundAmount(array.reduce((acc, cur) => acc + cur.totalPrice, 0))
  );

interface IProps {
  expenseType: ExpenseType;
}

const ExpensesDetails = ({ expenseType }: IProps) => {
  const expenses = useAppSelector((state) => state.project[expenseType]);

  const inEUR = expenses.filter((expense) => expense.currency === 'eur');
  const inUSD = expenses.filter((expense) => expense.currency === 'usd');
  const inMDL = expenses.filter((expense) => expense.currency === 'mdl');

  return (
    <DetailsBox>
      <DetailsTitle>Total:</DetailsTitle>
      {inEUR.length > 0 && (
        <DetailItem>
          <AmountBox type="used">€{getAmount(inEUR)}</AmountBox>
        </DetailItem>
      )}
      {inUSD.length > 0 && (
        <DetailItem>
          <AmountBox type="used">${getAmount(inUSD)}</AmountBox>
        </DetailItem>
      )}
      {inMDL.length > 0 && (
        <DetailItem>
          <AmountBox type="used">{getAmount(inMDL)} lei</AmountBox>
        </DetailItem>
      )}
    </DetailsBox>
  );
};

export default ExpensesDetails;
