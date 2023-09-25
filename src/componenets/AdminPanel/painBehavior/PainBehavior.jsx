import React, { useEffect } from 'react'
import TextField from '../../common/TextField';
import FileField from '../../common/FileField';
import SelectField from '../../common/SelectField';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPainBehaviorById, patchPainBehavior, postpainBehavior } from '../../../redux/slices/painBehavior';
import { getPainArea } from '../../../redux/slices/painArea';
import { getPainDeifnitionByPainAreaId } from '../../../redux/slices/painDefinition';
import { useParams } from 'react-router-dom';

const PainBehavior = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPainBehaviorById(id))
    }
  }, [id, dispatch])

  const updateValues = useSelector(state => state?.painBehavior?.allPainBehaviorDataById);

  const [values, setValues] = useState({})

  useEffect(() => {
    setValues({
      name: updateValues?.name ? updateValues?.name : "",
      nameEs: updateValues?.nameEs ? updateValues?.nameEs : "",
      painAreaId: updateValues?.painDefinitionId?.painAreaId ? updateValues?.painDefinitionId?.painAreaId : "",
      painDefinitionId: updateValues?.painDefinitionId ? updateValues?.painDefinitionId._id : "",
      imageUrl: "",
    })
  }, [updateValues])

  const [error, setError] = useState({
    name: "",
    nameEs: "",
    painAreaId: "",
    painDefinitionId: "",
    imageUrl: "",
  })

  useEffect(() => {
    dispatch(getPainArea());
  }, [dispatch]);

  const painAreaData = useSelector((state) => state?.painArea?.painAreaData);

  const selectedPainArea = painAreaData?.find(item => item._id === updateValues?.painDefinitionId?.painAreaId);

  useEffect(() => {
    dispatch(getPainDeifnitionByPainAreaId(selectedPainArea?._id));
  }, [selectedPainArea, dispatch]);

  const handlePainArea = (e) => {
    setValues({ ...values, painAreaId: e.target.value });
    if(e.target.value) {
      dispatch(getPainDeifnitionByPainAreaId(e.target.value));
    }
  }

  const painDefintionDataById = useSelector(state => state?.painDefinitionSlice?.painDefinitionDataByAreaId);

  const handleSubmit = async () => {
    const newErrors = {
      name: values.name.trim() === '' ? 'Please enter the name in English*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the name in Spanish*' : '',
      painAreaId: values.painAreaId.trim() === '' ? 'Please select the Pain Area*' : '',
      painDefinitionId: values.painDefinitionId.trim() === '' ? 'Please select the Pain Definition*' : '',
      imageUrl: values.imageUrl === '' ? 'Please select the image*' : '',
    }
    setError(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("nameEs", values.nameEs);
      formData.append("painDefinitionId", values.painDefinitionId);
      formData.append("imageUrl", values.imageUrl);

      dispatch(postpainBehavior(formData))
      setValues({
        name: "",
        nameEs: "",
        painAreaId: "",
        painDefinitionId: "",
        imageUrl: "",
      })
    }

  }

  const handleUpdate = () => {
    const newErrors = {
      name: values.name.trim() === '' ? 'Please enter Pain Behavior name in English*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter Pain Behavior name in Spanish*' : '',
      painAreaId: values.painAreaId.trim() === '' ? 'Please select the Pain Area*' : '',
      painDefinitionId: values.painDefinitionId.trim() === '' ? 'Please select the Pain Definition*' : '',
    }
    setError(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (!hasErrors) {
      if (values.imageUrl === "") {
        const payload = {
          name: values.name,
          nameEs: values.nameEs,
          painDefinitionId: values.painDefinitionId,
          imageUrl: updateValues.imageUrl,
        }
        dispatch(patchPainBehavior({ id: updateValues._id, payload }))
        setValues({
          name: "",
          nameEs: "",
          painAreaId: "",
          painDefinitionId: "",
          imageUrl: "",
        })
      } else {
        const payload = new FormData();
        payload.append("name", values.name);
        payload.append("nameEs", values.nameEs);
        payload.append("painDefinitionId", values.painDefinitionId);
        payload.append("imageUrl", values.imageUrl);
        dispatch(patchPainBehavior({ id: updateValues._id, payload: payload }));
        setValues({
          name: "",
          nameEs: "",
          painAreaId: "",
          painDefinitionId: "",
          imageUrl: "",
        })
      }
    }
  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>

      <div>
        <label className='form-label mt-4'>Pain Area</label>
        <SelectField
          onChange={handlePainArea}>
          <option value="" selected={values.painAreaId === ""}>Please select the Pain Area</option>
          {
            painAreaData?.map(item => {
              return <option key={item._id} value={item._id} selected={selectedPainArea?._id === item._id}>{item?.name}</option>
            })
          }
        </SelectField>
        {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
      </div>
      <div>
        <label className='form-label mt-4'>Pain Definition</label>
        <SelectField
          onChange={(e) => setValues({ ...values, painDefinitionId: e.target.value })}>
          <option value="" selected={values.painDefinitionId === ""}>Please select the Pain Definition</option>
          {
            painDefintionDataById.map(item => <option key={item._id}  value={item._id}
              selected={updateValues?.painDefinitionId?._id === item._id}>{item.name}</option>)
          }
        </SelectField>
        {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
      </div>

      <div>
        <label className='form-label mt-4' htmlFor="english">Pain Behavior name in English</label>
        <TextField
          id="english"
          placeholder='Please enter Pain Behavior name in English'
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          value={values.name}
        />
        {error.name && <p className='error'>{error.name}</p>}
      </div>

      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="spanish">Pain Behavior name in Spanish</label>
        <TextField
          id="spanish"
          placeholder='Please enter Pain Behavior name in Spanish'
          onChange={(e) => setValues({ ...values, nameEs: e.target.value })}
          value={values.nameEs}
        />
        {error.nameEs && <p className='error'>{error.nameEs}</p>}
      </div>


      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="">Choose the image for Pain Behavior</label>
        <FileField
          onChange={(e) => setValues({ ...values, imageUrl: e.target.files[0] })}
        />
        {error.imageUrl && <p className='error'>{error.imageUrl}</p>}

        {
          updateValues?.imageUrl &&
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img style={{ width: "100px", height: "100px", alignSelf: "center" }} src={updateValues?.imageUrl} alt="" />
          </div>
        }
      </div>
      {
        updateValues ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
      }

    </div>
  )
}

export default PainBehavior
