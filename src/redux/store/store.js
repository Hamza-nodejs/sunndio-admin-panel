import { configureStore } from '@reduxjs/toolkit';
import painArea from '../slices/painArea';
import painDefinitionSlice from '../slices/painDefinition';
import questionDefinitionSlice from '../slices/questionDefinitionSlice';
import diagnosis from '../slices/diagnosis';
import painBehavior from "../slices/painBehavior";
import painBehaviorQuestionSlice from "../slices/painBehaviorQuestion";
import possibleDiagnosisSlice from "../slices/possibleDiagnosis";
import probabilityDiseaseSlice from "../slices/probabilityDisease";

const store = configureStore({
  reducer: {
      painArea,
      painDefinitionSlice,
      questionDefinitionSlice,
      diagnosis,
      painBehavior,
      painBehaviorQuestionSlice,
      possibleDiagnosisSlice,
      probabilityDiseaseSlice
  },
});

export default store;
