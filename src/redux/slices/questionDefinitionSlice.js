import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
     questionDefinitionData : [],
     allQuestionData : [],
}

const postQuestionDefinition = createAsyncThunk('QuestionDefinition', async (values) => {
      const response = await api.postQuestionDefinition(values);
      return response.data
  });

  const getQuestionDefinition = createAsyncThunk("getQuestionDefinition", async () => {
    const response = await api.getQuestionDefinition();

    return response.data
  })

  const getAllQuestion = createAsyncThunk("getAllQuestion", async () => {
    const response = await api.getAllQuestion();
    return response.data
  });

  const deleteQuestion = createAsyncThunk("deleteQuestion", async (id) => {
    const response = await api.deleteQuestion(id);
    return response.data
  });

const questionDefinitionSlice = createSlice({
    name : "QuestionDefinitionSlice",
    initialState : initialState,
    extraReducers: builder => {
 
        // Handle the fulfilled action
        builder.addCase(postQuestionDefinition.fulfilled, (state, action) => {
            toast.success("Question successfully saved")
        });
    
        // Handle the rejected action
        builder.addCase(postQuestionDefinition.rejected, (state, action) => {
          toast.error("Api call is faild")
        });

        // Get pain area data 
     
        builder.addCase(getQuestionDefinition.fulfilled, (state, action) => {
          toast.success("Successful fetch data");
          state.questionDefinitionData = action.payload
          
        })

        builder.addCase(getQuestionDefinition.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })

        // Aall questions

        builder.addCase(getAllQuestion.fulfilled, (state, action) => {
          toast.success("Successful fetch data");
          state.allQuestionData = action.payload
          
        })

        builder.addCase(getAllQuestion.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })
      },
})
export default questionDefinitionSlice.reducer;

export { postQuestionDefinition, getQuestionDefinition, getAllQuestion, deleteQuestion }