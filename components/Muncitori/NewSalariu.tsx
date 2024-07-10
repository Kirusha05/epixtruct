import { useEffect, useRef, useState } from 'react';
import {
  CurrencyButton,
  Button,
  Input,
  Form,
  FormField,
  Label,
  FormActions,
  Modal,
  CurrencySelect
} from '../UI';
import { DateSelect } from '../';
import { Currency, ISalariu } from '../../types';
import { currencySymbols } from '../../utils';

interface IProps {
  onSubmit: (salary: Omit<ISalariu, 'id'>) => void;
  onCancel: () => void;
  hasSalarii: boolean;
}

const NewSalariu = ({ onSubmit, onCancel, hasSalarii }: IProps) => {
  const [newSalaryAmount, setNewSalaryAmount] = useState(0);
  const [currency, setCurrency] = useState<Currency>('mdl');
  const [newDate, setNewDate] = useState(new Date().toISOString());

  const salariuInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    salariuInputRef.current!.focus();
  }, [currency]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newSalaryAmount) return;

    onSubmit({
      amount: newSalaryAmount,
      currency,
      date: newDate
    });
  };

  const selectedSymbol = currencySymbols[currency];

  return (
    <Modal modalTitle='Adaugă un salariu' onClose={onCancel}>
      <Form onSubmit={submitHandler}>
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
        <FormField>
          <Label>Suma</Label>
          <Input
            ref={salariuInputRef}
            type='number'
            placeholder='Suma salariului...'
            value={newSalaryAmount || ''}
            onChange={(e) =>
              setNewSalaryAmount(Math.abs(Number(e.target.value)))
            }
          />
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

export default NewSalariu;
