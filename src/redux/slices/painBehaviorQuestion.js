import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

const initialState = {
    painBehaviorQuestionData: [],
    allPainBehaviorQuestion: [],
    painBehaviorDataById: "",
}

const postPainBehaviorQuestion = createAsyncThunk('painBehavior', async (values) => {
    const response = await api.postPainBehaviorQuestion(values);
    return response.data
});

const getPainBehaviorQuestion = createAsyncThunk("getPainBehaviorQuestion", async (painBehaviorId) => {
    const response = await api.getPainBehaviorQuestion(painBehaviorId);

    return response.data;
})

const getAllPainBehaviorQuestion = createAsyncThunk("getAllPainBehaviorQuestion", async () => {
    const response = await api.getAllPainBehaviorQuestion();

    return response.data;
})

const deletePainBehaviorQuestion = createAsyncThunk("deletePainBehaviorQuestion", async (id) => {
    const response = await api.deletePainBehaviorQuestion(id);

    return response.data;
});

const getPainBehaviorQuestionById = createAsyncThunk("getPainBehaviorQuestionById", async (id) => {
    const response = await api.getPainBehaviorQuestionById(id);
    return response.data;
});

const patchPainBehaviorQuestion = createAsyncThunk("patchPainBehaviorQuestion", async ({id, payload}) => {
    const response = await api.patchPainBehaviorQuestion({id, payload});
    return response.data;
});

const painBehaviorQuestionSlice = createSlice({
    name: "painBehaviorSlice",
    initialState: initialState,
    extraReducers: builder => {

        // Handle the fulfilled action
        builder.addCase(postPainBehaviorQuestion.fulfilled, (state, action) => {
           
        });

        // Handle the rejected action
        builder.addCase(postPainBehaviorQuestion.rejected, (state, action) => {
         
        });

        // get pain Behavior question

        builder.addCase(getPainBehaviorQuestion.fulfilled, (state, action) => {
            state.painBehaviorQuestionData = action.payload;
        });

        // Handle the rejected action
        builder.addCase(getPainBehaviorQuestion.rejected, (state, action) => {
         
        });
        // all pain behavior questions
        builder.addCase(getAllPainBehaviorQuestion.fulfilled, (state, action) => {
            state.allPainBehaviorQuestion = action.payload;
        });

        // Handle the rejected action
        builder.addCase(getAllPainBehaviorQuestion.rejected, (state, action) => {
      
        });

        // get Pain Behavior question by id

        builder.addCase(getPainBehaviorQuestionById.fulfilled, (state, action) => {
            state.painBehaviorDataById = action.payload;
        });

        // Handle the rejected action
        builder.addCase(getPainBehaviorQuestionById.rejected, (state, action) => {
         
        });
    },
})
export default painBehaviorQuestionSlice.reducer;

export {
    postPainBehaviorQuestion,
    getPainBehaviorQuestion,
    getAllPainBehaviorQuestion,
    deletePainBehaviorQuestion,
    getPainBehaviorQuestionById,
    patchPainBehaviorQuestion
}