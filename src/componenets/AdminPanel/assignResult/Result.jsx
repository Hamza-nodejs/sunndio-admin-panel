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
import { useParams } from 'react-router-dom';

const Result = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAssignResultById(id))
  }, [id]);

  const updateValues = useSelector(state => state?.assignResultSlice?.assignResultDataById);

  const [values, setValues] = useState({
    painBehaviorId: '',
    painAreaId: "",
    painDefinitionId: "",
    behaviorQuestionId: "",
  })

  const [percentage, setPercentage] = useState("");

  useEffect(() => {
    setPercentage(updateValues.Percentage)
  },[updateValues])

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
  }, []);

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
      painBehaviorId: values.painBehaviorId ? '' : 'Please select the pain behavior*',
      painAreaId: values.painAreaId ? '' : 'Please select the pain area*',
      painDefinitionId: values.painDefinitionId ? '' : 'Please select the pain definition*',
      behaviorQuestionId: values.behaviorQuestionId ? '' : 'Please select the pain behavior question*',
    };

    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {

      if (possibleDiagnosisData.length === possibleDiagnosis.length) {

        possibleDiagnosis?.map(item => {
          const payloadTrue = {
            painBehaviorId: values.painBehaviorId,
            painBehaviorQuestionId: values.behaviorQuestionId,
            DiagAnswer: true,
            possibleDiagnosticId: item.diagnosisId,
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
        setDiagnosisError("Please enter the all field data");
      }

    }
  }

  const handleUpdate = () => {
       if(percentage !== "" ){
       const  payload = { Percentage : percentage};
       dispatch(patchAssignResult({id : updateValues._id, payload}))
       setPercentage("")
       }
  }

  return (

    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
      {
        !updateValues ? <>
          <div>
            <label className='form-label mt-4'>Please select the pain area</label>
            <SelectField
              onChange={handlePainArea}>
              <option value="">Please select the pain definition</option>
              {
                painAreaData?.map(item => {
                  return <option value={item._id}>{item?.name}</option>
                })
              }
            </SelectField>
            {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
          </div>
          <div>
            <label className='form-label mt-4'>Select the pain definition</label>
            <SelectField
              onChange={handlePainDefinition}>
              <option value="">Please select the pain definition</option>
              {
                painDefintionDataById.map(item => <option value={item._id}>{item.name}</option>)
              }
            </SelectField>
            {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
          </div>
          <div>
            <label className='form-label mt-4'>Select pain Behavior</label>
            <SelectField
              onChange={handlePainBehavior}>
              <option value="">Please select the pain behavior</option>
              {
                painBehaviorDataById.map(item => <option value={item._id}>{item.name}</option>)
              }

            </SelectField>
            {error.painBehaviorId && <p className='error'>{error.painBehaviorId}</p>}
          </div>
          <div>
            <label className='form-label mt-4'>Select the pain related question</label>
            <SelectField
              onChange={(e) => setValues({ ...values, behaviorQuestionId: e.target.value })}>
              <option value="">Please select the pain related question</option>
              {
                painBehaviorQuestionData.map(item => <option value={item._id}>{item.question}</option>)
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
                  return <tr>
                    <td>{item.diagnosisName}</td>
                    <td>
                      <NumberField
                        placeholder="Enter the percentage for yes"
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
                        placeholder="Enter the percentage for no"
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

          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
        </> :
          <>
            <label className='form-label mt-4'>Enter the percentage</label>
            <NumberField
              placeholder="Enter the percentage for no"
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