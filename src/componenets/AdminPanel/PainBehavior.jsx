import React, { useEffect } from 'react'
import TextField from '../common/TextField';
import FileField from '../common/FileField';
import SelectField from '../common/SelectField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postpainBehavior } from '../../redux/slices/painBehavior';
import { getPainArea } from '../../redux/slices/painArea';
import { getPainDeifnitionByPainAreaId } from '../../redux/slices/painDefinition';

const PainBehavior = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    nameEs: "",
    painAreaId: "",
    painDefinitionId: "",
    imageUrl: "",
  })

  const [error, setError] = useState({
    name: "",
    nameEs: "",
    painAreaId: "",
    painDefinitionId: "",
    imageUrl: "",
  })

  useEffect(() => {
    dispatch(getPainArea());
  },[]);

  const painAreaData = useSelector((state) => state?.painArea?.painAreaData);

  const errorHandling = () => {
    setError((prevError) => ({
      ...prevError,
      name: values.name.trim() === '' ? 'Please enter the name*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the Spanish name*' : '',
      painAreaId: values.painAreaId.trim() === '' ? 'Please select the pain area*' : '',
      painDefinitionId: values.painDefinitionId.trim() === '' ? 'Please select the pain definition*' : '',
      imageUrl: values.imageUrl === '' ? 'Please select the image*' : '',
    }));
  };

  const handlePainArea = (e) => {
      setValues({...values, painAreaId: e.target.value});
      dispatch(getPainDeifnitionByPainAreaId(e.target.value));
  }

  const painDefintionDataById = useSelector(state => state?.painDefinitionSlice?.painDefinitionDataByAreaId);

  const handleSubmit = async () => {
    errorHandling()
    if (!(values.name.trim() === '' || values.nameEs.trim() === ''
      || values.painDefinitionId.trim() === '' || values.imageUrl === '' || values.painAreaId.trim() ===""
    )) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("nameEs", values.nameEs);
      formData.append("painDefinitionId", values.painDefinitionId);
      formData.append("imageUrl", values.imageUrl);
      console.log("pain: ", formData);
      dispatch(postpainBehavior(formData))
    }

  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
        
        <div>
        <label className='form-label mt-4'>Please select the pain area</label>
        <SelectField
          onChange={handlePainArea}>
          <option value="">Please select the pain definition</option>
           {
            painAreaData?.map(item => {
              return <option value={item._id}>{item?.name}</option>
            })
           }
        </SelectField>
        {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
      </div>
      <div>
        <label className='form-label mt-4'>Select the pain definition</label>
        <SelectField
          onChange={(e) => setValues({ ...values, painDefinitionId: e.target.value })}>
          <option value="">Please select the pain definition</option>
             {
              painDefintionDataById.map(item => <option value={item._id}>{item.name}</option>)
             }
        </SelectField>
        {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
      </div>
      
      <div>
        <label className='form-label mt-4' htmlFor="english">Enter pain behavior name in english </label>
        <TextField
          id="english"
          placeholder='Enter pain behavior name in english'
          onChange={(e) => setValues({ ...values, name: e.target.value })} />
        {error.name && <p className='error'>{error.name}</p>}
      </div>

      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="spanish">Enter pain behavior name in spanish</label>
        <TextField
          id="spanish"
          placeholder='Enter pain behavior name in spanish'
          onChange={(e) => setValues({ ...values, nameEs: e.target.value })}
        />
        {error.nameEs && <p className='error'>{error.nameEs}</p>}
      </div>
      

      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="">Choose the image for pain behavior</label>
        <FileField
          onChange={(e) => setValues({ ...values, imageUrl: e.target.files[0] })}
        />
        {error.imageUrl && <p className='error'>{error.imageUrl}</p>}
      </div>
      <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>

    </div>
  )
}

export default PainBehavior
