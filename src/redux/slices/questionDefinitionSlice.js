import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

const initialState = {
  questionDefinitionData: [],
  allQuestionData: [],
  questionDataById: "",
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

const getQuestionById = createAsyncThunk("getQuestionById", async (id) => {
  const response = await api.getQuestionById(id);
  return response.data
});

const patchQuestionDefinition = createAsyncThunk("patchQuestionDefinition", async ({id, payload}) => {
  const response = await api.patchQuestionDefinition({id, payload});
  return response.data
});

const questionDefinitionSlice = createSlice({
  name: "QuestionDefinitionSlice",
  initialState: initialState,
  extraReducers: builder => {

    // Handle the fulfilled action
    builder.addCase(postQuestionDefinition.fulfilled, (state, action) => {
      
    });

    // Handle the rejected action
    builder.addCase(postQuestionDefinition.rejected, (state, action) => {
    
    });

    // Get pain area data 

    builder.addCase(getQuestionDefinition.fulfilled, (state, action) => {
      state.questionDefinitionData = action.payload

    })

    builder.addCase(getQuestionDefinition.rejected, (state, action) => {
      
    })

    // Aall questions

    builder.addCase(getAllQuestion.fulfilled, (state, action) => {
      state.allQuestionData = action.payload

    })

    builder.addCase(getAllQuestion.rejected, (state, action) => {
      
    })

    // Question data by id

    builder.addCase(getQuestionById.fulfilled, (state, action) => {
      state.questionDataById = action.payload
    })

    builder.addCase(getQuestionById.rejected, (state, action) => {
      
    })
  },
})
export default questionDefinitionSlice.reducer;

export {
  postQuestionDefinition,
  getQuestionDefinition,
  getAllQuestion,
  deleteQuestion,
  getQuestionById,
  patchQuestionDefinition
}