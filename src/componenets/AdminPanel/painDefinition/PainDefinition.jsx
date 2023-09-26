import React from 'react'
import { useState, useEffect } from 'react';
import TextField from '../../common/TextField';
import SelectField from '../../common/SelectField';
import FileField from '../../common/FileField';
import { useSelector, useDispatch } from "react-redux";
import { getPainArea } from '../../../redux/slices/painArea';
import { getPainDefinitionById, patchPainDefinition, postPainDefinition } from '../../../redux/slices/painDefinition';
import { useParams } from 'react-router-dom';

const PainDefinition = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getPainDefinitionById(id));
    }
  }, [id, dispatch])

  let painDefinitionDataById = useSelector(state => state?.painDefinitionSlice?.painDefinitionById)

  const [values, setValues] = useState({});
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    const isEdit = window.location.search.split("=").pop();
    if(isEdit) {
      setValues({
        name: painDefinitionDataById?.name ? painDefinitionDataById?.name : "",
        nameEs: painDefinitionDataById?.nameEs ? painDefinitionDataById?.nameEs : "",
        painAreaId: painDefinitionDataById?.painAreaId ? painDefinitionDataById?.painAreaId?._id : "",
        imageUrl: "",
      })
      setIsUpdate(true)
    } else {
      setValues({
        name: "",
        nameEs:  "",
        painAreaId: "",
        imageUrl: "",
      })
      setIsUpdate(false)
    }
  }, [painDefinitionDataById])

  const [error, setError] = useState({
    name: "",
    nameEs: "",
    painAreaId: "",
    imageUrl: "",
  })
  useEffect(() => {
    dispatch(getPainArea());
  }, [dispatch]);

  const painAreaData = useSelector(state => state?.painArea?.painAreaData);

  const handleSubmit = async () => {
    const newErrors = {
      name: values.name.trim() === '' ? 'Please enter the name in English*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the name in Spanish*' : '',
      painAreaId: values.painAreaId.trim() === '' ? 'Please select the Pain Area*' : '',
      imageUrl: values.imageUrl === '' ? 'Please select the image*' : '',
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("nameEs", values.nameEs);
      formData.append("painAreaId", values.painAreaId);
      formData.append("imageUrl", values.imageUrl)

      dispatch(postPainDefinition(formData));
      setValues({
        name: "",
        nameEs: "",
        painAreaId: "",
        imageUrl: "",
      })
    }

  }

  const handleUpdate = () => {
    const newErrors = {
      name: values.name.trim() === '' ? 'Please enter the name in English*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the name in Spanish*' : '',
      painAreaId: values.painAreaId === '' ? 'Please select the Pain Area*' : '',
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      if (values.imageUrl === "") {
        const payload = {
          name: values.name,
          nameEs: values.nameEs,
          painAreaId: values.painAreaId,
          imageUrl: painDefinitionDataById.imageUrl,
        }
        dispatch(patchPainDefinition({ id: painDefinitionDataById._id, payload: payload }));
        setValues({
          name: "",
          nameEs: "",
          painAreaId: "",
          imageUrl: "",
        })

      } else {
        const payload = new FormData();
        payload.append("name", values.name);
        payload.append("nameEs", values.nameEs);
        payload.append("painAreaId", values.painAreaId);
        payload.append("imageUrl", values.imageUrl);
        dispatch(patchPainDefinition({ id: painDefinitionDataById._id, payload: payload }));
        setValues({
          name: "",
          nameEs: "",
          painAreaId: "",
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
          onChange={(e) => setValues({ ...values, painAreaId: e.target.value })}>
          <option value="" selected={values.painAreaId === ""}>Please select the Pain Area name</option>
          {
            painAreaData?.map(item => {
              return <>
                <option key={item._id} value={item._id} selected={painDefinitionDataById?.painAreaId?._id === item._id}>{item.name}</option>
              </>
            })
          }

        </SelectField>
        {error.painAreaId && <p className='error'>{error.painAreaId}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="english">Pain Definition name in English</label>
        <TextField
          id="english"
          placeholder='Please enter Pain Definition name in English'
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          value={values.name}
        />
        {error.name && <p className='error'>{error.name}</p>}
      </div>

      <div className='mt-2'>
        <label className='form-label mt-4' htmlFor="spanish">Pain Definition name in Spanish</label>
        <TextField
          id="spanish"
          placeholder='Please enter Pain Definition name in Spanish'
          onChange={(e) => setValues({ ...values, nameEs: e.target.value })}
          value={values.nameEs}
        />
        {error.nameEs && <p className='error'>{error.nameEs}</p>}
      </div>

      <div className='mt-2'>
        <label htmlFor="">Choose the image for Pain Definition</label>
        <FileField
          onChange={(e) => setValues({ ...values, imageUrl: e.target.files[0] })}

        />
        {error.imageUrl && <p className='error'>{error.imageUrl}</p>}
        {

          isUpdate &&
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img style={{ width: "200px", height: "200px", alignSelf: "center" }} src={painDefinitionDataById?.imageUrl} alt="" />
          </div>
        }
      </div>
      {
        isUpdate ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
      }
    </div>

  )
}

export default PainDefinition
