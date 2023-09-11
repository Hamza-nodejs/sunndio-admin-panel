import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
    painBehaviorData: [],

}
const postProbabilityDisease = createAsyncThunk('postProbabilityDisease', async (values) => {
    const response = await api.postProbabilityDisease(values);
    return response.data
});

const probabilityDiseaseSlice = createSlice({
    name: "probabilityDiseaseSlice",
    initialState: initialState,
    extraReducers: builder => {

        // Handle the fulfilled action
        builder.addCase(postProbabilityDisease.fulfilled, (state, action) => {
            // toast.success("successfully saved")
        });

        // Handle the rejected action
        builder.addCase(postProbabilityDisease.rejected, (state, action) => {
            // toast.error("Api call is faild")
        });
    },
})
export default probabilityDiseaseSlice.reducer;

export { postProbabilityDisease }