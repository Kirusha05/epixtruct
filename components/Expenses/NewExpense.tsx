import { useMemo, useRef, useState } from 'react';
import { currencySymbols, roundAmount } from '../../utils';
import { DateSelect } from '..';
import {
  Button,
  CurrencyButton,
  CurrencySelect,
  Form,
  FormActions,
  FormField,
  Input,
  Label,
  Modal,
  Switch,
  TotalPrice
} from '../UI';
import { HasQuantityBox, QuantityType } from './NewExpense.style';
import { Currency, IExpense } from '../../types';
interface IProps {
  onSubmit: (newExpense: Omit<IExpense, 'id'>) => void;
  onCancel: () => void;
  defaultValues?: Omit<IExpense, 'id'>;
  title: string;
}

let currentRefIndex: keyof Omit<IExpense, 'id' | 'currency' | 'date'> = 'name';

const NewExpense = ({ onSubmit, onCancel, defaultValues, title }: IProps) => {
  const [newName, setNewName] = useState(defaultValues?.name || '');
  const [newUnitPrice, setNewUnitPrice] = useState(
    defaultValues?.unitPrice || 0
  );
  const [newQuantity, setNewQuantity] = useState(defaultValues?.quantity || 0);
  const [newDate, setNewDate] = useState(
    defaultValues?.date || new Date().toISOString()
  );
  const [newType, setNewType] = useState(defaultValues?.itemType || '');
  const [currency, setCurrency] = useState<Currency>(
    defaultValues?.currency || 'mdl'
  );
  const [newTotalPrice, setNewTotalPrice] = useState(
    defaultValues?.totalPrice || 0
  );
  const [withQuantity, setWithQuantity] = useState(
    !!defaultValues?.quantity || false
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const unitPriceRef = useRef<HTMLInputElement>(null);
  const totalPriceRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  const refsObj = useMemo(
    () => ({
      name: nameRef,
      unitPrice: unitPriceRef,
      itemType: typeRef,
      quantity: quantityRef,
      totalPrice: totalPriceRef
    }),
    [nameRef, unitPriceRef, typeRef, quantityRef, totalPriceRef]
  );

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!withQuantity && (!newName || !newTotalPrice)) {
      if (!newName) currentRefIndex = 'name';
      if (!newTotalPrice) currentRefIndex = 'totalPrice';

      refsObj[currentRefIndex].current?.focus();
      return;
    }

    if (
      withQuantity &&
      (!newName || !newUnitPrice || !newType || !newQuantity)
    ) {
      if (!newName) currentRefIndex = 'name';
      if (newName) currentRefIndex = 'quantity';
      if (newName && newQuantity) currentRefIndex = 'itemType';
      if (newName && newQuantity && newType) currentRefIndex = 'unitPrice';

      refsObj[currentRefIndex].current?.focus();
      return;
    }

    onSubmit({
      name: newName,
      date: newDate,
      itemType: newType || null,
      quantity: newQuantity || null,
      currency: currency,
      unitPrice: newUnitPrice || null,
      totalPrice: withQuantity
        ? roundAmount(newUnitPrice * newQuantity)
        : newTotalPrice
    });
  };

  const selectedSymbol = currencySymbols[currency];

  const priceToShow = withQuantity
    ? roundAmount(newUnitPrice * newQuantity)
    : newTotalPrice;
  const formattedCurrencyTotalPrice =
    currency === 'mdl'
      ? `${priceToShow} lei`
      : `${currencySymbols[currency]}${priceToShow}`;

  return (
    <Modal
      modalTitle={title}
      onClose={onCancel}
      elementToFocus={nameRef}
      autofocus={!defaultValues}>
      <Form onSubmit={submitHandler}>
        <FormField withBottomBorder>
          <Label>Nume</Label>
          <Input
            ref={nameRef}
            type='text'
            placeholder='Numele achiziției...'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </FormField>

        <HasQuantityBox>
          <QuantityType
            isActive={!withQuantity}
            onClick={() => setWithQuantity(false)}>
            Fără cantitate
          </QuantityType>
          <Switch
            enabled={withQuantity}
            onClick={() => setWithQuantity((prev) => !prev)}
          />
          <QuantityType
            isActive={withQuantity}
            onClick={() => setWithQuantity(true)}>
            Cu cantitate
          </QuantityType>
        </HasQuantityBox>

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

        {!withQuantity && (
          <FormField>
            <Label>Costul</Label>
            <Input
              ref={totalPriceRef}
              type='number'
              placeholder='Costul total...'
              value={newTotalPrice || ''}
              onChange={(e) =>
                setNewTotalPrice(Math.abs(Number(e.target.value)))
              }
            />
          </FormField>
        )}

        {withQuantity && (
          <>
            <FormField>
              <Label>Cantit.</Label>
              <Input
                ref={quantityRef}
                type='number'
                placeholder='Cantitatea...'
                value={newQuantity || ''}
                onChange={(e) =>
                  setNewQuantity(Math.abs(Number(e.target.value)))
                }
              />
            </FormField>

            <FormField>
              <Label>Tipul</Label>
              <Input
                ref={typeRef}
                type='text'
                placeholder='Cutii/metri/saci...'
                value={newType || ''}
                onChange={(e) => setNewType(e.target.value.toLowerCase())}
              />
            </FormField>

            <FormField withBottomBorder>
              <Label>Preț</Label>
              <Input
                ref={unitPriceRef}
                step='0.01'
                type='number'
                placeholder='Preț/unitate'
                value={newUnitPrice || ''}
                onChange={(e) =>
                  setNewUnitPrice(Math.abs(Number(e.target.value)))
                }
              />
            </FormField>
          </>
        )}

        <DateSelect defaultDate={newDate} onChange={setNewDate} />

        <FormActions>
          <TotalPrice>
            Total: {formattedCurrencyTotalPrice}
          </TotalPrice>
          <Button type='submit'>
            {defaultValues ? 'Modifică' : 'Adaugă'} ({selectedSymbol})
          </Button>
          <Button type='button' onClick={onCancel}>
            ❌
          </Button>
        </FormActions>
      </Form>
    </Modal>
  );
};

export default NewExpense;
