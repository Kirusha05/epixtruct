import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { currencySymbols, formatAmount, formatDate } from '../../utils';
import { AmountBox, Button } from '../UI';
import {
  AvansAmount,
  AvansBold,
  AvansDelete,
  AvansHeader,
  AvansIcon,
  AvansItem,
  FlexBox
} from './Avans.style';
import { IAvans, IAvansExchange } from '../../types';
import { ExchangeIcon } from '../UI/ActionIcons';
import NewExchange from './NewExchange';
import { nanoid } from '@reduxjs/toolkit';
import { addExchange } from '../../store/projectSlice';
import Exchanges from './Exchanges';

interface IProps {
  onDelete: () => void;
  avansData: IAvans;
}

const Avans = ({ onDelete, avansData }: IProps) => {
  const [isExchanging, setIsExchanging] = useState(false);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const { amount, amountAvailableForExchange, currency, date, id, exchanges } =
    avansData;

  const makeExchange = (exchangeObj: Omit<IAvansExchange, 'id'>) => {
    const newExchange = {
      ...exchangeObj,
      id: nanoid(6)
    };

    dispatch(addExchange({ avansID: id, exchange: newExchange }));
  };

  const activateExchange = () => {
    setIsExchanging(true);
    document.body.style.overflow = 'hidden';
  };

  const cancelExchange = () => {
    setIsExchanging(false);
    document.body.style.overflow = '';
  };

  const formattedCurrencyAmount =
    currency === 'mdl'
      ? `${formatAmount(amount)} lei`
      : `${currencySymbols[currency]}${formatAmount(amount)}`;

  return (
    <AvansItem editMode={editMode}>
      {isExchanging && editMode && (
        <NewExchange
          availableAmount={amountAvailableForExchange}
          exchangeCurrency={currencySymbols[currency]}
          onSubmit={makeExchange}
          onCancel={cancelExchange}
        />
      )}

      <AvansHeader>
        <AvansAmount>
          <AmountBox type='total'>{formattedCurrencyAmount}</AmountBox>
          <AvansBold>{formatDate(date)}</AvansBold>
        </AvansAmount>

        <FlexBox>
          {currency !== 'mdl' && !editMode && (
            <FlexBox>
              <AmountBox type='remaining'>
                {currencySymbols[currency]}
                {avansData.amountAvailableForExchange}
              </AmountBox>
            </FlexBox>
          )}
          {editMode && currency !== 'mdl' && (
            <Button small narrow removeMargin onClick={activateExchange}>
              <ExchangeIcon />
            </Button>
          )}
          {editMode && (
            <Button small onClick={onDelete}>
              Șterge
            </Button>
          )}
        </FlexBox>
      </AvansHeader>

      {currency !== 'mdl' && exchanges && exchanges.length > 0 && (
        <Exchanges currency={currency} exchanges={exchanges!} avansID={id} />
      )}
    </AvansItem>
  );
};

export default Avans;
