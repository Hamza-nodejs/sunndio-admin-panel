import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

const initialState = {
    assignResultData: [],
    assignResultDataById: "",
    isLoading : false,

}
const postAssignResult = createAsyncThunk('postAssignResult', async (values) => {
    const response = await api.postAssignResult(values);
    return response.data
});

const getAssignResult = createAsyncThunk('getAssignResult', async () => {
    const response = await api.getAssignResult();
    return response.data
});

const assignResultDelete = createAsyncThunk('assignResultDelete', async (id) => {
    const response = await api.assignResultDelete(id);
    return response.data
});

const getAssignResultById = createAsyncThunk('getAssignResultById', async (id) => {
    const response = await api.getAssignResultById(id);
    return response.data
});

const patchAssignResult =  createAsyncThunk('patchAssignResult', async ({id, payload}) => {
    const response = await api.patchAssignResult({id, payload });
    return response.data
});

const assignResultSlice = createSlice({
    name: "assignResultSlice",
    initialState: initialState,
    extraReducers: builder => {

        builder.addCase(postAssignResult.pending , (state, action) => {
                 state.isLoading = true;
        })
        // Handle the fulfilled action
        builder.addCase(postAssignResult.fulfilled, (state, action) => {
                state.isLoading = false;
        });

        // Handle the rejected action
        builder.addCase(postAssignResult.rejected, (state, action) => {
             state.isLoading = false;
        });

        builder.addCase(getAssignResult.fulfilled, (state, action) => {
            state.assignResultData = action.payload
           
        });

        // Handle the rejected action
        builder.addCase(getAssignResult.rejected, (state, action) => {
            
        });
        builder.addCase(getAssignResultById.fulfilled, (state, action) => {
            state.assignResultDataById = action.payload
          
        });

        // Handle the rejected action
        builder.addCase(getAssignResultById.rejected, (state, action) => {
            
        });
    },
})
export default assignResultSlice.reducer;

export {
    postAssignResult,
    getAssignResult,
    assignResultDelete,
    getAssignResultById,
    patchAssignResult
}