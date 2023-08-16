import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
     painAreaData : [],
     isLoading : false,
}

const postPainArea = createAsyncThunk('painArea', async (values) => {
      const response = await api.postPainArea(values);
      return response.data
  });

  const getPainArea = createAsyncThunk("getPainArea", async () => {
    const response = await api.getPainArea();

    return response.data
  })

const painAreaSlice = createSlice({
    name : "painArea",
    initialState : initialState,
    extraReducers: builder => {
 
        // Handle the fulfilled action
        builder.addCase(postPainArea.fulfilled, (state, action) => {
            toast.success("successfully updated")
        });
    
        // Handle the rejected action
        builder.addCase(postPainArea.rejected, (state, action) => {
          toast.error("Api call is faild")
        });

        // Get pain area data 
     
        builder.addCase(getPainArea.fulfilled, (state, action) => {
          toast.success("Successful fetch data");
          state.painAreaData = action.payload
          
        })

        builder.addCase(getPainArea.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })
      },
})
export default painAreaSlice.reducer;

export { postPainArea, getPainArea }