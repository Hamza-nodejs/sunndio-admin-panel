import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

const initialState = {
  painBehaviorData: [],
  painBehaviorDataById: [],
  allPainBehaviorData: [],
  allPainBehaviorDataById: ""

}

const postpainBehavior = createAsyncThunk('painBehavior', async (values) => {
  const response = await api.postPainBehavior(values);
  return response.data
});

const getPainBehavior = createAsyncThunk("getpainBehavior", async () => {
  const response = await api.getPainBehavior();

  return response.data
})

const getPainBehaviorByPainAreaId = createAsyncThunk("getPainBehaviorByPainAreaId", async (id) => {
  const response = await api.getPainBehaviorByPainAreaId(id);

  return response.data
})

const getAllPainBehaviorData = createAsyncThunk("getAllPainBehaviorData", async () => {
  const response = await api.getAllPainBehaviorData();

  return response.data
})

const deletPainBehavior = createAsyncThunk("deletPainBehavior", async (id) => {
  const response = await api.deletPainBehavior(id);

  return response.data
})

const getPainBehaviorById = createAsyncThunk("getPainBehaviorById", async (id) => {
  const response = await api.getPainBehaviorById(id);

  return response.data
})

const patchPainBehavior = createAsyncThunk("patchPainBehavior", async ({ id, payload }) => {
  const response = await api.patchPainBehavior({ id, payload });

  return response.data
})

const painBehaviorSlice = createSlice({
  name: "painBehaviorSlice",
  initialState: initialState,
  extraReducers: builder => {

    // Handle the fulfilled action
    builder.addCase(postpainBehavior.fulfilled, (state, action) => {
   
    });

    // Handle the rejected action
    builder.addCase(postpainBehavior.rejected, (state, action) => {
     
    });

    // Get pain area data 

    builder.addCase(getPainBehavior.fulfilled, (state, action) => {
      
      state.painBehaviorData = action.payload

    })

    builder.addCase(getPainBehavior.rejected, (state, action) => {

    })

    // pain behavior by id
    builder.addCase(getPainBehaviorByPainAreaId.fulfilled, (state, action) => {
  
      state.painBehaviorDataById = action.payload

    })

    builder.addCase(getPainBehaviorByPainAreaId.rejected, (state, action) => {
    
    })
    // All pain Behavior data

    builder.addCase(getAllPainBehaviorData.fulfilled, (state, action) => {
      state.allPainBehaviorData = action.payload

    })

    builder.addCase(getAllPainBehaviorData.rejected, (state, action) => {
   
    })

    // Pain Behavior data by id

    builder.addCase(getPainBehaviorById.fulfilled, (state, action) => {
      state.allPainBehaviorDataById = action.payload

    })

    builder.addCase(getPainBehaviorById.rejected, (state, action) => {
  
    })
  },
})
export default painBehaviorSlice.reducer;

export {
  postpainBehavior,
  getPainBehavior,
  getPainBehaviorByPainAreaId,
  getAllPainBehaviorData,
  deletPainBehavior,
  getPainBehaviorById,
  patchPainBehavior
}