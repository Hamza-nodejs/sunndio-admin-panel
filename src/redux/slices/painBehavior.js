import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
    painBehaviorData : [],
    painBehaviorDataById : [],

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

const painBehaviorSlice = createSlice({
    name : "painBehaviorSlice",
    initialState : initialState,
    extraReducers: builder => {
 
        // Handle the fulfilled action
        builder.addCase(postpainBehavior.fulfilled, (state, action) => {
            toast.success("successfully saved")
        });
    
        // Handle the rejected action
        builder.addCase(postpainBehavior.rejected, (state, action) => {
          toast.error("Api call is faild")
        });

        // Get pain area data 
     
        builder.addCase(getPainBehavior.fulfilled, (state, action) => {
          toast.success("Successful fetch data");
          state.painBehaviorData = action.payload
          
        })

        builder.addCase(getPainBehavior.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })

        // pain behavior by id
        builder.addCase(getPainBehaviorByPainAreaId.fulfilled, (state, action) => {
            toast.success("Successful fetch data");
            state.painBehaviorDataById = action.payload
            
          })
  
          builder.addCase(getPainBehaviorByPainAreaId.rejected, (state, action) => {
            toast.error("Error during fetching data");
          })
      },
})
export default painBehaviorSlice.reducer;

export { postpainBehavior ,getPainBehavior, getPainBehaviorByPainAreaId }