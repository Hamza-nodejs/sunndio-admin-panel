import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";

const initialState = {
     diagnosisData : [],

}

const postDiagnosisDefinition = createAsyncThunk('diagnosisDefinition', async (values) => {
      const response = await api.postDiagnosisDefinition(values);
      console.log(response);
      return response.data
  });

  const getDiagnosisDefinition = createAsyncThunk("getDiagnosisDefinition", async () => {
    const response = await api.getDiagnosisDefinition();

    return response.data
  })

const diagnosisDefinitionSlice = createSlice({
    name : "diagnosisDefinitionSlice",
    initialState : initialState,
    extraReducers: builder => {
 
        // Handle the fulfilled action
        builder.addCase(postDiagnosisDefinition.fulfilled, (state, action) => {
            toast.success("Diagnosis successfully saved")
        });
    
        // Handle the rejected action
        builder.addCase(postDiagnosisDefinition.rejected, (state, action) => {
          toast.error("Api call is faild")
        });

        // Get pain area data 
     
        builder.addCase(getDiagnosisDefinition.fulfilled, (state, action) => {
          toast.success("Successful fetch data");
          state.diagnosisData = action.payload
          
        })

        builder.addCase(getDiagnosisDefinition.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })
      },
})
export default diagnosisDefinitionSlice.reducer;

export { postDiagnosisDefinition, getDiagnosisDefinition }