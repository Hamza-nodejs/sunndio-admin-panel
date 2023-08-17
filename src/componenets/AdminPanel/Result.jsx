import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from "react-redux";
import SelectField from '../common/SelectField';
import NumberField from '../common/NumberField';
import { getPainBehaviorByPainAreaId } from '../../redux/slices/painBehavior';
import { getPainDeifnitionByPainAreaId } from '../../redux/slices/painDefinition';
import { getPainArea } from '../../redux/slices/painArea';
import { getPainBehaviorQuestion } from '../../redux/slices/painBehaviorQuestion';
import { getPossibleDiagnosis } from '../../redux/slices/possibleDiagnosis';
import { postAssignResult } from '../../redux/slices/assignResult';

const Result = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    painBehaviorId: '',
    painAreaId: "",
    painDefinitionId: "",
    possibleDiaId: "",
    behaviorQuestionId: "",
    percentage: "",
    diaAnswer: "",
    possibleDiagnosis: []
  })

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
      if (possibleDiagnosisData.length === values.possibleDiagnosis.length) {
        values?.possibleDiagnosis?.map(item => {
          const payload = {
            painBehaviorId: values.painBehaviorId,
            painBehaviorQuestionId: values.behaviorQuestionId,
            DiagAnswer: item.diaAnswer,
            Percentage: item.percentage,
            possibleDiagnosticId: item.possibleDiaId
          }
          dispatch(postAssignResult(payload))
        })

      } else {
        setDiagnosisError("Please enter the all filed data");
      }

    }
  }

  const handlePossibleDiagnosis = (id, answer, percentage) => {
    const newPossibleDiagnosis = {
      possibleDiaId: id,
      diaAnswer: answer,
      percentage: percentage
    };
    setValues({
      ...values,
      possibleDiagnosis: [...values.possibleDiagnosis, newPossibleDiagnosis]
    });
    setDiagnosisError("")
  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
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
            <th>Question Answer</th>
            <th>Percentage</th>
            <th>Submit Data</th>
          </tr>
        </thead>
        {diagnosisError && <p className='error'>{diagnosisError}</p>}
        <tbody>
          {
            possibleDiagnosisData?.map(item => {
              return <tr>
                <td>{item.diagnosisName}</td>
                <td><div class="form-check">
                  <input class="form-check-input" type="radio" value="true" name={item._id}
                    onChange={(e) => setValues({ ...values, diaAnswer: e.target.value })} />
                  <label class="form-check-label">
                    Yes
                  </label>
                </div>
                  <div className="form-check">
                    <input class="form-check-input" type="radio" value="false" name={item._id}
                      onChange={(e) => setValues({ ...values, diaAnswer: e.target.value })}
                    />
                    <label class="form-check-label">
                      No
                    </label>
                  </div>
                </td>
                <td>
                  <NumberField
                    placeholder="Enter the percentage"
                    onChange={(e) => setValues({ ...values, percentage: e.target.value })}
                  />
                </td>
                <td>
                  <button className='btn btn-success' onClick={() => handlePossibleDiagnosis(item._id, values.diaAnswer, values.percentage)}>Enter data</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>

      <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Result
