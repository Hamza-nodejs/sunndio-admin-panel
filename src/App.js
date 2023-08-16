import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from './config/routes';
import AdminLayout from './layout/AdminLayout/AdminLayout';
import PainArea from './componenets/AdminPanel/PainArea';
import PainDefinition from './componenets/AdminPanel/PainDefinition';
import PainBehavior from './componenets/AdminPanel/PainBehavior';
import PainRelatedQuestions from './componenets/AdminPanel/PainRelatedQuestions';
import ProbabilityDisease from './componenets/AdminPanel/ProbabilityDisease';
import Result from './componenets/AdminPanel/Result';
import Diagnosis from './componenets/AdminPanel/Diagnosis';
import PossibleDiagnosis from './componenets/AdminPanel/PossibleDiagnosis';
import PainBehaviorQuestion from './componenets/AdminPanel/PainBehaviorQuestion';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={routes?.panel.painArea}
            element={
              <AdminLayout>
                <PainArea />
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
            path={routes.panel.painDefinition}
            element={
              <AdminLayout>
                <PainDefinition />
              </AdminLayout>
            }
          />
          <Route
            path={routes.panel.painRelatedQuestion}
            element={
              <AdminLayout>
                <PainRelatedQuestions />
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
          <Route path={routes.panel.painBehaviorQuestion}
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
