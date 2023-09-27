import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from "react-redux";
import { patchPainArea, postPainArea, getPainAaraeById } from '../../../redux/slices/painArea';
import TextField from '../../common/TextField';
import NumberField from '../../common/NumberField';
import SelectField from '../../common/SelectField';
import { useParams, useLocation } from 'react-router-dom';

const PainArea = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(getPainAaraeById(id))
    }
  }, [id, dispatch])

  const updateValue = useSelector(state => state?.painArea?.painAreaDataById);
  const [isUpdate, setIsUpdate] = useState(false)

  const [values, setValues] = useState({})

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const isEdit = queryParams.get('edit');

    if (isEdit) {
      setValues({
        name: updateValue?.name ? updateValue.name : "",
        nameEs: updateValue?.nameEs ? updateValue.nameEs : "",
        position: updateValue?.position ? updateValue.position : "",
        pointX: updateValue?.points ? updateValue.points[0] : "",
        pointY: updateValue?.points ? updateValue.points[1] : "",
        isLive: updateValue?.isLive ? updateValue.isLive : "",
      })
      setIsUpdate(true)
    } else {
      setValues({
        name: "",
        nameEs: "",
        position: "",
        pointX: "",
        pointY: "",
        isLive: "",
      })
      setIsUpdate(false)
    }

  }, [updateValue, location]);

  const [error, setError] = useState({
    name: "",
    nameEs: "",
    position: "",
    pointX: "",
    pointY: "",
    isLive: ""
  })

  const handleSubmit = async () => {
    const newErrors = {
      name: values.name.trim() === '' ? 'Please enter the name in English*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the name in Spanish*' : '',
      position: values.position.trim() === '' ? 'Please select the position*' : '',
      pointX: values.pointX === '' ? 'Please enter the horizontal points*' : '',
      pointY: values.pointY === '' ? 'Please enter the vertical points*' : '',
      isLive: values.isLive === "" ? "Please select the Pain Area status*" : "",
    }
    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const payload = {
        name: values.name,
        nameEs: values.nameEs,
        position: values.position,
        points: [values.pointX, values.pointY],
        isLive: values.isLive,
      }
      dispatch(postPainArea(payload));
      setValues({
        name: "",
        nameEs: "",
        position: "",
        pointX: "",
        pointY: "",
        isLive: ""
      })
    }

  }

  const handleUpdate = () => {
    const newErrors = {
      name: values.name.trim() === '' ? 'Please enter the name in English*' : '',
      nameEs: values.nameEs.trim() === '' ? 'Please enter the name in Spanish*' : '',
      position: values.position.trim() === '' ? 'Please select the position*' : '',
      pointX: values.pointX === '' ? 'Please enter the horizontal points*' : '',
      pointY: values.pointY === '' ? 'Please enter the vertical points*' : '',
      isLive: values.isLive === "" ? "Please select the Pain Area status*" : "",
    }
    setError(newErrors);
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const payload = {
        name: values.name,
        nameEs: values.nameEs,
        position: values.position,
        points: [values.pointX, values.pointY],
        isLive: values.isLive,
      }
      dispatch(patchPainArea({ id: updateValue._id, payload: payload }));
      setValues({
        name: "",
        nameEs: "",
        position: "",
        pointX: "",
        pointY: "",
        isLive: ""
      })

    }

  }

  return (
    <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
      <div>
        <label className='form-label mt-4' htmlFor="english">Pain Area Name in English</label>
        <TextField
          id="english"
          placeholder='Please enter the Pain Area name in English'
          onChange={(e) => setValues({ ...values, name: e.target.value })}
          value={values.name}
        />
        {error.name && <p className='error'>{error.name}</p>}
      </div>

      <div >
        <label className='form-label mt-4' htmlFor="spanish">Pain Area Name in Spanish</label>
        <TextField
          id="spanish"
          placeholder='Please enter the Pain Area name in Spanish'
          onChange={(e) => setValues({ ...values, nameEs: e.target.value })}
          value={values.nameEs}
        />
        {error.nameEs && <p className='error'>{error.nameEs}</p>}
      </div>

      <div>
        <label className='form-label mt-4'>Position of pain</label>
        <SelectField
          onChange={(e) => setValues({ ...values, position: e.target.value })}>
          <option value="" selected={values.position === ""}>Please select the Position</option>
          <option value="back" selected={values.position === "back"}>Back</option>
          <option value="front" selected={values.position === "front"}>Front</option>
        </SelectField>
        {error.position && <p className='error'>{error.position}</p>}
      </div>
      <div>
        <label htmlFor="pointY" className='form-label mt-4'>Vertical Points of pain</label>
        <NumberField
          id="pointY"
          placeholder='Please enter the Vertical Points of pain'
          onChange={(e) => setValues({ ...values, pointY: parseInt(e.target.value) })}
          value={values.pointY}
        />
        {error.pointY && <p className='error'>{error.pointY}</p>}
      </div>

      <div>
        <label htmlFor="pointX" className='form-label mt-4'>Horizontal Points of pain</label>
        <NumberField
          id="pointX"
          placeholder='Please enter the Horizontal Points of pain'
          onChange={(e) => setValues({ ...values, pointX: parseInt(e.target.value) })}
          value={values.pointX}
        />
        {error.pointX && <p className='error'>{error.pointX}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="isLive">Pain Area status</label>
        <SelectField
          onChange={(e) => setValues({ ...values, isLive: e.target.value })}>
          <option value="" selected={values.isLive === ""}>Please select the status</option>
          <option value="true" selected={values.isLive}>Active</option>
          <option value="false" selected={!values.isLive}>In-Active</option>
        </SelectField>
        {error.isLive && <p className='error'>{error.isLive}</p>}
      </div>
      {
        isUpdate ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
      }

    </div>

  )
}

export default PainArea
