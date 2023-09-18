import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/api";

const initialState = {
    possibleDiagnosisData: [],
    allPossibleDiagnosisData: [],
    possibleDiagnosisDataById : "",

}

const postPossibleDiagnosis = createAsyncThunk('postPossibleDiagnosis', async (values) => {
    const response = await api.postPossibleDiagnosis(values);
    return response.data
});

const getPossibleDiagnosis = createAsyncThunk('getPossibleDiagnosis', async (painBehaviorId) => {
    const response = await api.getPossibleDiagnosis(painBehaviorId);
    return response.data
});

const getAllPossibleDiagnosis = createAsyncThunk('getAllPossibleDiagnosis', async () => {
    const response = await api.getAllPossibleDiagnosis();
    return response.data
});

const deletePossibleDaignosis = createAsyncThunk('deletePossibleDaignosis', async (id) => {
    const response = await api.deletePossibleDaignosis(id);
    return response.data
});

const getPossibleDiagnosisById =  createAsyncThunk('getPossibleDiagnosisById', async (id) => {
    const response = await api.getPossibleDiagnosisById(id);
    return response.data
}); 

const patchPossibleDiagnosis =  createAsyncThunk('patchPossibleDiagnosis', async ({id, payload}) => {
    const response = await api.patchPossibleDiagnosis({id, payload});
    console.log(payload)
    return response.data
}); 

const possibleDiagnosisSlice = createSlice({
    name: "possibleDiagnosisSlice",
    initialState: initialState,
    extraReducers: builder => {

        // Handle the fulfilled action
        builder.addCase(postPossibleDiagnosis.fulfilled, (state, action) => {
           
        });

        // Handle the rejected action
        builder.addCase(postPossibleDiagnosis.rejected, (state, action) => {
       
        });

        builder.addCase(getPossibleDiagnosis.fulfilled, (state, action) => {
            state.possibleDiagnosisData = action.payload
        });

        // Handle the rejected action
        builder.addCase(getPossibleDiagnosis.rejected, (state, action) => {
        
        });
        builder.addCase(getAllPossibleDiagnosis.fulfilled, (state, action) => {
            state.allPossibleDiagnosisData = action.payload
        });

        // Handle the rejected action
        builder.addCase(getAllPossibleDiagnosis.rejected, (state, action) => {
        
        });

        builder.addCase(getPossibleDiagnosisById.fulfilled, (state, action) => {
            state.possibleDiagnosisDataById = action.payload
        });

        // Handle the rejected action
        builder.addCase(getPossibleDiagnosisById.rejected, (state, action) => {
        
        });
    },
})
export default possibleDiagnosisSlice.reducer;

export {
    postPossibleDiagnosis,
    getPossibleDiagnosis,
    getAllPossibleDiagnosis,
    deletePossibleDaignosis,
    getPossibleDiagnosisById,
    patchPossibleDiagnosis
}