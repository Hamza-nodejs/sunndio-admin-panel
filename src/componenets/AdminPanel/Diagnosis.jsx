import React, { useState } from 'react'
import TextField from '../common/TextField';
import { useDispatch } from 'react-redux';
import { postDiagnosisDefinition } from '../../redux/slices/diagnosis';

const Diagnosis = () => {

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    diagnosisName: '',
    diagnosisNameEs: '',
    diagnosisDesc: '',
    diagnosisDescEs: '',
    treated: '',
    treatedEs: '',
    treatmentTime: '',
    treatmentTimeEs: ''
  })

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

  const errorHandling = () => {
    setError((prevError) => ({
      ...prevError,
      diagnosisName: values.diagnosisName.trim() === '' ? 'Please enter the diagnosis name*' : '',
      diagnosisNameEs: values.diagnosisNameEs.trim() === '' ? 'Please enter the diagnosis name Es*' : '',
      diagnosisDesc: values.diagnosisDesc.trim() === '' ? 'Please enter the description*' : '',
      diagnosisDescEs: values.diagnosisDescEs.trim() === '' ? 'Please enter the description*' : '',
      treated: values.treated.trim() === '' ? 'Please enter the treated field*' : '',
      treatedEs: values.treatedEs.trim() === '' ? 'Please enter the treated field*' : '',
      treatmentTime: values.treatmentTime.trim() === '' ? 'Please enter the treatment time*' : '',
      treatmentTimeEs: values.treatmentTimeEs.trim() === '' ? 'Please enter the treatment time*' : '',
    }));
  };

  const handleSubmit = async () => {
    errorHandling()

    if (!(values.diagnosisName.trim() === '' || values.diagnosisName.trim() === ''
      || values.diagnosisDesc.trim() === '' || values.diagnosisDescEs.trim() === '' ||
      values.treated.trim() === '' || values.treatedEs.trim() === '' ||
      values.treatmentTime.trim() === '' || values.treatmentTimeEs.trim() === ''
    )) {
      dispatch(postDiagnosisDefinition(values))
    }

  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
      <div className='row'>
      <div className='col-md-6' style={{paddingLeft : 0}}>
        <label className='form-label mt-4' htmlFor="diagnosis-eng">Enter pain diagnosis name in english </label>
        <TextField
          id="diagnosis-eng"
          placeholder='Enter the name of diagnosis name in English'
          onChange={(e) => setValues({ ...values, diagnosisName: e.target.value })} />
        {error.diagnosisName && <p className='error'>{error.diagnosisName}</p>}
      </div>

      <div className='col-md-6' style={{paddingRight : 0}}>
        <label className='form-label mt-4' htmlFor="diagnosis-spanish">Enter the name of diagnosis name in spanish </label>
        <TextField
          id="diagnosis-spanish"
          placeholder='Enter the name of diagnosis name in spanish'
          onChange={(e) => setValues({ ...values, diagnosisNameEs: e.target.value })} />
        {error.diagnosisNameEs && <p className='error'>{error.diagnosisNameEs}</p>}
      </div>
      </div>
  

      <div>
        <label className='form-label mt-4' htmlFor="des-eng">Enter diagnosis description in english </label>
        <TextField
          id="des-eng"
          placeholder='Enter the diagnos is description in English'
          onChange={(e) => setValues({ ...values, diagnosisDesc: e.target.value })} />
        {error.diagnosisDesc && <p className='error'>{error.diagnosisDesc}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="des-es">Enter diagnosis description in spanish </label>
        <TextField
          id="des-es"
          placeholder='Enter diagnosis description in spanish '
          onChange={(e) => setValues({ ...values, diagnosisDescEs: e.target.value })} />
        {error.diagnosisDescEs && <p className='error'>{error.diagnosisDescEs}</p>}
      </div>

      <div>
        <label className='form-label mt-4' htmlFor="treated">Enter treated in english </label>
        <TextField
          id="treated"
          placeholder='Enter the name of treated in English'
          onChange={(e) => setValues({ ...values, treated: e.target.value })} />
        {error.treated && <p className='error'>{error.treated}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="treated-es">Enter the name of treated in spanish </label>
        <TextField
          id="treated-es"
          placeholder='Enter the name of treated in spanish'
          onChange={(e) => setValues({ ...values, treatedEs: e.target.value })} />
        {error.treatedEs && <p className='error'>{error.treatedEs}</p>}
      </div>
      <div className="row">
      <div className='col-md-6' style={{paddingLeft : 0}}>
        <label className='form-label mt-4' htmlFor="traeted-time">Enter treatmentTime in english </label>
        <TextField
          id="traeted-time"
          placeholder='Enter the treatment time in English'
          onChange={(e) => setValues({ ...values, treatmentTime: e.target.value })} />
        {error.treatmentTime && <p className='error'>{error.treatmentTime}</p>}
      </div>
      <div className='col-md-6' style={{paddingRight : 0}}>
        <label className='form-label mt-4' htmlFor="traeted-time-es">Enter treatmentTimeEs in english </label>
        <TextField
          id="traeted-time-es"
          placeholder='Enter the treatment time in spanish'
          onChange={(e) => setValues({ ...values, treatmentTimeEs: e.target.value })} />
        {error.treatmentTimeEs && <p className='error'>{error.treatmentTimeEs}</p>}
      </div>
      </div>

      <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Diagnosis;
