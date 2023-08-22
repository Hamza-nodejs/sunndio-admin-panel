import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../config/api";
import { useNavigation } from "react-router-dom";
import routes from "../../config/routes";

const initialState = {
     painAreaData : [],
     allPainArea : [],
     updatePainArea : "",
     painAreaDataById: "",
     isLoading : false,
}

const postPainArea = createAsyncThunk('painArea', async (values) => {
      const response = await api.postPainArea(values);
      return response.data
  });

  const getPainArea = createAsyncThunk("getPainArea", async () => {
    const response = await api.getPainArea();

    return response.data
  })

  const getAllPainArea = createAsyncThunk("getAllPianArea", async () => {
    const response = await api.getAllPainArea();

    return response.data
  })

  const deletePainArea = createAsyncThunk("deletePainArea", async (id) => {
    const response = await api.deletePainArea(id);

    return response.data
  })

  const patchPainArea = createAsyncThunk("patchPainArea", async ({id, payload}) => {
    const response = await api.patchPainArea({id, payload});

    return response.data
  })

  const getPainAaraeById =  createAsyncThunk("getPainAaraeById", async (id) => {
    const response = await api.getPainAaraeById(id);

    return response.data
  })



const painAreaSlice = createSlice({
    name : "painArea",
    initialState : initialState,
    reducers : {
      updateValue : (state, action) => {
           state.updatePainArea = action.payload;
      }
    },
    extraReducers: builder => {
 
        // Handle the fulfilled action
        builder.addCase(postPainArea.fulfilled, (state, action) => {
            toast.success("successfully updated")
        });
    
        // Handle the rejected action
        builder.addCase(postPainArea.rejected, (state, action) => {
          toast.error("Api call is faild")
        });

        // Get pain area data 
     
        builder.addCase(getPainArea.fulfilled, (state, action) => {
          toast.success("Successful fetch data");
          state.painAreaData = action.payload
          
        })

        builder.addCase(getPainArea.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })
        
        // Get all pain area

        builder.addCase(getAllPainArea.fulfilled, (state, action) => {
          toast.success("Successful fetch data");
          state.allPainArea = action.payload
          
        })

        builder.addCase(getAllPainArea.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })

        // delete pain area

        
        builder.addCase(deletePainArea.fulfilled, (state, action) => {
          toast.success("Successful Delete");
          state.allPainArea = action.payload
          
        })

        builder.addCase(deletePainArea.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })

        // update item

        builder.addCase(patchPainArea.fulfilled, (state, action) => {
          toast.success("Successful Update");
          state.allPainArea = action.payload
        })

        builder.addCase(patchPainArea.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })

        //get pain area by id

        builder.addCase(getPainAaraeById.fulfilled, (state, action) => {
          toast.success("Successful Update");
          state.painAreaDataById = action.payload
        })

        builder.addCase(getPainAaraeById.rejected, (state, action) => {
          toast.error("Error during fetching data");
        })
      },
})
export const { updateValue } = painAreaSlice.actions;
export default painAreaSlice.reducer;

export { postPainArea, getPainArea, getAllPainArea, deletePainArea, patchPainArea, getPainAaraeById }