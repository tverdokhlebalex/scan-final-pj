import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from "./axiosInstance";

export const histogramsFetch = async (data) => {
  const response = await axiosInstance.post('objectsearch/histograms', data);
  return response;
};

export const publicationFetch = async (data) => {
  const response = await axiosInstance.post('objectsearch', data);
  return response;
};

export const documentsFetch = async (data) => {
  const response = await axiosInstance.post('documents', data);
  return response;
};

export const getHistogramInfo = createAsyncThunk(
  'getHistogramInfo',
  async (body) => {
    const data = await histogramsFetch(body);
    return objectSearchToSummary(data.data);
  }
);

export const getPublication = createAsyncThunk(
  'getPublication',
  async (body) => {
    const data = await publicationFetch(body);
    return returnIdsArray(data);
  }
);

export const getDocuments = createAsyncThunk(
  'getDocuments',
  async (body) => {
    const data = await documentsFetch(body);
    return data;
  }
);

export const objectSearchToSummary = (data) => {
  return data[0].data.map(item=>({
      date:item.date,
      total:item.value,
      risk:data[1].data.find(riskItem=>(item.date===riskItem.date)).value
  }))   
};

const returnIdsArray = (data) => {
  return data.items.map(idObj => idObj.encodedId)
};

const extraReducers = (builder) => {
  builder
    .addCase(getHistogramInfo.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(getHistogramInfo.fulfilled, (state, { payload }) => {
      state.histogramInfo = payload;
      state.documents = [];
      state.status = 'done';
    })
    .addCase(getHistogramInfo.rejected, (state) => {
      state.status = 'error';
    })
    .addCase(getPublication.fulfilled, (state, { payload }) => {
      state.publicationIds = payload;
    })
    .addCase(getDocuments.fulfilled, (state, { payload }) => {
      state.documents = [...state.documents, ...payload];
    });
};

const histogramSlice = createSlice({
  name: 'histogram',
  initialState: {
    histogramInfo: null,
    status: '',
    publicationIds: [],
    documents: [],
  },
  reducers: {
    dropDocumentsInfo: (state) => {
      state.publicationIds = [];
      state.documents = [];
    },
  },
  extraReducers,
});

export const { dropDocumentsInfo } = histogramSlice.actions;
export default histogramSlice.reducer;
