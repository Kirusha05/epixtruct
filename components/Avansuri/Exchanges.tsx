import React from 'react';
import { Currency, IAvansExchange } from '../../types';
import {
  ExchangeControl,
  ExchangeInfo,
  ExchangeItem,
  ExchangeRate,
  ExchangesList
} from './Exchanges.style';
import { AmountBox, ExchangeIcon, ItemDeleteIcon, ItemOptions } from '../UI';
import { currencySymbols, formatAmount, formatDate } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeExchange } from '../../store/projectSlice';

interface IProps {
  exchanges: IAvansExchange[];
  currency: Currency;
  avansID: string;
}

const Exchanges = ({ exchanges, currency, avansID }: IProps) => {
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const removeExchangeHandler = (exchangeID: string) => {
    if (!confirm('Sigur doriți să ștergeți acest schimb valutar?')) return;
    dispatch(removeExchange({ avansID, exchangeID }));
  }

  const sortedExchanges = exchanges
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <ExchangesList>
      {sortedExchanges.map((exchange) => (
        <ExchangeItem key={exchange.id}>
          <ExchangeInfo>
            <AmountBox type='used'>
              {currencySymbols[currency]}
              {exchange.amount}
            </AmountBox>
            <ExchangeIcon />
            <AmountBox type='total'>
              {formatAmount(exchange.amountInMDL, true)} lei
            </AmountBox>
          </ExchangeInfo>
          <ExchangeControl>
            <p>
              la cursul{' '}
              <ExchangeRate>
                {formatAmount(exchange.exchangeRate, true)}
              </ExchangeRate>{' '}
              (<ExchangeRate>{currency.toLocaleUpperCase()}/MDL</ExchangeRate>),{' '}
              {formatDate(exchange.date)}
            </p>
            {editMode && (
              <ItemOptions cornerFloating onClick={() => removeExchangeHandler(exchange.id)}>
                <ItemDeleteIcon />
              </ItemOptions>
            )}
          </ExchangeControl>
        </ExchangeItem>
      ))}
    </ExchangesList>
  );
};

export default Exchanges;
