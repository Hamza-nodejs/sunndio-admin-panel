import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from "react-redux";
import SelectField from '../../common/SelectField';
import NumberField from '../../common/NumberField';
import { getPainBehaviorByPainAreaId } from '../../../redux/slices/painBehavior';
import { getPainDeifnitionByPainAreaId } from '../../../redux/slices/painDefinition';
import { getPainArea } from '../../../redux/slices/painArea';
import { getPainBehaviorQuestion } from '../../../redux/slices/painBehaviorQuestion';
import { getPossibleDiagnosis } from '../../../redux/slices/possibleDiagnosis';
import { getAssignResultById, patchAssignResult, postAssignResult } from '../../../redux/slices/assignResult';
import { useLocation, useParams } from 'react-router-dom';

const Result = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(getAssignResultById(id))
    }
  }, [id, dispatch]);

  const updateValues = useSelector(state => state?.assignResultSlice?.assignResultDataById);
  const isLoading = useSelector(state => state?.assignResultSlice?.isLoading);

  const [values, setValues] = useState({
    painBehaviorId: '',
    painAreaId: "",
    painDefinitionId: "",
    behaviorQuestionId: "",
  })

  const [percentage, setPercentage] = useState("");
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isEdit = queryParams.get('edit');

    if(isEdit) {
      setPercentage(updateValues.Percentage)
      setIsUpdate(true)
    } else {
      setIsUpdate(false)
    }
  }, [updateValues, location])

  let [possibleDiagnosis, setPossibleDiagnosis] = useState([]);

  const [error, setError] = useState({
    painBehaviorId: '',
    painAreaId: "",
    painDefinitionId: "",
    behaviorQuestionId: "",
  })

  const [diagnosisError, setDiagnosisError] = useState("")

  useEffect(() => {
    dispatch(getPainArea());
  }, [dispatch]);

  const painAreaData = useSelector((state) => state?.painArea?.painAreaData);

  const handlePainArea = (e) => {
    setValues({ ...values, painAreaId: e.target.value });
    dispatch(getPainDeifnitionByPainAreaId(e.target.value));
  }

  const painDefintionDataById = useSelector(state => state?.painDefinitionSlice?.painDefinitionDataByAreaId);

  const handlePainDefinition = (e) => {
    setValues({ ...values, painDefinitionId: e.target.value });
    dispatch(getPainBehaviorByPainAreaId(e.target.value));
  }

  const painBehaviorDataById = useSelector(state => state?.painBehavior?.painBehaviorDataById);

  const handlePainBehavior = (e) => {
    setValues({ ...values, painBehaviorId: e.target.value });
    dispatch(getPainBehaviorQuestion(e.target.value));
    dispatch(getPossibleDiagnosis(e.target.value));
  }

  const painBehaviorQuestionData = useSelector(state => state?.painBehaviorQuestionSlice?.painBehaviorQuestionData);

  const possibleDiagnosisData = useSelector(state => state?.possibleDiagnosisSlice?.possibleDiagnosisData);

  const handleSubmit = async () => {
    const newErrors = {
      painBehaviorId: values.painBehaviorId ? '' : 'Please select the Pain Behavior*',
      painAreaId: values.painAreaId ? '' : 'Please select the Pain Area*',
      painDefinitionId: values.painDefinitionId ? '' : 'Please select the Pain Definition*',
      behaviorQuestionId: values.behaviorQuestionId ? '' : 'Please select the Question*',
    };

    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {

      if (possibleDiagnosisData.length === possibleDiagnosis.length) {

        possibleDiagnosis?.forEach(item => {
          const payloadTrue = {
            painBehaviorId: values.painBehaviorId,
            painBehaviorQuestionId: values.behaviorQuestionId,
            DiagAnswer: true,
            possibleDiagnosticId: item?.diagnosisId,
            Percentage: item.percentageTrue
          }
          const payloadFalse = {
            painBehaviorId: values.painBehaviorId,
            painBehaviorQuestionId: values.behaviorQuestionId,
            DiagAnswer: false,
            possibleDiagnosticId: item.diagnosisId,
            Percentage: item.percentageFalse
          }

          dispatch(postAssignResult(payloadTrue));
          dispatch(postAssignResult(payloadFalse));
          setValues({
            painBehaviorId: '',
            painAreaId: "",
            painDefinitionId: "",
            behaviorQuestionId: "",
          });
          setPossibleDiagnosis([]);
        })

      } else {
        setDiagnosisError("Please fill all the fields*");
      }
    }
  }

  const handleUpdate = () => {
    if (percentage !== "") {
      const payload = { Percentage: percentage };
      dispatch(patchAssignResult({ id: updateValues._id, payload }))
      setPercentage("")
    }
  }

  return (

    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
      {
        !isUpdate ? <>
          <div>
            <label className='form-label mt-4'>Pain Area</label>
            <SelectField
              onChange={handlePainArea}>
              <option value="">Please select the Pain Area</option>
              {
                painAreaData?.map(item => {
                  return <option key={item._id} value={item._id}>{item?.name}</option>
                })
              }
            </SelectField>
            {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
          </div>
          <div>
            <label className='form-label mt-4'>Pain Definition</label>
            <SelectField
              onChange={handlePainDefinition}>
              <option value="">Please select the Pain Definition</option>
              {
                painDefintionDataById.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
              }
            </SelectField>
            {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
          </div>
          <div>
            <label className='form-label mt-4'>Pain Behavior</label>
            <SelectField
              onChange={handlePainBehavior}>
              <option value="">Please select the Pain Behavior</option>
              {
                painBehaviorDataById.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
              }

            </SelectField>
            {error.painBehaviorId && <p className='error'>{error.painBehaviorId}</p>}
          </div>
          <div>
            <label className='form-label mt-4'>Question</label>
            <SelectField
              onChange={(e) => setValues({ ...values, behaviorQuestionId: e.target.value })}>
              <option value="">Please select the Question</option>
              {
                painBehaviorQuestionData.map(item => <option key={item._id} value={item._id}>{item.question}</option>)
              }

            </SelectField>
            {error.behaviorQuestionId && <p className='error'>{error.behaviorQuestionId}</p>}
          </div>

          <table className="table w-100 mt-4">
            <thead >
              <tr>
                <th>Possible Diagnosis</th>
                <th>Yes</th>
                <th>No</th>
              </tr>
            </thead>
            {diagnosisError && <tr className='error'>{diagnosisError}</tr>}
            <tbody>
              {
                possibleDiagnosisData?.map(item => {
                  return <tr key={item._id} >
                    <td>{item?.diagnosticsId?.diagnosisName}</td>
                    <td>
                      <NumberField
                        placeholder="Enter the Percentage for yes"
                        onBlur={(e) => {
                          const { value } = e.target;
                          const index = possibleDiagnosis.findIndex(diag => diag.diagnosisId === item._id);
                          if (index !== -1) {
                            possibleDiagnosis[index].percentageTrue = value
                          } else {
                            possibleDiagnosis.push({
                              diagnosisId: item._id,
                              percentageTrue: value,
                            })
                          }
                        }}
                      />
                    </td>
                    <td>
                      <NumberField
                        placeholder="Enter the Percentage for no"
                        onBlur={(e) => {
                          const { value } = e.target;
                          const index = possibleDiagnosis.findIndex(diag => diag.diagnosisId === item._id);
                          if (index !== -1) {
                            possibleDiagnosis[index].percentageFalse = value
                          } else {
                            possibleDiagnosis.push({
                              diagnosisId: item._id,
                              percentageFalse: value,
                            })
                          }
                        }}
                      />
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>

          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>
            {isLoading ? "Loading..." : "Submit"}</button>
        </> :
          <>
            <label className='form-label mt-4'>Enter the Percentage</label>
            <NumberField
              placeholder="Enter the Percentage"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
            <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          </>
      }

    </div>
  )
}

export default Result
