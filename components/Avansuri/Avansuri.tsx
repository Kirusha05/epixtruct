import { useState, useMemo } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addAvans, deleteAvans } from '../../store/projectSlice';
import { Currency, IAvans } from '../../types';
import {
  AddIcon,
  Button,
  Collapsable,
  Empty,
  NextArrow,
  PageHighlight,
  PageInfo,
  PrevArrow,
} from '../UI';
import Avans from './Avans';
import NewAvans from './NewAvans';
import { AddAvans, AvansuriList } from './Avansuri.style';
import AvansuriDetails from './AvansuriDetails';

export type AddAvans = (
  amount: number,
  currency: Currency,
  date: string
) => void;

const avansuriNumPerPage = 5;
let tempAvansuriNum: null | number = null;

const Avansuri = () => {
  const [isAdding, setIsAdding] = useState(false);
  // const [currentAvansuriPageIndex, setCurrentAvansuriPageIndex] = useState(0);

  const avansuri = useAppSelector((state) => state.project.avansuri);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  // const paginatedAvansuri = useMemo(() => {
  const sortedAvansuri = useMemo(() => {
    const sortedList = avansuri
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // const paginatedList: Array<IAvans[]> = [];
    // for (let i = 0; i < sortedList.length; i++) {
    //   const pageIndex = Math.floor(i / avansuriNumPerPage);
    //   if (paginatedList[pageIndex] === undefined) paginatedList[pageIndex] = [];
    //   const expenseToInsert = sortedList[i];
    //   paginatedList[pageIndex].push(expenseToInsert);
    // }

    // if (tempAvansuriNum !== avansuri.length) {
    //   setCurrentAvansuriPageIndex(0);
    //   tempAvansuriNum = avansuri.length;
    // }

    // return paginatedList;
    return sortedList;
  }, [avansuri]);

  const addHandler: AddAvans = (amount, currency, date) => {
    const newAvans: IAvans = {
      amount,
      amountAvailableForExchange: amount,
      currency,
      date,
      id: nanoid(6),
    };

    dispatch(addAvans(newAvans));
    cancelAdding();
  };

  const deleteHandler = (id: string) => {
    if (!confirm('Sigur doriți să ștergeți acest avans?')) return;
    dispatch(deleteAvans(id));
  };

  // const avansuriList = paginatedAvansuri[currentAvansuriPageIndex]
  //   ? paginatedAvansuri[currentAvansuriPageIndex].map((avans, idx) => (
  //       <Avans
  //         key={avans.id}
  //         avansData={avans}
  //         onDelete={() => deleteHandler(avans.id)}
  //       />
  //     ))
  //   : [];

  const avansuriList = sortedAvansuri.map((avans) => (
    <Avans
      key={avans.id}
      avansData={avans}
      onDelete={() => deleteHandler(avans.id)}
    />
  ));

  // const prevPageHandler = () =>
  //   setCurrentAvansuriPageIndex((prev) =>
  //     prev === 0 ? paginatedAvansuri.length - 1 : prev - 1
  //   );

  // const nextPageHandler = () =>
  //   setCurrentAvansuriPageIndex((prev) =>
  //     prev === paginatedAvansuri.length - 1 ? 0 : prev + 1
  //   );

  const activateAdding = () => {
    setIsAdding(true);
    document.body.style.overflow = 'hidden';
  };

  const cancelAdding = () => {
    setIsAdding(false);
    document.body.style.overflow = '';
  };

  // let currentPage =
  //   paginatedAvansuri.length > 0 ? currentAvansuriPageIndex + 1 : 0;

  return (
    <Collapsable cardTitle="Avansuri">
      {avansuri.length > 0 && <AvansuriDetails />}

      {editMode && (
        <AddAvans>
          {/* Page Selector */}
          {/* <PageInfo>
          <Button grayColor small narrow onClick={prevPageHandler}>
            <PrevArrow />
          </Button>
          <PageHighlight>{currentPage}</PageHighlight> din{' '}
          {paginatedAvansuri.length}
          <Button grayColor small narrow onClick={nextPageHandler}>
            <NextArrow />
          </Button>
        </PageInfo> */}

          {/* Add Avans Button */}
          {editMode && (
            <Button narrow={avansuri.length > 0} small onClick={activateAdding}>
              {avansuri.length < 1 && 'Adaugă un avans'}
              <AddIcon />
            </Button>
          )}
        </AddAvans>
      )}

      <AvansuriList editMode={editMode}>
        {avansuriList.length > 0 && avansuriList}
        {!avansuriList.length && (
          <Empty mt>
            Niciun avans. {editMode ? 'Adăugați unul nou...' : ''}
          </Empty>
        )}
      </AvansuriList>

      {isAdding && editMode && (
        <NewAvans onSubmit={addHandler} onCancel={cancelAdding} />
      )}
    </Collapsable>
  );
};

export default Avansuri;
