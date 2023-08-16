import React from 'react'
import { useState, useEffect } from 'react';
import TextField from '../common/TextField';
import SelectField from '../common/SelectField';
import FileField from '../common/FileField';
import {useSelector , useDispatch} from "react-redux";
import { getPainArea } from '../../redux/slices/painArea';
import { postPainDefinition } from '../../redux/slices/painDefinition';

const PainDefinition = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    nameEs: "",
    painAreaId: "",
    imageUrl: "",
  })

  const [error, setError] = useState({
    name: "",
    nameEs: "",
    painAreaId: "",
    imageUrl: "",
  })
  useEffect(() => {
    dispatch(getPainArea());
}, []);

const painAreaData = useSelector(state => state?.painArea?.painAreaData);

  const errorHandling = () => {
    setError((prevError) => ({
      ...prevError,
      name: values.name.trim() === '' ? 'Please enter the name*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the Spanish name*' : '',
      painAreaId: values.painAreaId.trim() === '' ? 'Please select the pain area*' : '',
      imageUrl: values.imageUrl === '' ? 'Please select the image*' : '',
    }));
  };
  const handleSubmit = async () => {
    errorHandling()
    if (!(values.name.trim() === '' || values.nameEs.trim() === ''
      || values.painAreaId.trim() === '' 
      // values.imageUrl === ''
    )) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("nameEs", values.nameEs);
      formData.append("painAreaId", values.painAreaId);
      formData.append("imageUrl", values.imageUrl)
  
      dispatch(postPainDefinition(formData));
    }

  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
           <div>
        <label className='form-label mt-4'>Select the pain area</label>
        <SelectField
          onChange={(e) => setValues({ ...values, painAreaId: e.target.value })}>
          <option value="">Please select the pain name</option>
          {
              painAreaData?.map(item => {
               return <>
                <option value={item._id}>{item.name}</option>
                </>
              })
            }

        </SelectField>
        {error.painAreaId && <p className='error'>{error.painAreaId}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="english">Enter pain definition name in english </label>
        <TextField
          id="english"
          placeholder='Enter pain definition name in english'
          onChange={(e) => setValues({ ...values, name: e.target.value })} />
        {error.name && <p className='error'>{error.name}</p>}
      </div>

      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="spanish">Enter pain definition name in spanish </label>
        <TextField
          id="spanish"
          placeholder='Enter pain definition name in spanish'
          onChange={(e) => setValues({ ...values, nameEs: e.target.value })}
        />
        {error.nameEs && <p className='error'>{error.nameEs}</p>}
      </div>

      <div className='mt-2'>
        <label htmlFor="">Choose the image for pain definition</label>
        <FileField
          onChange={(e) => setValues({ ...values, imageUrl: e.target.files[0] })}
        />
        {error.imageUrl && <p className='error'>{error.imageUrl}</p>}
      </div>
      <button className='btn w-100 btn-primary p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
    </div>

  )
}

export default PainDefinition
