import { useEffect, useState } from 'react';
import { FormField, Input, Label } from '../UI';
import { DateInputs } from './DateSelect.style';

const formatDate = (date: number) => {
  return date.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  });
};

interface IProps {
  defaultDate: string;
  onChange: (date: string) => void;
}

const getInfoFromDate = (date: string) => {
  return {
    day: new Date(date).getDate(),
    month: new Date(date).getMonth() + 1,
    year: new Date(date).getFullYear()
  };
};

const DateSelect = ({ defaultDate, onChange }: IProps) => {
  const defaultInfo = getInfoFromDate(defaultDate);
  const [day, setDay] = useState(defaultInfo.day);
  const [month, setMonth] = useState(defaultInfo.month);
  const [year, setYear] = useState(defaultInfo.year);

  useEffect(() => {
    if (
      defaultInfo.day === day &&
      defaultInfo.month === month &&
      defaultInfo.year === year
    )
      return;

    const newDate = new Date();
    newDate.setFullYear(year, month - 1, day);
    onChange(newDate.toISOString());

  }, [day, month, year, onChange, defaultInfo]);

  return (
    <FormField>
      <Label>Data</Label>
      <DateInputs>
        <Input
          value={formatDate(day)}
          onChange={(e) => setDay(+e.target.value)}
          type='number'
          min='1'
          max='31'
          placeholder='Ziua'
        />
        <Input
          value={formatDate(month)}
          onChange={(e) => setMonth(+e.target.value)}
          type='number'
          min='1'
          max='12'
          placeholder='Luna'
        />
        <Input
          value={year}
          onChange={(e) => setYear(+e.target.value)}
          type='number'
          min='2015'
          max={new Date().getFullYear()}
          placeholder='Anul'
        />
      </DateInputs>
    </FormField>
  );
};

export default DateSelect;
