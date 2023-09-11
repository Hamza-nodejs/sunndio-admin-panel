import React from 'react'
import TextField from '../../common/TextField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionById, patchQuestionDefinition, postQuestionDefinition } from '../../../redux/slices/questionDefinitionSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PainRelatedQuestion = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
      dispatch(getQuestionById(id));
  },[id])

  const updatedValues = useSelector(state => state?.questionDefinitionSlice?.questionDataById);


  const [values, setValues] = useState({})

  useEffect(() => {
    setValues({
      question : updatedValues?.question ? updatedValues?.question : "",
      questionEs : updatedValues?.questionEs ? updatedValues?.questionEs : "",
    })
  }, [updatedValues]);

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
      setValues({
        question: "",
        questionEs: "",
    
      })
    }
  }

  const handleUpdate = () => {
    const newErrors = {
      question: values.question.trim() === '' ? 'Please enter the question*' : '',
      questionEs: values.questionEs.trim() === '' ? 'Please enter the question in Spanish*' : '',
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if(!hasErrors) {
       const payload = {
        question : values.question,
        questionEs : values.questionEs,
       }
       dispatch(patchQuestionDefinition({id: updatedValues._id, payload}));
       setValues({
        question: "",
        questionEs: "",
      })
    }
  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
      <div>
        <label className='form-label mt-4' htmlFor="english">Enter the pain related question in english </label>
        <TextField
          id="english"
          placeholder='Enter the pain related question in english '
          onChange={(e) => setValues({ ...values, question: e.target.value })} 
          value={values.question}
          />
        {error.question && <p className='error'>{error.question}</p>}
      </div>

      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="spanish">Enter the pain related question in spanish </label>
        <TextField
          id="spanish"
          placeholder='Enter the pain related question in spanish'
          onChange={(e) => setValues({ ...values, questionEs: e.target.value })}
          value={values.questionEs}
        />
        {error.questionEs && <p className='error'>{error.questionEs}</p>}
      </div>
      {
          updatedValues ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
        }

    </div>
  )
}

export default PainRelatedQuestion
