import axios from "axios";
const host = process.env.REACT_APP_PROD_API;

const api = {
    // pain Area apis
    postPainArea: async (payload) => await axios.post(`${host}/painArea`, payload),
    getPainArea: async () => await axios.get(`${host}/painareas/en`),
    getAllPainArea: async () => await axios.get(`${host}/getAllPainArea`),
    deletePainArea: async (id) => await axios.delete(`${host}/painarea/${id}`),
    patchPainArea: async ({ id, payload }) => await axios.patch(`${host}/painarea/${id}`, payload),
    getPainAaraeById: async (id) => await axios.get(`${host}/getPainAreaById/${id}`),

    postPainDefinition: async (payload) => await axios.post(`${host}/painDefinition`, payload),
    getPainDefintion: async () => await axios.get(`${host}/getPainDefinition`),
    getPainDeifnitionByPainAreaId: async (id) => await axios.get(`${host}/painDefinitionsByPainAreaId/en/${id}`),
    deletePainDefinition: async (id) => await axios.delete(`${host}/painDefinition/${id}`),
    getPainDefinitionById: async (id) => await axios.get(`${host}/getpainDefinitions/${id}`),
    patchPainDefinition: async ({ id, payload }) => await axios.put(`${host}/painDefinition/${id}`, payload),

    postQuestionDefinition: async (payload) => await axios.post(`${host}/question`, payload),
    getQuestionDefinition: async () => await axios.get(`${host}/questions/en`),
    getAllQuestion : async () => await axios.get(`${host}/getAllQuestion`),
    deleteQuestion : async (id) => await axios.delete(`${host}/question/${id}`),
    getQuestionById : async (id) => await axios.get(`${host}/question/${id}`),
    patchQuestionDefinition : async ({id, payload}) => await axios.patch(`${host}/question/${id}`, payload),

    postDiagnosisDefinition: async (payload) => await axios.post(`${host}/diagnostic`, payload),
    getDiagnosisDefinition: async () => await axios.get(`${host}/diagnostic/en`),
    getAllDiagnosisDefinition : async () => await axios.get(`${host}/getAlldiagnosis`),
    deleteDianosisDefinition : async (id) => await axios.delete(`${host}/diagnostic/${id}`),
    getDiagnosisDefinitonById : async (id) => await axios.get(`${host}/diagnostics/${id}`),
    patchDiagnosisDefiniton : async ({id, payload}) => await axios.patch(`${host}/diagnostic/${id}`, payload),

    postPainBehavior: async (payload) => await axios.post(`${host}/painbehavior`, payload),
    getPainBehavior: async () => await axios.get(`${host}/painBehaviors/en`),
    getPainBehaviorByPainAreaId: async (id) => await axios.get(`${host}/painBehaviorsByPainDefinition/en/${id}`),
    getAllPainBehaviorData: async () => await axios.get(`${host}/getAllPainBehavior`),
    deletPainBehavior: async (id) => await axios.delete(`${host}/painbehavior/${id}`),
    getPainBehaviorById: async (id) => await axios.get(`${host}/painBehavior/${id}`),
    patchPainBehavior: async ({ id, payload }) => await axios.put(`${host}/painbehavior/${id}`, payload),

    postPainBehaviorQuestion: async (payload) => await axios.post(`${host}/addPainBehaviorQuestion`, payload),
    getPainBehaviorQuestion: async (painBehaviorId) => await axios.get(`${host}/questionsByPainBehavior/en/${painBehaviorId}`),
    getAllPainBehaviorQuestion : async () => await axios.get(`${host}/getAllPainBheaviorQuestion`),
    deletePainBehaviorQuestion : async (id) => await axios.delete(`${host}/painBehaviorDelete/${id}`),
    getPainBehaviorQuestionById : async (id) => await axios.get(`${host}/getPainBehaviorQuestionById/${id}`),
    patchPainBehaviorQuestion : async ({id, payload}) => await axios.put(`${host}/editPainBehaviorQustion/${id}`, payload),

    postPossibleDiagnosis: async (payload) => await axios.post(`${host}/addPainPossibleDiagnosis`, payload),
    // getPossibleDiagnosis: async (painBehaviorId) => await axios.get(`${host}/painPossibleDiagBypainBehaviorId/en/${painBehaviorId}`),
    getPossibleDiagnosis : async (painBehaviorId) => await axios.get(`${host}/getPossibleDiagnosisByPainBehavior/${painBehaviorId}`),
    getAllPossibleDiagnosis : async () => await axios.get(`${host}/getAllPainPossibleDiag`),
    deletePossibleDaignosis : async (id) => await axios.delete(`${host}/painPossibleDiag/${id}`),
    getPossibleDiagnosisById : async (id) => await axios.get(`${host}/getPainPossibleDiagById/${id}`),
    patchPossibleDiagnosis : async ({id, payload}) => await axios.patch(`${host}/painPossibleDiag/${id}`,payload),

    postProbabilityDisease: async (payload) => await axios.post(`${host}/Probability`, payload),

    postAssignResult: async (payload) => await axios.post(`${host}/assignResult`, payload),
    getAssignResult : async () => await axios.get(`${host}/assignResult`),
    assignResultDelete : async (id) => await axios.delete(`${host}/AssignResult/${id}`),
    getAssignResultById : async (id) => await axios.get(`${host}/assignResult/${id}`),
    patchAssignResult : async ({id, payload}) => await axios.patch(`${host}/AssignResult/${id}`, payload),

    postTreatment : async (payload) => await axios.post(`${host}/addTreatment`, payload),
    getAllTreatment : async () => await axios.get(`${host}/getAllTreatment`),
    updateTreatment : async ({id, payload}) => await axios.put(`${host}/updateTheTreatment/${id}`, payload),
    getTreatmentById : async (id) => await axios.get(`${host}/getTreatmentById/${id}`),
    deleteTreatment : async (id) => await axios.delete(`${host}/deleteTreatment/${id}`),
};


export default api;