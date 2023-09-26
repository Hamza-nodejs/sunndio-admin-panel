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
import { useLocation, useParams } from 'react-router-dom';

const Treatment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(getTreatmentById(id))
    }

  }, [id, dispatch])

  const updatedValues = useSelector(state => state?.treatmentSlice?.treatmentDataById);
  const isLoading = useSelector(state => state?.treatmentSlice?.isLoading);

  const [values, setValues] = useState({});
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isEdit = queryParams.get('edit');

    if(isEdit) {
      setValues({
        diagnosticId: updatedValues.diagnosticId?._id ? updatedValues?.diagnosticId?._id : "",
        title: updatedValues?.title ? updatedValues.title : "",
        titleEs: updatedValues?.titleEs ? updatedValues.titleEs : "",
        duration: updatedValues?.duration ? updatedValues.duration : "",
        treatmentLevel: updatedValues?.treatmentLevel ? updatedValues.treatmentLevel : "",
        treatmentUrl: "",
      })
      setIsUpdate(true)
    } else {
      setValues({
        diagnosticId: "",
        title: "",
        titleEs: "",
        duration: "",
        treatmentLevel: "",
        treatmentUrl: "",
      }) 
      setIsUpdate(false)
    }
  
  }, [updatedValues, location])

  const [error, setError] = useState({})

  useEffect(() => {
    dispatch(getDiagnosisDefinition())
  }, [dispatch])

  const diagnosisData = useSelector(state => state?.diagnosis?.diagnosisData);

  const handleSubmit = () => {
    const newErrors = {
      diagnosticId: values?.diagnosticId === "" ? "Please select the Diagnosis Definition*" : "",
      title: values.title === "" ? "Please enter the Title in English*" : "",
      titleEs: values.titleEs === "" ? "Please enter the Title in Spanish" : "",
      duration: values.duration === "" ? "Please enter the Duration for video" : "",
      treatmentLevel: values.treatmentLevel === "" ? "Please enter the Level" : "",
      treatmentUrl: values.treatmentUrl === "" ? "Please select the Video for Treatment" : "",
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
      diagnosticId: values?.diagnosticId === "" ? "Please select the Diagnosis Definition*" : "",
      title: values.title === "" ? "Please enter the Title in English*" : "",
      titleEs: values.titleEs === "" ? "Please enter the Title in Spanish" : "",
      duration: values.duration === "" ? "Please enter the Duration for video" : "",
      treatmentLevel: values.treatmentLevel === "" ? "Please enter the Level" : "",
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
              <label className='form-label mt-4'>Diagnosis Definition</label>
              <SelectField
                onChange={(e) => setValues({ ...values, diagnosticId: e.target.value })}>
                <option value="" selected={values.diagnosticId === ""}>Please select the Diagnosis Definition</option>
                {
                  diagnosisData?.map(item => {
                    return <>
                      <option
                      key={item._id} 
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
              <label className='form-label mt-4' htmlFor="english">Title in English </label>
              <TextField
                id="english"
                placeholder='Please enter the Title in English'
                onChange={(e) => setValues({ ...values, title: e.target.value })}
                value={values.title}
              />
              {error.title && <p className='error'>{error.title}</p>}
            </div>
            <div>
              <label className='form-label mt-4' htmlFor="spanish">Title in Spanish </label>
              <TextField
                id="spanish"
                placeholder='Please enter the Title in Spanish'
                onChange={(e) => setValues({ ...values, titleEs: e.target.value })}
                value={values.titleEs}
              />
              {error.titleEs && <p className='error'>{error.titleEs}</p>}
            </div>

            <div className='mt-2'>
              <label className='form-label mt-4' htmlFor="duration">Video Duration</label>
              <TextField
                id="duration"
                placeholder='Please enter the Video Duration'
                onChange={(e) => setValues({ ...values, duration: e.target.value })}
                value={values.duration}
              />
              {error.duration && <p className='error'>{error.duration}</p>}
            </div>
            <div className='mt-2'>
              <label className='form-label mt-4' htmlFor="level">Treatment Level</label>
              <TextField
                id="level"
                placeholder='Please enter the Treatment Level'
                onChange={(e) => setValues({ ...values, treatmentLevel: e.target.value })}
                value={values.treatmentLevel}
              />
              {error.treatmentLevel && <p className='error'>{error.treatmentLevel}</p>}
            </div>
            <div className='mt-2'>
              <label htmlFor="">Choose the Video for Treatment</label>
              <FileField
                onChange={(e) => setValues({ ...values, treatmentUrl: e.target.files[0] })}

              />
              {error.treatmentUrl && <p className='error'>{error.treatmentUrl}</p>}
              {
                isUpdate &&
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
              isUpdate ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
                :
                <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
            }

          </div>
      }
    </>
  )
}

export default Treatment
