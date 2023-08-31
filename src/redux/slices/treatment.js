import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
    painBehaviorData: [],

}
const postTreatment = createAsyncThunk('postTreatment', async (values) => {
    const response = await api.postTreatment(values);
    return response.data
});

const treatmentSlice = createSlice({
    name: "treatmentSlice",
    initialState: initialState,
    extraReducers: builder => {
         
    },
})
export default treatmentSlice.reducer;

export { postTreatment }