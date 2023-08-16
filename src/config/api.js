import axios from "axios";

const Host = "http://localhost:8080";

const api = {
    postPainArea : async(payload) =>  await axios.post(`${Host}/painarea`, payload),
    getPainArea : async ()  => await axios.get(`${Host}/painareas/en`),

    postPainDefinition : async (payload) =>    await axios.post(`${Host}/painDefinition`, payload),
    getPainDefintion : async () => await axios.get(`${Host}/painDefinitions`),
    getPainDeifnitionByPainAreaId : async (id) => await axios.get(`${Host}/painDefinitionsByPainAreaId/en/${id}`),

    postQuestionDefinition : async (payload) => await axios.post(`${Host}/question`, payload),
    getQuestionDefinition : async () => await axios.get(`${Host}/questions/en`),

    postDiagnosisDefinition : async (payload) => await axios.post(`${Host}/diagnostic`, payload),
    getDiagnosisDefinition : async () => await axios.get(`${Host}/diagnostic/en`),

    postPainBehavior : async (payload) => await axios.post(`${Host}/painbehavior`, payload),
    getPainBehavior : async () => await axios.get(`${Host}/painBehaviors/en`),
    getPainBehaviorByPainAreaId : async (id) => await axios.get(`${Host}/painBehaviorsByPainDefinition/en/${id}`),

    postPainBehaviorQuestion : async (payload) => await axios.post(`${Host}/addPainBehaviorQuestion`, payload),
 
    postPossibleDiagnosis : async (payload) => await axios.post(`${Host}/addPainPossibleDiagnosis`, payload),

    postProbabilityDisease : async (payload) => await axios.post(`${Host}/Probability`, payload),
};


export default api;