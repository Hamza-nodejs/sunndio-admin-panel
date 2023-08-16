import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
    painBehaviorData : [],

}

const postPainBehaviorQuestion = createAsyncThunk('painBehavior', async (values) => {
      const response = await api.postPainBehaviorQuestion(values);
      return response.data
  });

  const painBehaviorQuestionSlice = createSlice({
    name : "painBehaviorSlice",
    initialState : initialState,
    extraReducers: builder => {
 
        // Handle the fulfilled action
        builder.addCase(postPainBehaviorQuestion.fulfilled, (state, action) => {
            toast.success("successfully saved")
        });
    
        // Handle the rejected action
        builder.addCase(postPainBehaviorQuestion.rejected, (state, action) => {
          toast.error("Api call is faild")
        });
    },
})
export default painBehaviorQuestionSlice.reducer;

export { postPainBehaviorQuestion }