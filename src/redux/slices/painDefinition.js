import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
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
      toast.success("successfully saved")
    });

    // Handle the rejected action
    builder.addCase(postPainDefinition.rejected, (state, action) => {
      toast.error("Api call is faild")
    });

    // Get pain area data 

    builder.addCase(getPainDefintion.fulfilled, (state, action) => {
      toast.success("Successful fetch data");
      state.painDefintionData = action.payload

    })

    builder.addCase(getPainDefintion.rejected, (state, action) => {
      toast.error("Error during fetching data");
    })
    // Pain Defintion by id

    builder.addCase(getPainDeifnitionByPainAreaId.fulfilled, (state, action) => {
      toast.success("Successful fetch data");
      state.painDefinitionDataByAreaId = action.payload

    })

    builder.addCase(getPainDeifnitionByPainAreaId.rejected, (state, action) => {
      toast.error("Error during fetching data");
    })

    // delete pain definition

    builder.addCase(deletePainDefinition.fulfilled, (state, action) => {
      toast.success("Successful delete");

    })

    builder.addCase(deletePainDefinition.rejected, (state, action) => {
      toast.error("Error during fetching data");
    })

    // pain definition by id

    builder.addCase(getPainDefinitionById.fulfilled, (state, action) => {
      toast.success("Successful updated");

      state.painDefinitionById = action.payload

    })

    builder.addCase(getPainDefinitionById.rejected, (state, action) => {
      toast.error("Error during fetching data");
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