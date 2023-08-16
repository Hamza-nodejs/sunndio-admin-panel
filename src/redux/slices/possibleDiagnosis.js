import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
    painBehaviorData: [],

}

const postPossibleDiagnosis = createAsyncThunk('postPossibleDiagnosis', async (values) => {
    const response = await api.postPossibleDiagnosis(values);
    return response.data
});

const possibleDiagnosisSlice = createSlice({
    name: "possibleDiagnosisSlice",
    initialState: initialState,
    extraReducers: builder => {

        // Handle the fulfilled action
        builder.addCase(postPossibleDiagnosis.fulfilled, (state, action) => {
            toast.success("successfully saved")
        });

        // Handle the rejected action
        builder.addCase(postPossibleDiagnosis.rejected, (state, action) => {
            toast.error("Api call is faild")
        });
    },
})
export default possibleDiagnosisSlice.reducer;

export { postPossibleDiagnosis }