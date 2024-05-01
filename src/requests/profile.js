import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "./axiosInstance";

const loginFetch = (data) => axiosInstance.post('account/login', data);
const profileFetch = () => axiosInstance.get('account/info');

export const getCompanyInfo = createAsyncThunk('getCompanyInfo', profileFetch);
export const signIn = createAsyncThunk('signIn', async (data, thunkAPI) => {
  const profResponse = await loginFetch(data);
  localStorage.setItem('accessToken', profResponse.accessToken);
  await thunkAPI.dispatch(getCompanyInfo());
  return profResponse;
});

const profile = createSlice({
  name: 'profile',
  initialState: { companyInfo: null, accountInfo: null, status: '' },
  reducers: {
    signOut: (state) => { state.accountInfo = state.companyInfo = null; localStorage.removeItem('accessToken'); },
    dropStatus: (state) => { state.status = ''; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => { state.status = 'pending'; })
      .addCase(signIn.fulfilled, (state, action) => { state.accountInfo = action.payload; state.status = 'done'; })
      .addCase(getCompanyInfo.pending, (state) => { state.status = 'pending'; })
      .addCase(getCompanyInfo.fulfilled, (state, action) => { state.companyInfo = action.payload; state.status = 'done'; })
      .addCase(signIn.rejected, (state) => { state.status = 'error'; });
  }
});

export const { signOut, dropStatus } = profile.actions;
export default profile.reducer;
