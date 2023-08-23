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
    dispatch(getDiagnosisDefinitonById(id))
  }, [id]);

  const updateValues = useSelector(state => state?.diagnosis?.diagnosisDefinitonById);

  console.log("dianosis by id: ", updateValues)

  const [values, setValues] = useState({})

  useEffect(() => {
      setValues({
        diagnosisName: updateValues?.diagnosisName ? updateValues?.diagnosisName :  '',
        diagnosisNameEs: updateValues?.diagnosisNameEs ? updateValues?.diagnosisNameEs :  '',
        diagnosisDesc: updateValues?.diagnosisDesc ? updateValues?.diagnosisDesc :  '',
        diagnosisDescEs: updateValues?.diagnosisDescEs ? updateValues?.diagnosisDescEs :  '',
        treated: updateValues?.treated ? updateValues?.treated :  '',
        treatedEs: updateValues?.treatedEs ? updateValues?.treatedEs :  '',
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
      diagnosisName: values.diagnosisName.trim() === '' ? 'Please enter the diagnosis name*' : '',
      diagnosisNameEs: values.diagnosisNameEs.trim() === '' ? 'Please enter the diagnosis name Es*' : '',
      diagnosisDesc: values.diagnosisDesc.trim() === '' ? 'Please enter the description*' : '',
      diagnosisDescEs: values.diagnosisDescEs.trim() === '' ? 'Please enter the description*' : '',
      treated: values.treated.trim() === '' ? 'Please enter the treated field*' : '',
      treatedEs: values.treatedEs.trim() === '' ? 'Please enter the treated field*' : '',
      treatmentTime: values.treatmentTime.trim() === '' ? 'Please enter the treatment time*' : '',
      treatmentTimeEs: values.treatmentTimeEs.trim() === '' ? 'Please enter the treatment time*' : '',
    }
    setError(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      dispatch(postDiagnosisDefinition(values))
    }

  }

  const handleUpdate = () => {
    const newErrors = {
      diagnosisName: values.diagnosisName.trim() === '' ? 'Please enter the diagnosis name*' : '',
      diagnosisNameEs: values.diagnosisNameEs.trim() === '' ? 'Please enter the diagnosis name Es*' : '',
      diagnosisDesc: values.diagnosisDesc.trim() === '' ? 'Please enter the description*' : '',
      diagnosisDescEs: values.diagnosisDescEs.trim() === '' ? 'Please enter the description*' : '',
      treated: values.treated.trim() === '' ? 'Please enter the treated field*' : '',
      treatedEs: values.treatedEs.trim() === '' ? 'Please enter the treated field*' : '',
      treatmentTime: values.treatmentTime.trim() === '' ? 'Please enter the treatment time*' : '',
      treatmentTimeEs: values.treatmentTimeEs.trim() === '' ? 'Please enter the treatment time*' : '',
    }
    setError(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      dispatch(patchDiagnosisDefiniton({id: updateValues?._id, payload : values}))
    }
  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
      <div>
        <label className='form-label mt-4' htmlFor="diagnosis-eng">Enter pain diagnosis name in english </label>
        <TextField
          id="diagnosis-eng"
          placeholder='Enter the name of diagnosis name in English'
          onChange={(e) => setValues({ ...values, diagnosisName: e.target.value })} 
          value={values.diagnosisName}
          />
        {error.diagnosisName && <p className='error'>{error.diagnosisName}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="diagnosis-spanish">Enter the name of diagnosis name in spanish </label>
        <TextField
          id="diagnosis-spanish"
          placeholder='Enter the name of diagnosis name in spanish'
          onChange={(e) => setValues({ ...values, diagnosisNameEs: e.target.value })} 
          value={values.diagnosisNameEs}
          />
        {error.diagnosisNameEs && <p className='error'>{error.diagnosisNameEs}</p>}
      </div>

      <div>
        <label className='form-label mt-4' htmlFor="des-eng">Enter diagnosis description in english </label>
        <TextField
          id="des-eng"
          placeholder='Enter the diagnos is description in English'
          onChange={(e) => setValues({ ...values, diagnosisDesc: e.target.value })} 
          value={values.diagnosisDesc}
          />
        {error.diagnosisDesc && <p className='error'>{error.diagnosisDesc}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="des-es">Enter diagnosis description in spanish </label>
        <TextField
          id="des-es"
          placeholder='Enter diagnosis description in spanish '
          onChange={(e) => setValues({ ...values, diagnosisDescEs: e.target.value })} 
          value={values.diagnosisDescEs}
          />
        {error.diagnosisDescEs && <p className='error'>{error.diagnosisDescEs}</p>}
      </div>

      <div>
        <label className='form-label mt-4' htmlFor="treated">Enter treated in english </label>
        <TextField
          id="treated"
          placeholder='Enter the name of treated in English'
          onChange={(e) => setValues({ ...values, treated: e.target.value })} 
          value={values.treated}
          />
        {error.treated && <p className='error'>{error.treated}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="treated-es">Enter the name of treated in spanish </label>
        <TextField
          id="treated-es"
          placeholder='Enter the name of treated in spanish'
          onChange={(e) => setValues({ ...values, treatedEs: e.target.value })} 
          value={values.treatedEs}
          />
        {error.treatedEs && <p className='error'>{error.treatedEs}</p>}
      </div>
      <div>

        <label className='form-label mt-4' htmlFor="traeted-time">Enter treatmentTime in english </label>
        <TextField
          id="traeted-time"
          placeholder='Enter the treatment time in English'
          onChange={(e) => setValues({ ...values, treatmentTime: e.target.value })} 
          value={values.treatmentTime}
          />
        {error.treatmentTime && <p className='error'>{error.treatmentTime}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="traeted-time-es">Enter treatmentTimeEs in english </label>
        <TextField
          id="traeted-time-es"
          placeholder='Enter the treatment time in spanish'
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
