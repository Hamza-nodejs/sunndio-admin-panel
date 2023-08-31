import React from 'react';
import SelectField from '../../common/SelectField';
import NumberField from '../../common/NumberField';
import TextField from '../../common/TextField';
import FileField from '../../common/FileField';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiagnosisDefinition } from '../../../redux/slices/diagnosis';
import { postTreatment } from '../../../redux/slices/treatment';

const Treatment = () => {
    const dispatch = useDispatch();

    const updatedValues = "";

   const [ values , setValues] = useState({});

   useEffect(() => {
         setValues({
            diagnosticsId : updatedValues.diagnosticsId ? updatedValues?.diagnosticsId : "",
            title : updatedValues?.title ? updatedValues.title : "",
            titleEs : updatedValues?.titleEs ? updatedValues.titleEs : "",
            duration: updatedValues?.duration ? updatedValues.duration : "",
            treatmentLevel : updatedValues?.treatmentLevel ? updatedValues.treatmentLevel : "",
            treatmentUrl :  "",
         })
   }, [updatedValues])

   const [error, setError] = useState({})

   useEffect(() => {
       dispatch(getDiagnosisDefinition())
   },[])

   const diagnosisData = useSelector(state => state?.diagnosis?.diagnosisData);

    const handleSubmit = () => {
        const newErrors = {
            diagnosticsId : values?.diagnosticsId === "" ? "Please select the diagnosis defintion*" : "",
            title :  values.title === "" ? "Please enter the title*" : "",
            titleEs :  values.titleEs === "" ? "Please enter the title in spanish" : "",
            duration: values.duration === "" ? "Please eneter the duration for video" : "",
            treatmentLevel :  values.treatmentLevel === "" ? "Please enter the level" : "",
            treatmentUrl : values.treatmentUrl ===  "" ? "Please select the video for treatment" : "",
         }
          setError(newErrors);
      
          const hasErrors = Object.values(newErrors).some(error => error !== '');

          if(!hasErrors) {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("titleEs", values.titleEs);
            formData.append("duration", values.duration);
            formData.append("treatmentLevel", values.treatmentLevel);
            formData.append("diagnosticsId", values.diagnosticsId);
            formData.append("treatmentUrl", values.treatmentUrl);

             dispatch(postTreatment(formData));
             setValues({
                diagnosticsId : "",
                title : "",
                titleEs : "",
                duration:  "",
                treatmentLevel : "",
                treatmentUrl :  "",
             })
          }
    }

    const handleUpdate = () => {

    }
  return (
    <>
       <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
       <div>
                <label className='form-label mt-4'>Select the diagnosis definition</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, diagnosticsId: e.target.value })}>
                    <option value="" selected={values.diagnosticsId === ""}>select the diagnosis definition</option>
                    {
                        diagnosisData?.map(item => {
                            return <>
                                <option
                                    value={item.id}
                                    selected={updatedValues?.diagnosticsId?._id === item.id}
                                >{item?.diagnostic}</option>
                            </>

                        })
                    }
                </SelectField>
                {error.diagnosticsId && <p className='error'>{error.diagnosticsId}</p>}
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
      
      </div>
   
      {
          updatedValues ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
        }

    </div>
    </>
  )
}

export default Treatment
