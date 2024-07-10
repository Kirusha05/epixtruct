import { useEffect, useRef, useState } from 'react';
import {
  AmountBox,
  Button,
  Form,
  FormActions,
  FormField,
  Input,
  Label,
  Modal
} from '../UI';
import { DateSelect } from '..';
import { Currency, IAvansExchange } from '../../types';
import {
  ExchangeFooter,
  ExchangeResult,
  ExchangeTitle
} from './NewExchange.style';
import { roundAmount } from '../../utils';

interface IProps {
  availableAmount: number;
  exchangeCurrency: Omit<Currency, 'mdl'>;
  onSubmit: (exchangeObj: Omit<IAvansExchange, 'id'>) => void;
  onCancel: () => void;
}

const NewExchange = ({
  availableAmount,
  exchangeCurrency,
  onSubmit,
  onCancel
}: IProps) => {
  const [exchangeAmount, setExchangeAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [newDate, setNewDate] = useState(new Date().toISOString());

  const exchangeAmountInputRef = useRef<HTMLInputElement>(null);
  const exchangeRateInputRef = useRef<HTMLInputElement>(null);

  const exchangeAmountInMDL = roundAmount(exchangeAmount * exchangeRate);

  useEffect(() => {
    exchangeAmountInputRef.current!.focus();
  }, [exchangeAmountInputRef]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!exchangeAmount || exchangeAmount > availableAmount) return;

    if (exchangeRate === 0) return exchangeRateInputRef.current!.focus();

    const newExchange = {
      amount: exchangeAmount,
      exchangeRate,
      amountInMDL: exchangeAmountInMDL,
      date: newDate
    };

    onSubmit(newExchange);
    onCancel();
  };

  const exchangeResultText = `${exchangeCurrency}${exchangeAmount} = ${exchangeAmountInMDL} lei`;

  return (
    <Modal
      modalTitle='Schimb valutar'
      onClose={onCancel}
      elementToFocus={exchangeAmountInputRef}
      autofocus>
      <ExchangeTitle>
        <span>Suma disponibilă p/u schimb:</span>
        <AmountBox type='remaining'>
          {exchangeCurrency}
          {availableAmount}
        </AmountBox>
      </ExchangeTitle>
      <Form onSubmit={submitHandler}>
        <FormField>
          <Label>Suma ({exchangeCurrency})</Label>
          <Input
            ref={exchangeAmountInputRef}
            type='number'
            placeholder='Suma de schimbat în MDL...'
            value={exchangeAmount || ''}
            onChange={(e) =>
              setExchangeAmount(Math.abs(Number(e.target.value)))
            }
          />
        </FormField>
        <FormField>
          <Label>Cursul</Label>
          <Input
            ref={exchangeRateInputRef}
            type='number'
            placeholder='Cursul valutar...'
            value={exchangeRate || ''}
            step="0.01"
            onChange={(e) => setExchangeRate(Math.abs(Number(e.target.value)))}
          />
        </FormField>

        <DateSelect defaultDate={newDate} onChange={setNewDate} />
        <ExchangeFooter>
          <ExchangeResult>
            {exchangeAmount && exchangeRate ? exchangeResultText : ''}
          </ExchangeResult>
          <FormActions>
            <Button type='submit'>Continuă</Button>
            <Button type='button' onClick={onCancel}>
              ❌
            </Button>
          </FormActions>
        </ExchangeFooter>
      </Form>
    </Modal>
  );
};

export default NewExchange;
