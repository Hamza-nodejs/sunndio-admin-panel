import React from 'react';
import SelectField from '../../common/SelectField';
import TextField from '../../common/TextField';
import FileField from '../../common/FileField';
import Loader from "../../common/Loader";
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiagnosisDefinition } from '../../../redux/slices/diagnosis';
import { getTreatmentById, postTreatment, updateTreatment } from '../../../redux/slices/treatment';
import { useParams } from 'react-router-dom';

const Treatment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getTreatmentById(id))
  }, [id, dispatch])

  const updatedValues = useSelector(state => state?.treatmentSlice?.treatmentDataById);
  const isLoading = useSelector(state => state?.treatmentSlice?.isLoading);

  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({
      diagnosticId: updatedValues.diagnosticId?._id ? updatedValues?.diagnosticId?._id : "",
      title: updatedValues?.title ? updatedValues.title : "",
      titleEs: updatedValues?.titleEs ? updatedValues.titleEs : "",
      duration: updatedValues?.duration ? updatedValues.duration : "",
      treatmentLevel: updatedValues?.treatmentLevel ? updatedValues.treatmentLevel : "",
      treatmentUrl: "",
    })
  }, [updatedValues])

  const [error, setError] = useState({})

  useEffect(() => {
    dispatch(getDiagnosisDefinition())
  }, [dispatch])

  const diagnosisData = useSelector(state => state?.diagnosis?.diagnosisData);

  const handleSubmit = () => {
    const newErrors = {
      diagnosticId: values?.diagnosticId === "" ? "Please select the diagnosis defintion*" : "",
      title: values.title === "" ? "Please enter the title*" : "",
      titleEs: values.titleEs === "" ? "Please enter the title in spanish" : "",
      duration: values.duration === "" ? "Please eneter the duration for video" : "",
      treatmentLevel: values.treatmentLevel === "" ? "Please enter the level" : "",
      treatmentUrl: values.treatmentUrl === "" ? "Please select the video for treatment" : "",
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("titleEs", values.titleEs);
      formData.append("duration", values.duration);
      formData.append("treatmentLevel", values.treatmentLevel);
      formData.append("diagnosticId", values.diagnosticId);
      formData.append("treatmentUrl", values.treatmentUrl);

      dispatch(postTreatment(formData));
      setValues({
        diagnosticId: "",
        title: "",
        titleEs: "",
        duration: "",
        treatmentLevel: "",
        treatmentUrl: "",
      })
    }
  }

  const handleUpdate = () => {
    const newErrors = {
      diagnosticId: values?.diagnosticId === "" ? "Please select the diagnosis defintion*" : "",
      title: values.title === "" ? "Please enter the title*" : "",
      titleEs: values.titleEs === "" ? "Please enter the title in spanish" : "",
      duration: values.duration === "" ? "Please eneter the duration for video" : "",
      treatmentLevel: values.treatmentLevel === "" ? "Please enter the level" : "",
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (!hasErrors) {
      if (values.treatmentUrl === "") {
        const payload = {
          diagnosticId: values.diagnosticId,
          title: values.title,
          titleEs: values.titleEs,
          duration: values.duration,
          treatmentLevel: values.treatmentLevel,
          treatmentUrl: updatedValues?.treatmentUrl
        };
        dispatch(updateTreatment({ id: updatedValues?._id, payload }))
        setValues({
          diagnosticId: "",
          title: "",
          titleEs: "",
          duration: "",
          treatmentLevel: "",
          treatmentUrl: "",
        })
      }
      else {
        const payload = new FormData();
        payload.append("title", values.title);
        payload.append("titleEs", values.titleEs);
        payload.append("duration", values.duration);
        payload.append("treatmentLevel", values.treatmentLevel);
        payload.append("diagnosticId", values.diagnosticId);
        payload.append("treatmentUrl", values.treatmentUrl);
        dispatch(updateTreatment({ id: updatedValues?._id, payload }))
        setValues({
          diagnosticId: "",
          title: "",
          titleEs: "",
          duration: "",
          treatmentLevel: "",
          treatmentUrl: "",
        })
      }
    }
  }
  return (
    <>
      {
        isLoading ? <Loader /> :
          <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
            <div>
              <label className='form-label mt-4'>Select the diagnosis definition</label>
              <SelectField
                onChange={(e) => setValues({ ...values, diagnosticId: e.target.value })}>
                <option value="" selected={values.diagnosticId === ""}>select the diagnosis definition</option>
                {
                  diagnosisData?.map(item => {
                    return <>
                      <option
                        value={item.id}
                        selected={updatedValues?.diagnosticId?._id === item.id}
                      >{item?.diagnostic}</option>
                    </>

                  })
                }
              </SelectField>
              {error.diagnosticId && <p className='error'>{error.diagnosticId}</p>}
            </div>
            <div>
              <label className='form-label mt-4' htmlFor="english">Enter the title in english </label>
              <TextField
                id="english"
                placeholder='Enter the title in english'
                onChange={(e) => setValues({ ...values, title: e.target.value })}
                value={values.title}
              />
              {error.title && <p className='error'>{error.title}</p>}
            </div>
            <div>
              <label className='form-label mt-4' htmlFor="spanish">Enter the title in Spanish </label>
              <TextField
                id="spanish"
                placeholder='Enter the title in spainsh'
                onChange={(e) => setValues({ ...values, titleEs: e.target.value })}
                value={values.titleEs}
              />
              {error.titleEs && <p className='error'>{error.titleEs}</p>}
            </div>

            <div className='mt-2'>
              <label className='form-label mt-4' htmlFor="duration">Enter the video duration</label>
              <TextField
                id="duration"
                placeholder='Enter the video duration'
                onChange={(e) => setValues({ ...values, duration: e.target.value })}
                value={values.duration}
              />
              {error.duration && <p className='error'>{error.duration}</p>}
            </div>
            <div className='mt-2'>
              <label className='form-label mt-4' htmlFor="level">Enter the treatment level</label>
              <TextField
                id="level"
                placeholder='Enter the treatment level'
                onChange={(e) => setValues({ ...values, treatmentLevel: e.target.value })}
                value={values.treatmentLevel}
              />
              {error.treatmentLevel && <p className='error'>{error.treatmentLevel}</p>}
            </div>
            <div className='mt-2'>
              <label htmlFor="">Choose the video for treatment</label>
              <FileField
                onChange={(e) => setValues({ ...values, treatmentUrl: e.target.files[0] })}

              />
              {error.treatmentUrl && <p className='error'>{error.treatmentUrl}</p>}
              {
                updatedValues?.treatmentUrl &&
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <video
                    style={{ width: "100px", height: "100px", alignSelf: "center" }}
                    autoPlay
                    controls
                  >
                    Your browser does not support the video tag.
                    <source src={updatedValues?.treatmentUrl} type="video/mp4" />
                  </video>
                </div>
              }
            </div>

            {
              updatedValues ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
                :
                <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
            }

          </div>
      }
    </>
  )
}

export default Treatment
