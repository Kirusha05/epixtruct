import { configureStore } from '@reduxjs/toolkit';
import projectsInfoSlice from './projectsInfoSlice';
import projectSlice from './projectSlice';
import adminSlice from './adminSlice';
import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () =>
  configureStore({
    reducer: {
      project: projectSlice,
      projectsInfo: projectsInfoSlice,
      admin: adminSlice
    },
    devTools: process.env.NODE_ENV === 'development'
  });

export type AppStore = ReturnType<typeof makeStore>;

export const wrapper = createWrapper<AppStore>(makeStore);
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
