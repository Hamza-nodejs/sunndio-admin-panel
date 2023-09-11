import { configureStore } from '@reduxjs/toolkit';
import painArea from '../slices/painArea';
import painDefinitionSlice from '../slices/painDefinition';
import questionDefinitionSlice from '../slices/questionDefinitionSlice';
import diagnosis from '../slices/diagnosis';
import painBehavior from "../slices/painBehavior";
import painBehaviorQuestionSlice from "../slices/painBehaviorQuestion";
import possibleDiagnosisSlice from "../slices/possibleDiagnosis";
import probabilityDiseaseSlice from "../slices/probabilityDisease";
import assignResultSlice from "../slices/assignResult";

const store = configureStore({
  reducer: {
      painArea,
      painDefinitionSlice,
      questionDefinitionSlice,
      diagnosis,
      painBehavior,
      painBehaviorQuestionSlice,
      possibleDiagnosisSlice,
      probabilityDiseaseSlice,
      assignResultSlice,
  },
});

export default store;
