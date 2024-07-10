import { nanoid } from '@reduxjs/toolkit';
import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IMuncitor } from '../../types';
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
import { addWorker } from '../../store/projectSlice';
import { AddMuncitor, MuncitoriList } from './Muncitori.style';
import NewMuncitor from './NewMuncitor';
import Muncitor from './Muncitor';
import MuncitoriDetails from './MuncitoriDetails';

const workersNumPerPage = 4;

const Muncitori = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [currentWorkersPageIndex, setCurrentWorkersPageIndex] = useState(0);

  const workers = useAppSelector((state) => state.project.workers);
  const editMode = useAppSelector((state) => state.admin.editMode);
  const dispatch = useAppDispatch();

  const paginatedWorkers = useMemo(() => {
    const sortedList = workers
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, 'ro-RO'));

    const paginatedList: Array<IMuncitor[]> = [];
    for (let i = 0; i < sortedList.length; i++) {
      const pageIndex = Math.floor(i / workersNumPerPage);
      if (paginatedList[pageIndex] === undefined) paginatedList[pageIndex] = [];
      const expenseToInsert = sortedList[i];
      paginatedList[pageIndex].push(expenseToInsert);
    }

    setCurrentWorkersPageIndex(0);

    return paginatedList;
    // return sortedList;
  }, [workers]);

  const addHandler = (name: string) => {
    const newWorker: IMuncitor = {
      name,
      id: nanoid(6),
      salarii: [],
    };

    dispatch(addWorker(newWorker));
    cancelAdding();
  };

  const workersList = paginatedWorkers[currentWorkersPageIndex]
    ? paginatedWorkers[currentWorkersPageIndex].map((worker, idx) => (
        <Muncitor key={worker.id} {...worker} />
      ))
    : [];

  // const workersList = paginatedWorkers.map((worker, idx) => (
  //   <Muncitor key={worker.id} {...worker} />
  // ));

  const prevPageHandler = () =>
    setCurrentWorkersPageIndex((prev) =>
      prev === 0 ? paginatedWorkers.length - 1 : prev - 1
    );

  const nextPageHandler = () =>
    setCurrentWorkersPageIndex((prev) =>
      prev === paginatedWorkers.length - 1 ? 0 : prev + 1
    );

  const activateAdding = () => {
    setIsAdding(true);
    document.body.style.overflow = 'hidden';
  };

  const cancelAdding = () => {
    setIsAdding(false);
    document.body.style.overflow = '';
  };

  let currentPage =
    paginatedWorkers.length > 0 ? currentWorkersPageIndex + 1 : 0;

  return (
    <Collapsable cardTitle="Muncitori">
      {workers.length > 0 &&
        workers.some((worker) => worker.salarii.length > 0) && (
          <MuncitoriDetails />
        )}

      {/* {editMode && ( */}
        <AddMuncitor>
          {/* Page Selector */}
          <PageInfo>
          <Button grayColor small narrow onClick={prevPageHandler}>
            <PrevArrow />
          </Button>
          <PageHighlight>{currentPage}</PageHighlight> din{' '}
          {paginatedWorkers.length}
          <Button grayColor small narrow onClick={nextPageHandler}>
            <NextArrow />
          </Button>
        </PageInfo>

          {/* Add Worker Button */}
          {editMode && (
            <Button narrow={workers.length > 0} small onClick={activateAdding}>
              {workers.length < 1 && 'Adaugă un muncitor'}
              <AddIcon />
            </Button>
          )}
        </AddMuncitor>
      {/* )} */}

      <MuncitoriList editMode={editMode}>
        {workersList.length > 0 && workersList}
        {!workersList.length && (
          <Empty mt>
            Niciun muncitor. {editMode ? 'Adăugați unul nou...' : ''}
          </Empty>
        )}
      </MuncitoriList>

      {isAdding && editMode && (
        <NewMuncitor onSubmit={addHandler} onCancel={cancelAdding} />
      )}
    </Collapsable>
  );
};

export default Muncitori;
