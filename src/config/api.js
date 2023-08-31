import axios from "axios";

const Host = "http://localhost:8080";

const api = {
    // pain Area apis
    postPainArea: async (payload) => await axios.post(`${Host}/painArea`, payload),
    getPainArea: async () => await axios.get(`${Host}/painareas/en`),
    getAllPainArea: async () => await axios.get(`${Host}/getAllPainArea`),
    deletePainArea: async (id) => await axios.delete(`${Host}/painarea/${id}`),
    patchPainArea: async ({ id, payload }) => await axios.patch(`${Host}/painarea/${id}`, payload),
    getPainAaraeById: async (id) => await axios.get(`${Host}/getPainAreaById/${id}`),

    postPainDefinition: async (payload) => await axios.post(`${Host}/painDefinition`, payload),
    getPainDefintion: async () => await axios.get(`${Host}/getPainDefinition`),
    getPainDeifnitionByPainAreaId: async (id) => await axios.get(`${Host}/painDefinitionsByPainAreaId/en/${id}`),
    deletePainDefinition: async (id) => await axios.delete(`${Host}/painDefinition/${id}`),
    getPainDefinitionById: async (id) => await axios.get(`${Host}/getpainDefinitions/${id}`),
    patchPainDefinition: async ({ id, payload }) => await axios.put(`${Host}/painDefinition/${id}`, payload),

    postQuestionDefinition: async (payload) => await axios.post(`${Host}/question`, payload),
    getQuestionDefinition: async () => await axios.get(`${Host}/questions/en`),
    getAllQuestion : async () => await axios.get(`${Host}/getAllQuestion`),
    deleteQuestion : async (id) => await axios.delete(`${Host}/question/${id}`),
    getQuestionById : async (id) => await axios.get(`${Host}/question/${id}`),
    patchQuestionDefinition : async ({id, payload}) => await axios.patch(`${Host}/question/${id}`, payload),

    postDiagnosisDefinition: async (payload) => await axios.post(`${Host}/diagnostic`, payload),
    getDiagnosisDefinition: async () => await axios.get(`${Host}/diagnostic/en`),
    getAllDiagnosisDefinition : async () => await axios.get(`${Host}/getAlldiagnosis`),
    deleteDianosisDefinition : async (id) => await axios.delete(`${Host}/diagnostic/${id}`),
    getDiagnosisDefinitonById : async (id) => await axios.get(`${Host}/diagnostics/${id}`),
    patchDiagnosisDefiniton : async ({id, payload}) => await axios.patch(`${Host}/diagnostic/${id}`, payload),

    postPainBehavior: async (payload) => await axios.post(`${Host}/painbehavior`, payload),
    getPainBehavior: async () => await axios.get(`${Host}/painBehaviors/en`),
    getPainBehaviorByPainAreaId: async (id) => await axios.get(`${Host}/painBehaviorsByPainDefinition/en/${id}`),
    getAllPainBehaviorData: async () => await axios.get(`${Host}/getAllPainBehavior`),
    deletPainBehavior: async (id) => await axios.delete(`${Host}/painbehavior/${id}`),
    getPainBehaviorById: async (id) => await axios.get(`${Host}/painBehavior/${id}`),
    patchPainBehavior: async ({ id, payload }) => await axios.put(`${Host}/painbehavior/${id}`, payload),

    postPainBehaviorQuestion: async (payload) => await axios.post(`${Host}/addPainBehaviorQuestion`, payload),
    getPainBehaviorQuestion: async (painBehaviorId) => await axios.get(`${Host}/questionsByPainBehavior/en/${painBehaviorId}`),
    getAllPainBehaviorQuestion : async () => await axios.get(`${Host}/getAllPainBheaviorQuestion`),
    deletePainBehaviorQuestion : async (id) => await axios.delete(`${Host}/painBehaviorDelete/${id}`),
    getPainBehaviorQuestionById : async (id) => await axios.get(`${Host}/getPainBehaviorQuestionById/${id}`),
    patchPainBehaviorQuestion : async ({id, payload}) => await axios.put(`${Host}/editPainBehaviorQustion/${id}`, payload),

    postPossibleDiagnosis: async (payload) => await axios.post(`${Host}/addPainPossibleDiagnosis`, payload),
    getPossibleDiagnosis: async (painBehaviorId) => await axios.get(`${Host}/painPossibleDiagBypainBehaviorId/en/${painBehaviorId}`),
    getAllPossibleDiagnosis : async () => await axios.get(`${Host}/getAllPainPossibleDiag`),
    deletePossibleDaignosis : async (id) => await axios.delete(`${Host}/painPossibleDiag/${id}`),
    getPossibleDiagnosisById : async (id) => await axios.get(`${Host}/getPainPossibleDiagById/${id}`),
    patchPossibleDiagnosis : async ({id, payload}) => await axios.patch(`${Host}/painPossibleDiag/${id}`,payload),

    postProbabilityDisease: async (payload) => await axios.post(`${Host}/Probability`, payload),

    postAssignResult: async (payload) => await axios.post(`${Host}/assignResult`, payload),
    getAssignResult : async () => await axios.get(`${Host}/assignResult`),
    assignResultDelete : async (id) => await axios.delete(`${Host}/AssignResult/${id}`),
    getAssignResultById : async (id) => await axios.get(`${Host}/assignResult/${id}`),
    patchAssignResult : async ({id, payload}) => await axios.patch(`${Host}/AssignResult/${id}`, payload),

    postTreatment : async (payload) => await axios.post(`${Host}/addTreatment`, payload),
};


export default api;