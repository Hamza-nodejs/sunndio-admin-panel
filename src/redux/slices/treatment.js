import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
    allTreatmentData: [],
    treatmentDataById: "",
    isLoading: false,

}
const postTreatment = createAsyncThunk('postTreatment', async (values) => {
    const response = await api.postTreatment(values);
    return response.data
});

const getAllTreatment = createAsyncThunk('getAllTreatment', async () => {
    const response = await api.getAllTreatment();
    return response.data
});

const updateTreatment = createAsyncThunk('updateTeatment', async ({ id, payload }) => {
    const response = await api.updateTreatment({ id, payload });
    return response.data
});

const getTreatmentById = createAsyncThunk('getTreatmentById', async (id) => {
    const response = await api.getTreatmentById(id);
    return response.data
});

const deleteTreatment = createAsyncThunk('deleteTreatment', async (id) => {
    const response = await api.deleteTreatment(id);
    return response.data
});

const treatmentSlice = createSlice({
    name: "treatmentSlice",
    initialState: initialState,
    extraReducers: builder => {
        // post treatment
        builder.addCase(postTreatment.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(postTreatment.fulfilled, (state, action) => {
            state.isLoading = false;
        });

        builder.addCase(postTreatment.rejected, (state, action) => {
            state.isLoading = false
        });

        builder.addCase(getAllTreatment.fulfilled, (state, action) => {
            state.allTreatmentData = action.payload

        })
        // treatment by id

        builder.addCase(getTreatmentById.fulfilled, (state, action) => {
            state.treatmentDataById = action.payload

        })
    },
})
export default treatmentSlice.reducer;

export {
    postTreatment,
    getAllTreatment,
    updateTreatment,
    deleteTreatment,
    getTreatmentById
}