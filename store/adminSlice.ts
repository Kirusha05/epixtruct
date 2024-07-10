import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAdmin {
  editMode: boolean;
}

const initialState: IAdmin = {
  editMode: false
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setEditMode(state, action: PayloadAction<boolean>) {
      state.editMode = action.payload;
    }
  }
});

export const { setEditMode } = adminSlice.actions;
export default adminSlice.reducer;
