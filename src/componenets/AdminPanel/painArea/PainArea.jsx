import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector,} from "react-redux";
import { patchPainArea, postPainArea, getPainAaraeById } from '../../../redux/slices/painArea';
import TextField from '../../common/TextField';
import NumberField from '../../common/NumberField';
import SelectField from '../../common/SelectField';
import { useNavigate, useParams } from 'react-router-dom';

const PainArea = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
   
  useEffect(() => {
    dispatch(getPainAaraeById(id))
  }, [id])

  const updateValue = useSelector(state => state?.painArea?.painAreaDataById);

  const [values, setValues] = useState({})

  useEffect(() => {
    setValues({
      name: updateValue?.name ? updateValue.name : "",
      nameEs: updateValue?.nameEs ? updateValue.nameEs : "",
      position: updateValue?.position ? updateValue.position : "",
      pointX: updateValue?.points ? updateValue.points[0] : "",
      pointY: updateValue?.points ? updateValue.points[1] : "",
      isLive: updateValue?.isLive ? updateValue.isLive : "",
    });
  }, [updateValue]);

  const [error, setError] = useState({
    name: "",
    nameEs: "", 
    position: "",
    pointX: "",
    pointY: "",
    isLive : ""
  })

  const handleSubmit = async () => {
    const newErrors = {
      name: values.name.trim() === '' ? 'Please enter the name*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the Spanish name*' : '',
      position: values.position.trim() === '' ? 'Please select the position*' : '',
      pointX: values.pointX === '' ? 'Please enter the horizontal points*' : '',
      pointY: values.pointY === '' ? 'Please enter the vertical points*' : '',
      isLive : values.isLive === "" ? "Please select the pain area is live or not*" : "",
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const payload = {
        name: values.name,
        nameEs: values.nameEs,
        position: values.position,
        points : [values.pointX, values.pointY],
        isLive : values.isLive,
      }
      dispatch(postPainArea(payload));
    }

  }

  const handleUpdate = () => {
    const newErrors = {
      name: values.name.trim() === '' ? 'Please enter the name*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the Spanish name*' : '',
      position: values.position.trim() === '' ? 'Please select the position*' : '',
      pointX: values.pointX === '' ? 'Please enter the horizontal points*' : '',
      pointY: values.pointY === '' ? 'Please enter the vertical points*' : '',
      isLive : values.isLive === "" ? "Please select the pain area is live or not*" : "",
    }
    setError(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const payload = {
        name: values.name,
        nameEs: values.nameEs,
        position: values.position,
        points : [values.pointX, values.pointY],
        isLive : values.isLive,
      }
      dispatch(patchPainArea({id :updateValue._id, payload: payload}));
    
    }
   
  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
        <div>
          <label className='form-label mt-4' htmlFor="english" >Enter pain area name in english</label>
          <TextField
            id="english"
            placeholder='Enter the name of pain area in English'
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            value={values.name}
             />
          {error.name && <p className='error'>{error.name}</p>}
        </div>

        <div >
          <label className='form-label mt-4' htmlFor="spanish">Enter pain area name in spanish </label>
          <TextField
            id="spanish"
            placeholder='Enter the name of pain area in spanish'
            onChange={(e) => setValues({ ...values, nameEs: e.target.value })}
            value={values.nameEs}
          />
          {error.nameEs && <p className='error'>{error.nameEs}</p>}
        </div>

        <div>
          <label className='form-label mt-4'>Select the position of pain</label>
          <SelectField
            onChange={(e) => setValues({ ...values, position: e.target.value })}>
            <option value="">{values.position ? values.position : "Please select the position"}</option>
            <option value="back">Back</option>
            <option value="front">Front</option>
          </SelectField>
          {error.position && <p className='error'>{error.position}</p>}
        </div>
        <div>
          <label htmlFor="pointY" className='form-label mt-4'>Enter the points for vertical </label>
          <NumberField
            id="pointY"
            placeholder='Enter the value vertically'
            onChange={(e) => setValues({ ...values, pointY: parseInt(e.target.value) })}
            value={values.pointY}
          />
          {error.pointY && <p className='error'>{error.pointY}</p>}
        </div>

        <div>
          <label htmlFor="pointX" className='form-label mt-4'>Enter the value horizontally </label>
          <NumberField
            id="pointX"
            placeholder='Enter the value horizontally'
            onChange={(e) => setValues({ ...values, pointX: parseInt(e.target.value) })}
            value={values.pointX}
          />
          {error.pointX && <p className='error'>{error.pointX}</p>}
        </div>
        <div>
          <label className='form-label mt-4' htmlFor="isLive">Select the pain area is live or not</label>
          <SelectField
            onChange={(e) => setValues({ ...values, isLive: e.target.value })}>
            <option value="">{values.isLive ? values.isLive : "Please select the isLive or not"}</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </SelectField>
          {error.isLive && <p className='error'>{error.isLive}</p>}
        </div>
        {
          updateValue ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
        }
        
      </div>
  
  )
}

export default PainArea
