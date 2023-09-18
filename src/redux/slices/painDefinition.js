import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

const initialState = {
  painDefintionData: [],
  painDefinitionDataByAreaId: [],
  painDefinitionById: "",

}

const postPainDefinition = createAsyncThunk('painDefinition', async (values) => {
  const response = await api.postPainDefinition(values);
  return response.data
});

const getPainDefintion = createAsyncThunk("getPainDefinition", async () => {
  const response = await api.getPainDefintion();

  return response.data
})

const getPainDeifnitionByPainAreaId = createAsyncThunk("getPainDeifnitionByPainAreaId", async (id) => {
  const response = await api.getPainDeifnitionByPainAreaId(id);

  return response.data
})

const deletePainDefinition = createAsyncThunk("deletePainDefinition", async (id) => {
  const response = await api.deletePainDefinition(id);

  return response.data
})

const getPainDefinitionById = createAsyncThunk("getPainDefinitionById", async (id) => {
  const response = await api.getPainDefinitionById(id);

  return response.data
})

const patchPainDefinition = createAsyncThunk("patchPainDefinition", async ({ id, payload }) => {
  const response = await api.patchPainDefinition({ id, payload });

  return response.data
})


const painDefinitionSlice = createSlice({
  name: "painDefinitionSlice",
  initialState: initialState,
  extraReducers: builder => {

    // Handle the fulfilled action
    builder.addCase(postPainDefinition.fulfilled, (state, action) => {
      
    });

    // Handle the rejected action
    builder.addCase(postPainDefinition.rejected, (state, action) => {
  
    });

    // Get pain area data 

    builder.addCase(getPainDefintion.fulfilled, (state, action) => {
     
      state.painDefintionData = action.payload

    })

    builder.addCase(getPainDefintion.rejected, (state, action) => {
     
    })
    // Pain Defintion by id

    builder.addCase(getPainDeifnitionByPainAreaId.fulfilled, (state, action) => {
      state.painDefinitionDataByAreaId = action.payload

    })

    builder.addCase(getPainDeifnitionByPainAreaId.rejected, (state, action) => {
  
    })

    // delete pain definition

    builder.addCase(deletePainDefinition.fulfilled, (state, action) => {

    })

    builder.addCase(deletePainDefinition.rejected, (state, action) => {
    
    })

    // pain definition by id

    builder.addCase(getPainDefinitionById.fulfilled, (state, action) => {
      state.painDefinitionById = action.payload

    })

    builder.addCase(getPainDefinitionById.rejected, (state, action) => {
  
    })
  },
})
export default painDefinitionSlice.reducer;

export {
  postPainDefinition,
  getPainDefintion,
  getPainDeifnitionByPainAreaId,
  deletePainDefinition,
  getPainDefinitionById,
   patchPainDefinition
}