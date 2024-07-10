import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteExpense, editExpense } from '../../store/projectSlice';
import { ExpenseType, IExpense } from '../../types';
import { formatDate, formatPriceWithCurrency } from '../../utils';
import { AmountBox, Button } from '../UI';
import {
  ExpenseField,
  ExpenseItem,
  ExpenseDelete,
  ExpenseMain,
  ExpenseOptionsIcon,
  ExpenseName,
  ExpenseEdit,
  ExpenseControl,
  ExpenseOptionsModal,
  InvisibleBackdrop,
  ExpenseHighlight
} from './Expense.style';
import NewExpense from './NewExpense';
import { ItemDots } from '../UI/ActionIcons';

interface IProps {
  expense: IExpense;
  expenseType: ExpenseType;
}

const Expense = ({ expense, expenseType }: IProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [optionsModalOpen, setOptionsModalOpen] = useState(false);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const {
    name,
    date,
    itemType,
    quantity,
    currency,
    totalPrice,
    unitPrice,
    id
  } = expense;
  const formattedDate = formatDate(date);

  const deleteHandler = () => {
    setOptionsModalOpen(false);
    if (!confirm('Sigur doriți să ștergeți această achiziție?')) return;
    dispatch(deleteExpense({ expenseID: id, expenseType }));
  };

  const editHandler = ({
    name: newName,
    date: newDate,
    itemType: newItemType,
    quantity: newQuantity,
    currency: newCurrency,
    unitPrice: newUnitPrice,
    totalPrice: newTotalPrice
  }: Omit<IExpense, 'id'>) => {
    const modifiedExpense = {
      name: newName,
      date: newDate,
      itemType: newItemType,
      quantity: newQuantity,
      currency: newCurrency,
      unitPrice: newUnitPrice,
      totalPrice: newTotalPrice,
      id
    };

    dispatch(editExpense({ expense: modifiedExpense, expenseType }));

    setIsEditing(false);
    document.body.style.overflow = '';
  };

  const activateEditing = () => {
    setOptionsModalOpen(false);
    setIsEditing(true);
    document.body.style.overflow = 'hidden';
  };

  const deactivateEditing = () => {
    setIsEditing(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      {isEditing && (
        <NewExpense
          title='Editați achiziția'
          onSubmit={editHandler}
          onCancel={deactivateEditing}
          defaultValues={expense}
        />
      )}
      <ExpenseItem editMode={editMode}>
        <ExpenseField>
          <ExpenseName>{name}</ExpenseName>
          <p>{formattedDate}</p>
        </ExpenseField>

        {quantity && unitPrice && (
          <ExpenseField>
            <p>
              <ExpenseHighlight color='red'>
                {formatPriceWithCurrency(currency, unitPrice)}
              </ExpenseHighlight>{' '}
              <strong>
                x {quantity} {itemType}
              </strong>
            </p>
          </ExpenseField>
        )}

        <ExpenseField>
          <ExpenseMain>
            <AmountBox type='used'>
              {formatPriceWithCurrency(currency, totalPrice)}
            </AmountBox>

            {editMode && (
              <ExpenseControl>
                <ExpenseOptionsIcon
                  onClick={() => setOptionsModalOpen((prev) => !prev)}>
                  <ItemDots />
                </ExpenseOptionsIcon>

                {optionsModalOpen && (
                  <>
                    <ExpenseOptionsModal>
                      <Button narrow small onClick={activateEditing}>
                        {/* Editează */}
                        <ExpenseEdit />
                      </Button>
                      <Button narrow small onClick={deleteHandler}>
                        {/* Șterge */}
                        <ExpenseDelete />
                      </Button>
                    </ExpenseOptionsModal>
                    <InvisibleBackdrop
                      onClick={() => setOptionsModalOpen(false)}
                    />
                    {/* {createPortal(
                      <InvisibleBackdrop
                        onClick={() => setOptionsModalOpen(false)}
                      />,
                      document.getElementById('__next')!
                    )} */}
                  </>
                )}
              </ExpenseControl>
            )}
          </ExpenseMain>
        </ExpenseField>
      </ExpenseItem>
    </>
  );
};

export default Expense;
