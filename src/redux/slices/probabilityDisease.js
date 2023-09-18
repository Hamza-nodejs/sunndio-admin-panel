import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
          
        });

        // Handle the rejected action
        builder.addCase(postProbabilityDisease.rejected, (state, action) => {
        
        });
    },
})
export default probabilityDiseaseSlice.reducer;

export { postProbabilityDisease }