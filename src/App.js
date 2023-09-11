import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from './config/routes';
import AdminLayout from './layout/AdminLayout/AdminLayout';
import PainArea from './componenets/AdminPanel/painArea/PainArea';
import PainDefinition from './componenets/AdminPanel/painDefinition/PainDefinition';
import PainBehavior from './componenets/AdminPanel/painBehavior/PainBehavior';
import PainRelatedQuestions from './componenets/AdminPanel/question/PainRelatedQuestions';
import ProbabilityDisease from './componenets/AdminPanel/ProbabilityDisease';
import Result from './componenets/AdminPanel/assignResult/Result';
import Diagnosis from './componenets/AdminPanel/diagnosisDefinition/Diagnosis';
import PossibleDiagnosis from './componenets/AdminPanel/possibleDiagnosis/PossibleDiagnosis';
import PainBehaviorQuestion from './componenets/AdminPanel/painBehaviorQuestion/PainBehaviorQuestion';
import GetPainArea from './componenets/AdminPanel/painArea/GetPainArea';
import GetPainDefinition from './componenets/AdminPanel/painDefinition/GetPainDefinition';
import GetPainBehavior from './componenets/AdminPanel/painBehavior/GetPainBehavior';
import GetAllQuestion from './componenets/AdminPanel/question/GetAllQuestion';
import GetDiagnosisDefinitions from './componenets/AdminPanel/diagnosisDefinition/GetDiagnosisDefinitions';
import GetPainBehaviorQuestion from './componenets/AdminPanel/painBehaviorQuestion/GetPainBehaviorQuestion';
import GetPossibleDiagnosis from './componenets/AdminPanel/possibleDiagnosis/GetPossibleDiagnosis';
import GetResult from './componenets/AdminPanel/assignResult/GetResult';
import Treatment from './componenets/AdminPanel/treatment/Treatment';
import GetTreatment from './componenets/AdminPanel/treatment/GetTreatment';
import HomePage from './componenets/AdminPanel/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
          path='/'
          element={<AdminLayout><HomePage/></AdminLayout>}
          />
          <Route
            path={routes?.panel.painArea}
            element={
              <AdminLayout>
                <PainArea />
              </AdminLayout>
            }
          />
          <Route
            path={routes?.panel.editPainArea}
            element={
              <AdminLayout>
                <PainArea />
              </AdminLayout>
            }
          />
          <Route
            path={routes?.panel.getPainArea}
            element={
              <AdminLayout>
                <GetPainArea />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.painBehavior}
            element={
              <AdminLayout>
                <PainBehavior />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.editPainBehavior}
            element={
              <AdminLayout>
                <PainBehavior />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.getPainBehavior}
            element={
              <AdminLayout>
                <GetPainBehavior />
              </AdminLayout>
            } />
          <Route
            path={routes.panel.painDefinition}
            element={
              <AdminLayout>
                <PainDefinition />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.editPainDefinition}
            element={
              <AdminLayout>
                <PainDefinition />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.getPainDefinition}
            element={
              <AdminLayout>
                <GetPainDefinition />
              </AdminLayout>
            } />
          <Route
            path={routes.panel.painRelatedQuestion}
            element={
              <AdminLayout>
                <PainRelatedQuestions />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.editQuestion}
            element={
              <AdminLayout>
                <PainRelatedQuestions />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.getQuestions}
            element={
              <AdminLayout>
                <GetAllQuestion />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.diagnosisDefinition}
            element={
              <AdminLayout>
                <Diagnosis />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.editDiagnosisDefinition}
            element={
              <AdminLayout>
                <Diagnosis />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.getDiagnosisDefinition}
            element={
              <AdminLayout>
                <GetDiagnosisDefinitions />
              </AdminLayout>
            }
          />
          <Route path={routes.panel.painBehaviorQuestion}
            element={
              <AdminLayout>
                <PainBehaviorQuestion />
              </AdminLayout>
            }
          />
          <Route path={routes.panel.getPainBehaviorQuestion}
            element={
              <AdminLayout>
                <GetPainBehaviorQuestion />
              </AdminLayout>
            }
          />
          <Route path={routes.panel.editPainBehaviorQuestion}
            element={
              <AdminLayout>
                <PainBehaviorQuestion />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.possibleDiagnosis}
            element={
              <AdminLayout>
                <PossibleDiagnosis />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.getPossibleDiagnosis}
            element={
              <AdminLayout>
                <GetPossibleDiagnosis />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.editPossibleDiagnosis}
            element={
              <AdminLayout>
                <PossibleDiagnosis />
              </AdminLayout>}
          />
          <Route
            path={routes.panel.probabilityDisease}
            element={
              <AdminLayout>
                <ProbabilityDisease />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.result}
            element={
              <AdminLayout>
                <Result />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.editResult}
            element={
              <AdminLayout>
                <Result />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.getResult}
            element={
              <AdminLayout>
                <GetResult />
              </AdminLayout>}
          />
          <Route
            path={routes.panel.treatment}
            element={
              <AdminLayout>
                <Treatment />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.getTreatment}
            element={
              <AdminLayout>
                <GetTreatment />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.editTreatment}
            element={
              <AdminLayout>
                <Treatment />
              </AdminLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
