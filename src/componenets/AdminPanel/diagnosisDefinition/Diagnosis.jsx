import React, { useState } from 'react'
import TextField from '../../common/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { getDiagnosisDefinitonById, patchDiagnosisDefiniton, postDiagnosisDefinition } from '../../../redux/slices/diagnosis';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Diagnosis = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getDiagnosisDefinitonById(id))
    }
  }, [id, dispatch]);

  const updateValues = useSelector(state => state?.diagnosis?.diagnosisDefinitonById);
  const [values, setValues] = useState({})

  useEffect(() => {
    setValues({
      diagnosisName: updateValues?.diagnosisName ? updateValues?.diagnosisName : '',
      diagnosisNameEs: updateValues?.diagnosisNameEs ? updateValues?.diagnosisNameEs : '',
      diagnosisDesc: updateValues?.diagnosisDesc ? updateValues?.diagnosisDesc : '',
      diagnosisDescEs: updateValues?.diagnosisDescEs ? updateValues?.diagnosisDescEs : '',
      treated: updateValues?.treated ? updateValues?.treated : '',
      treatedEs: updateValues?.treatedEs ? updateValues?.treatedEs : '',
      treatmentTime: updateValues?.treatmentTime ? updateValues?.treatmentTime : '',
      treatmentTimeEs: updateValues?.treatmentTimeEs ? updateValues?.treatmentTimeEs : ''
    })
  }, [updateValues]);

  const [error, setError] = useState({
    diagnosisName: '',
    diagnosisNameEs: '',
    diagnosisDesc: '',
    diagnosisDescEs: '',
    treated: '',
    treatedEs: '',
    treatmentTime: '',
    treatmentTimeEs: ''
  })

  const handleSubmit = async () => {
    const newErrors = {
      diagnosisName: values.diagnosisName.trim() === '' ? 'Please enter the diagnosis name in English*' : '',
      diagnosisNameEs: values.diagnosisNameEs.trim() === '' ? 'Please enter the diagnosis name in Spanish*' : '',
      diagnosisDesc: values.diagnosisDesc.trim() === '' ? 'Please enter the description*' : '',
      diagnosisDescEs: values.diagnosisDescEs.trim() === '' ? 'Please enter the description*' : '',
      treated: values.treated.trim() === '' ? 'Please enter the treated field in English*' : '',
      treatedEs: values.treatedEs.trim() === '' ? 'Please enter the treated field in Spanish*' : '',
      treatmentTime: values.treatmentTime.trim() === '' ? 'Please enter the treatment time in English*' : '',
      treatmentTimeEs: values.treatmentTimeEs.trim() === '' ? 'Please enter the treatment time in Spanish*' : '',
    }
    setError(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      dispatch(postDiagnosisDefinition(values))
      setValues({
        diagnosisName: '',
        diagnosisNameEs: '',
        diagnosisDesc: '',
        diagnosisDescEs: '',
        treated: '',
        treatedEs: '',
        treatmentTime: '',
        treatmentTimeEs: ''
      })
    }

  }

  const handleUpdate = () => {
    const newErrors = {
      diagnosisName: values.diagnosisName.trim() === '' ? 'Please enter the diagnosis name in English*' : '',
      diagnosisNameEs: values.diagnosisNameEs.trim() === '' ? 'Please enter the diagnosis name in Spanish*' : '',
      diagnosisDesc: values.diagnosisDesc.trim() === '' ? 'Please enter the description*' : '',
      diagnosisDescEs: values.diagnosisDescEs.trim() === '' ? 'Please enter the description*' : '',
      treated: values.treated.trim() === '' ? 'Please enter the treatment field in English*' : '',
      treatedEs: values.treatedEs.trim() === '' ? 'Please enter the treatment field in Spanish*' : '',
      treatmentTime: values.treatmentTime.trim() === '' ? 'Please enter the treatment time in English*' : '',
      treatmentTimeEs: values.treatmentTimeEs.trim() === '' ? 'Please enter the treatment time in Spanish*' : '',
    }
    setError(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      dispatch(patchDiagnosisDefiniton({ id: updateValues?._id, payload: values }))
      setValues({
        diagnosisName: '',
        diagnosisNameEs: '',
        diagnosisDesc: '',
        diagnosisDescEs: '',
        treated: '',
        treatedEs: '',
        treatmentTime: '',
        treatmentTimeEs: ''
      })
    }
  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', padding: "30px" }}>
      <div>
        <label className='form-label mt-4' htmlFor="diagnosis-eng">Pain Diagnosis name in English </label>
        <TextField
          id="diagnosis-eng"
          placeholder='Please enter Pain Diagnosis name in English '
          onChange={(e) => setValues({ ...values, diagnosisName: e.target.value })}
          value={values.diagnosisName}
        />
        {error.diagnosisName && <p className='error'>{error.diagnosisName}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="diagnosis-spanish">Pain Diagnosis name in Spanish </label>
        <TextField
          id="diagnosis-spanish"
          placeholder='Please enter Pain Diagnosis name in Spanish'
          onChange={(e) => setValues({ ...values, diagnosisNameEs: e.target.value })}
          value={values.diagnosisNameEs}
        />
        {error.diagnosisNameEs && <p className='error'>{error.diagnosisNameEs}</p>}
      </div>

      <div>
        <label className='form-label mt-4' htmlFor="des-eng">Diagnosis description in English </label>
        <TextField
          id="des-eng"
          placeholder='Please enter Diagnosis description in English'
          onChange={(e) => setValues({ ...values, diagnosisDesc: e.target.value })}
          value={values.diagnosisDesc}
        />
        {error.diagnosisDesc && <p className='error'>{error.diagnosisDesc}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="des-es">Diagnosis description in Spanish</label>
        <TextField
          id="des-es"
          placeholder='Please enter Diagnosis description in Spanish'
          onChange={(e) => setValues({ ...values, diagnosisDescEs: e.target.value })}
          value={values.diagnosisDescEs}
        />
        {error.diagnosisDescEs && <p className='error'>{error.diagnosisDescEs}</p>}
      </div>

      <div>
        <label className='form-label mt-4' htmlFor="treated">Name of Treatment in English</label>
        <TextField
          id="treated"
          placeholder='Please enter the name of Treatment in English'
          onChange={(e) => setValues({ ...values, treated: e.target.value })}
          value={values.treated}
        />
        {error.treated && <p className='error'>{error.treated}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="treated-es">Name of Treatment in Spanish</label>
        <TextField
          id="treated-es"
          placeholder='Please enter the name of Treatment in Spanish'
          onChange={(e) => setValues({ ...values, treatedEs: e.target.value })}
          value={values.treatedEs}
        />
        {error.treatedEs && <p className='error'>{error.treatedEs}</p>}
      </div>
      <div>

        <label className='form-label mt-4' htmlFor="traeted-time">Treatment Time in English </label>
        <TextField
          id="traeted-time"
          placeholder='Please enter the Treatment Time in English'
          onChange={(e) => setValues({ ...values, treatmentTime: e.target.value })}
          value={values.treatmentTime}
        />
        {error.treatmentTime && <p className='error'>{error.treatmentTime}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="traeted-time-es">Treatment Time in Spanish</label>
        <TextField
          id="traeted-time-es"
          placeholder='Please enter Treatment Time in Spanish'
          onChange={(e) => setValues({ ...values, treatmentTimeEs: e.target.value })}
          value={values.treatmentTimeEs}
        />
        {error.treatmentTimeEs && <p className='error'>{error.treatmentTimeEs}</p>}
      </div>
      {
        updateValues ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
      }
    </div>
  )
}

export default Diagnosis;
