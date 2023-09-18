import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

const initialState = {
  diagnosisData: [],
  allDiagnosisData: [],
  diagnosisDefinitonById : "",
}

const postDiagnosisDefinition = createAsyncThunk('diagnosisDefinition', async (values) => {
  const response = await api.postDiagnosisDefinition(values);
  console.log(response);
  return response.data
});

const getDiagnosisDefinition = createAsyncThunk("getDiagnosisDefinition", async () => {
  const response = await api.getDiagnosisDefinition();

  return response.data
})

const getAllDiagnosisDefinition = createAsyncThunk("getAllDiagnosisDefinition", async () => {

  const response = await api.getAllDiagnosisDefinition();

  return response.data
})

const deleteDianosisDefinition = createAsyncThunk("deleteDianosisDefinition", async (id) => {

  const response = await api.deleteDianosisDefinition(id);

  return response.data
});

const getDiagnosisDefinitonById = createAsyncThunk("getDiagnosisDefinitonById", async (id) => {

  const response = await api.getDiagnosisDefinitonById(id);

  return response.data
});

const patchDiagnosisDefiniton = createAsyncThunk("patchDiagnosisDefiniton", async ({id, payload}) => {

  const response = await api.patchDiagnosisDefiniton({id, payload});

  return response.data
});

const diagnosisDefinitionSlice = createSlice({
  name: "diagnosisDefinitionSlice",
  initialState: initialState,
  extraReducers: builder => {

    // Handle the fulfilled action
    builder.addCase(postDiagnosisDefinition.fulfilled, (state, action) => {
  
    });

    // Handle the rejected action
    builder.addCase(postDiagnosisDefinition.rejected, (state, action) => {
    
    });

    // Get pain area data 

    builder.addCase(getDiagnosisDefinition.fulfilled, (state, action) => {
      state.diagnosisData = action.payload

    })

    builder.addCase(getDiagnosisDefinition.rejected, (state, action) => {
      
    })

    // get all diagnosis definition

    builder.addCase(getAllDiagnosisDefinition.fulfilled, (state, action) => {
      state.allDiagnosisData = action.payload

    })

    builder.addCase(getAllDiagnosisDefinition.rejected, (state, action) => {
    
    })

    // get diagnosis definition by id
    builder.addCase(getDiagnosisDefinitonById.fulfilled, (state, action) => {
      state.diagnosisDefinitonById = action.payload

    })

    builder.addCase(getDiagnosisDefinitonById.rejected, (state, action) => {
    
    })
  },
})
export default diagnosisDefinitionSlice.reducer;

export {
  postDiagnosisDefinition,
  getDiagnosisDefinition,
  getAllDiagnosisDefinition,
  deleteDianosisDefinition,
  patchDiagnosisDefiniton,
  getDiagnosisDefinitonById
}