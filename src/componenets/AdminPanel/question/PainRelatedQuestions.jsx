import React from 'react'
import TextField from '../../common/TextField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionById, patchQuestionDefinition, postQuestionDefinition } from '../../../redux/slices/questionDefinitionSlice';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const PainRelatedQuestion = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(getQuestionById(id));
    }
  }, [id, dispatch])

  const updatedValues = useSelector(state => state?.questionDefinitionSlice?.questionDataById);


  const [values, setValues] = useState({});
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isEdit = queryParams.get('edit');

    if (isEdit) {
      setValues({
        question: updatedValues?.question ? updatedValues?.question : "",
        questionEs: updatedValues?.questionEs ? updatedValues?.questionEs : "",
      })
      setIsUpdate(true)
    } else {
      setValues({
        question: "",
        questionEs: "",
      })
      setIsUpdate(false)
    }
  }, [updatedValues, location]);

  const [error, setError] = useState({
    question: "",
    questionEs: "",

  })

  const handleSubmit = async () => {
    const newErrors = {
      question: values.question.trim() === '' ? 'Please enter the Question in English*' : '',
      questionEs: values.questionEs.trim() === '' ? 'Please enter the Question in Spanish*' : '',
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
      question: values.question.trim() === '' ? 'Please enter the Question in English*' : '',
      questionEs: values.questionEs.trim() === '' ? 'Please enter the Question in Spanish*' : '',
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const payload = {
        question: values.question,
        questionEs: values.questionEs,
      }
      dispatch(patchQuestionDefinition({ id: updatedValues._id, payload }));
      setValues({
        question: "",
        questionEs: "",
      })
    }
  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
      <div>
        <label className='form-label mt-4' htmlFor="english">Question in English</label>
        <TextField
          id="english"
          placeholder='Please enter the Question in English '
          onChange={(e) => setValues({ ...values, question: e.target.value })}
          value={values.question}
        />
        {error.question && <p className='error'>{error.question}</p>}
      </div>

      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="spanish">Question in Spanish</label>
        <TextField
          id="spanish"
          placeholder='Please enter the Question in Spanish'
          onChange={(e) => setValues({ ...values, questionEs: e.target.value })}
          value={values.questionEs}
        />
        {error.questionEs && <p className='error'>{error.questionEs}</p>}
      </div>
      {
        isUpdate ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
      }

    </div>
  )
}

export default PainRelatedQuestion
