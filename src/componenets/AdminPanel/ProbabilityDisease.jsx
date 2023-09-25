import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from "react-redux";
import SelectField from '../common/SelectField';
import NumberField from '../common/NumberField';
import { getPainBehaviorByPainAreaId } from '../../redux/slices/painBehavior';
import { getPainDeifnitionByPainAreaId } from '../../redux/slices/painDefinition';
import { getPainArea } from '../../redux/slices/painArea';
import { postProbabilityDisease } from '../../redux/slices/probabilityDisease';

const ProbabilityDisease = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    possible: '',
    total: '',
    probability: '',
    painBehaviorId: "",
  })

  const [error, setError] = useState({
    possible: '',
    total: '',
    painBehaviorId: '',
    probability: '',
  })

  useEffect(() => {
    dispatch(getPainArea());
  }, [dispatch]);

  const painAreaData = useSelector((state) => state?.painArea?.painAreaData);

  const handlePainArea = (e) => {
    setValues({ ...values, painAreaId: e.target.value });
    dispatch(getPainDeifnitionByPainAreaId(e.target.value));
  }

  const painDefintionDataById = useSelector(state => state?.painDefinitionSlice?.painDefinitionDataByAreaId);

  const handlePainDefinition = (e) => {
    setValues({ ...values, painDefinitionId: e.target.value });
    dispatch(getPainBehaviorByPainAreaId(e.target.value));
  }

  const painBehaviorDataById = useSelector(state => state?.painBehavior?.painBehaviorDataById);

  const handlePainBehavior = (e) => {
    setValues({ ...values, painBehaviorId: e.target.value });
  }

  const handleSubmit = async () => {
    const newErrors = {
      possible: values.possible === '' ? 'Please enter the possible number*' : '',
      total: values.total === '' ? 'Please enter the total number*' : '',
      probability: values.probability === '' ? 'Please enter the probability number*' : '',
      painBehaviorId: values.painBehaviorId.trim() === '' ? 'Please select the pain behavior*' : '',
    };

    setError(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      const probability = {
        possible: values.possible,
        total: values.total,
        painBehaviorId: values.painBehaviorId,
        probability: values.probability,
      }

      dispatch(postProbabilityDisease(probability));
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
          onChange={handlePainDefinition}>
          <option value="">Please select the pain definition</option>
          {
            painDefintionDataById.map(item => <option value={item._id}>{item.name}</option>)
          }
        </SelectField>
        {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
      </div>
      <div>
        <label className='form-label mt-4'>Select pain Behavior</label>
        <SelectField
          onChange={handlePainBehavior}>
          <option value="">Please select the pain behavior</option>
          {
            painBehaviorDataById.map(item => <option value={item._id}>{item.name}</option>)
          }

        </SelectField>
        {error.painBehaviorId && <p className='error'>{error.painBehaviorId}</p>}
      </div>

      <div>
        <label className='form-label mt-4' htmlFor="possible">Enter the possibble quantity</label>
        <NumberField
          id="pointX"
          placeholder='Enter the possibble quantity'
          onChange={(e) => setValues({ ...values, possible: parseInt(e.target.value) })}
        />
        {error.possible && <p className='error'>{error.possible}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="total">Enter the total </label>
        <NumberField
          id="total"
          placeholder='Enter the total'
          onChange={(e) => setValues({ ...values, total: parseInt(e.target.value) })}
        />
        {error.total && <p className='error'>{error.total}</p>}
      </div>
      <div>
        <label className='form-label mt-4' htmlFor="probability">Enter the probability</label>
        <NumberField
          id="probability"
          requird
          placeholder='Enter the value robability'
          onChange={(e) => setValues({ ...values, probability: parseInt(e.target.value) })}
        />
        {error.probability && <p className='error'>{error.probability}</p>}
      </div>

      <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default ProbabilityDisease
