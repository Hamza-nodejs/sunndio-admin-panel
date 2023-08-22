import React from 'react'
import TextField from '../../common/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postQuestionDefinition } from '../../../redux/slices/questionDefinitionSlice';

const PainRelatedQuestion = () => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    question: "",
    questionEs: "",

  })

  const [error, setError] = useState({
    question: "",
    questionEs: "",

  })

  const handleSubmit = async () => {
    const newErrors = {
      question: values.question.trim() === '' ? 'Please enter the question*' : '',
      questionEs: values.questionEs.trim() === '' ? 'Please enter the question in Spanish*' : '',
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (!hasErrors) {
      dispatch(postQuestionDefinition(values))
    }
  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
      <div>
        <label className='form-label mt-4' htmlFor="english">Enter the pain related question in english </label>
        <TextField
          id="english"
          placeholder='Enter the pain related question in english '
          onChange={(e) => setValues({ ...values, question: e.target.value })} />
        {error.question && <p className='error'>{error.question}</p>}
      </div>

      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="spanish">Enter the pain related question in spanish </label>
        <TextField
          id="spanish"
          placeholder='Enter the pain related question in spanish'
          onChange={(e) => setValues({ ...values, questionEs: e.target.value })}
        />
        {error.questionEs && <p className='error'>{error.questionEs}</p>}
      </div>

      <button className='btn w-100 btn-primary p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>

    </div>
  )
}

export default PainRelatedQuestion
