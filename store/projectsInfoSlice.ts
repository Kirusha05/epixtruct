import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProjectInfo } from '../types';

const projectsInfoSlice = createSlice({
  name: 'projectsList',
  initialState: [] as IProjectInfo[],
  reducers: {
    setProjects(state, action: PayloadAction<IProjectInfo[]>) {
      state = action.payload;
    }
  }
});

export const { setProjects } = projectsInfoSlice.actions;
export default projectsInfoSlice.reducer;
