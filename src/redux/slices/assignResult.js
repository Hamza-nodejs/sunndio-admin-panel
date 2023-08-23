import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
    painBehaviorData: [],

}
const postAssignResult = createAsyncThunk('postAssignResult', async (values) => {
    const response = await api.postAssignResult(values);
    return response.data
});

const assignResultSlice = createSlice({
    name: "assignResultSlice",
    initialState: initialState,
    extraReducers: builder => {

        // Handle the fulfilled action
        builder.addCase(postAssignResult.fulfilled, (state, action) => {
            // toast.success("successfully saved")
        });

        // Handle the rejected action
        builder.addCase(postAssignResult.rejected, (state, action) => {
            // toast.error("Api call is faild")
        });
    },
})
export default assignResultSlice.reducer;

export { postAssignResult }