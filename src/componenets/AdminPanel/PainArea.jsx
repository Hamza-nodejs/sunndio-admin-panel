import React, { useState } from 'react'
import { useDispatch,} from "react-redux";
import { postPainArea } from '../../redux/slices/painArea';
import TextField from '../common/TextField';
import SelectField from '../common/SelectField';
import NumberField from '../common/NumberField';

const PainArea = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    nameEs: "",
    position: "",
    pointX: "",
    pointY: "",
    isLive : ""
  })

  const [error, setError] = useState({
    name: "",
    nameEs: "",
    position: "",
    pointX: "",
    pointY: "",
    isLive : ""
  })
  const errorHandling = () => {
    setError((prevError) => ({
      ...prevError,
      name: values.name.trim() === '' ? 'Please enter the name*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the Spanish name*' : '',
      position: values.position.trim() === '' ? 'Please select the position*' : '',
      pointX: values.pointX === '' ? 'Please enter the horizontal points*' : '',
      pointY: values.pointY === '' ? 'Please enter the vertical points*' : '',
      isLive : values.isLive === "" ? "Please select the pain area is live or not*" : "",
    }));
  };
  const handleSubmit = async () => {
    errorHandling()
    if (!(values.name.trim() === '' || values.nameEs.trim() === ''
      || values.position.trim() === '' || values.pointX === '' || values.pointY === '' || values.isLive === ""
    )) {
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

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
        <div>
          <label className='form-label mt-4' htmlFor="english" >Enter pain area name in english</label>
          <TextField
            id="english"
            placeholder='Enter the name of pain area in English'
            onChange={(e) => setValues({ ...values, name: e.target.value })} />
          {error.name && <p className='error'>{error.name}</p>}
        </div>

        <div >
          <label className='form-label mt-4' htmlFor="spanish">Enter pain area name in spanish </label>
          <TextField
            id="spanish"
            placeholder='Enter the name of pain area in spanish'
            onChange={(e) => setValues({ ...values, nameEs: e.target.value })}
          />
          {error.nameEs && <p className='error'>{error.nameEs}</p>}
        </div>

        <div>
          <label className='form-label mt-4'>Select the position of pain</label>
          <SelectField
            onChange={(e) => setValues({ ...values, position: e.target.value })}>
            <option value="">Please select the position</option>
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
          />
          {error.pointY && <p className='error'>{error.pointY}</p>}
        </div>

        <div>
          <label htmlFor="pointX" className='form-label mt-4'>Enter the value horizontally </label>
          <NumberField
            id="pointX"
            placeholder='Enter the value horizontally'
            onChange={(e) => setValues({ ...values, pointX: parseInt(e.target.value) })}
          />
          {error.pointX && <p className='error'>{error.pointX}</p>}
        </div>
        <div>
          <label className='form-label mt-4' htmlFor="isLive">Select the pain area is live or not</label>
          <SelectField
            onChange={(e) => setValues({ ...values, isLive: e.target.value })}>
            <option value="">Please select the position</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </SelectField>
          {error.isLive && <p className='error'>{error.isLive}</p>}
        </div>

        <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
      </div>
  
  )
}

export default PainArea
