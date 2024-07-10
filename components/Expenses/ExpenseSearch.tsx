import React, { useState } from 'react';
import { Button, Form, Input, Modal, NextArrow, PrevArrow } from '../UI';
import DateSelect from '../DateSelect/DateSelect';
import {
  DateBox,
  SearchActions,
  SearchContainerForm,
  SearchDateText,
  SearchType,
  SearchTypeBox
} from './ExpenseSearch.style';
import { formatDate } from '../../utils';
import { SearchDate, SearchQuery } from './Expenses';

interface IProps {
  onClose: () => void;
  searchHandler: (searchQuery: SearchQuery) => void;
}

const ExpenseSearch = ({ onClose, searchHandler }: IProps) => {
  const [searchingBy, setSearchingBy] = useState<'name' | 'date'>('name');
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState<SearchDate>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });

  const prevMonthHandler = () => {
    setSearchDate((prevDate) => {
      const newDate: SearchDate = { ...prevDate };

      if (prevDate.month === 0) {
        newDate.month = 11;
        newDate.year -= 1;
      } else {
        newDate.month -= 1;
      }

      return newDate;
    });
  };

  const nextMonthHandler = () => {
    setSearchDate((prevDate) => {
      const newDate: SearchDate = { ...prevDate };

      if (prevDate.month === 11) {
        newDate.month = 0;
        newDate.year += 1;
      } else {
        newDate.month += 1;
      }

      return newDate;
    });
  };

  const submitHandler = () => {
    if (searchingBy === 'name' && !searchName.trim()) return onClose();

    const newSearchQuery: SearchQuery = {
      name: searchingBy === 'name' && searchName.trim() ? searchName : null,
      date: searchingBy === 'date' ? searchDate : null
    };

    searchHandler(newSearchQuery);
  };

  const currentDate = formatDate(
    new Date(searchDate.year, searchDate.month).toISOString(),
    true
  );

  return (
    <Modal onClose={onClose} modalTitle='Caută o achiziție'>
      <SearchContainerForm onSubmit={submitHandler}>
        <SearchTypeBox>
          <SearchType
            type='button'
            isActive={searchingBy === 'name'}
            onClick={() => setSearchingBy('name')}>
            Nume
          </SearchType>
          <SearchType
            type='button'
            isActive={searchingBy === 'date'}
            onClick={() => setSearchingBy('date')}>
            Data
          </SearchType>
        </SearchTypeBox>
        <SearchActions>
          {searchingBy === 'name' && (
            <Input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder='Numele achiziției...'
            />
          )}
          {searchingBy === 'date' && (
            <DateBox>
              <Button type='button' grayColor small narrow onClick={prevMonthHandler}>
                <PrevArrow />
              </Button>
              <SearchDateText>{currentDate}</SearchDateText>
              <Button type='button' grayColor small narrow onClick={nextMonthHandler}>
                <NextArrow />
              </Button>
            </DateBox>
          )}
        </SearchActions>
        <Button small type='submit'>
          Caută
        </Button>
      </SearchContainerForm>
    </Modal>
  );
};

export default ExpenseSearch;
