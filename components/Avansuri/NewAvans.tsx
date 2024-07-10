import { useEffect, useRef, useState } from 'react';
import { Button, CurrencyButton, CurrencySelect, Form, FormActions, FormField, Input, Label, Modal } from '../UI';
import { Currency } from '../../types';
import { DateSelect } from '../';
import { AddAvans } from './Avansuri';
import { currencySymbols } from '../../utils';

interface IProps {
  onSubmit: AddAvans;
  onCancel: () => void;
}

const NewAvans = ({ onSubmit, onCancel }: IProps) => {
  const [newAvansAmount, setNewAvansAmount] = useState(0);
  const [currency, setCurrency] = useState<Currency>('eur');
  const [newDate, setNewDate] = useState(new Date().toISOString());

  const avansInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    avansInputRef.current!.focus();
  }, [currency]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newAvansAmount) return;
    onSubmit(newAvansAmount, currency, newDate);
  };

  const selectedSymbol = currencySymbols[currency];

  return (
    <Modal
      modalTitle="Adaugă un avans"
      onClose={onCancel}
      elementToFocus={avansInputRef}
      autofocus>
      <Form onSubmit={submitHandler}>
        <FormField>
          <Label>Suma</Label>
          <Input
            ref={avansInputRef}
            type='number'
            placeholder='Suma avansului...'
            value={newAvansAmount || ''}
            onChange={(e) =>
              setNewAvansAmount(Math.abs(Number(e.target.value)))
            }
          />
        </FormField>
        <FormField>
          <Label>Valuta</Label>
          <CurrencySelect>
            <CurrencyButton
              type='button'
              selected={currency === 'eur'}
              onClick={() => setCurrency('eur')}>
              €
            </CurrencyButton>
            <CurrencyButton
              type='button'
              selected={currency === 'usd'}
              onClick={() => setCurrency('usd')}>
              $
            </CurrencyButton>
            <CurrencyButton
              type='button'
              selected={currency === 'mdl'}
              onClick={() => setCurrency('mdl')}>
              MDL
            </CurrencyButton>
          </CurrencySelect>
        </FormField>
        <DateSelect defaultDate={newDate} onChange={setNewDate} />
        <FormActions>
          <Button type='submit'>Adaugă ({selectedSymbol})</Button>
          <Button type='button' onClick={onCancel}>
            ❌
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
};

export default NewAvans;
