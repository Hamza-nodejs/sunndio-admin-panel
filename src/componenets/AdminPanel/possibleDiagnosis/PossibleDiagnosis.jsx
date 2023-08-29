import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from "react-redux";
import SelectField from '../../common/SelectField';
import NumberField from '../../common/NumberField';
import { getPainBehaviorByPainAreaId } from '../../../redux/slices/painBehavior';
import { getPainDeifnitionByPainAreaId } from '../../../redux/slices/painDefinition';
import { getDiagnosisDefinition } from '../../../redux/slices/diagnosis';
import { getPainArea } from '../../../redux/slices/painArea';
import { getPossibleDiagnosisById, patchPossibleDiagnosis, postPossibleDiagnosis } from '../../../redux/slices/possibleDiagnosis';
import { postProbabilityDisease } from '../../../redux/slices/probabilityDisease';
import { useParams } from 'react-router-dom';

const PossibleDiagnosis = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPossibleDiagnosisById(id))
    }, [id]);

    const updateValues = useSelector(state => state?.possibleDiagnosisSlice?.possibleDiagnosisDataById);

    const [values, setValues] = useState({})

    useEffect(() => {
        setValues({
            diagnosticsId: updateValues ? updateValues?.diagnosticsId?._id : '',
            isPossibleDiag: updateValues.isPossibleDiag ? updateValues.isPossibleDiag : "",
            painBehaviorId: updateValues ? updateValues?.painBehaviorId?._id : '',
            painAreaId: "",
            painDefinitionId: "",
            initialProbability: "",
        })
    }, [updateValues])

    const [error, setError] = useState({
        diagnosticsId: '',
        isPossibleDiag: '',
        painBehaviorId: '',
        painAreaId: "",
        painDefinitionId: "",
        initialProbability: "",
    })

    useEffect(() => {
        dispatch(getPainArea());
        dispatch(getDiagnosisDefinition());
    }, []);

    const painAreaData = useSelector((state) => state?.painArea?.painAreaData);
    const diagnosisData = useSelector(state => state?.diagnosis?.diagnosisData);

    const handlePainArea = (e) => {
        setValues({ ...values, painAreaId: e.target.value });
        dispatch(getPainDeifnitionByPainAreaId(e.target.value));
    }

    const painDefintionDataById = useSelector(state => state?.painDefinitionSlice?.painDefinitionDataByAreaId);

    const handlePainDefinition = (e) => {
        setValues({ ...values, painDefinitionId: e.target.value });
        dispatch(getPainBehaviorByPainAreaId(e.target.value));
    }

    useEffect(() => {
        dispatch(getPainBehaviorByPainAreaId(updateValues?.painBehaviorId?.painDefinitionId));
    }, [updateValues])

    const painBehaviorDataById = useSelector(state => state?.painBehavior?.painBehaviorDataById);

    const handleSubmit = async () => {
        const newErrors = {
            diagnosticsId: values.diagnosticsId.trim() === '' ? 'Please select the Id*' : '',
            isPossibleDiag: values.isPossibleDiag.trim() === '' ? 'Please select the possibble diagnosis*' : '',
            painBehaviorId: values.painBehaviorId.trim() === '' ? 'Please select the pain behavior*' : '',
            painAreaId: values.painAreaId.trim() === '' ? 'Please select the pain area*' : '',
            painDefinitionId: values.painDefinitionId.trim() === '' ? 'Please select the pain definition*' : '',
            initialProbability: values.initialProbability === '' ? 'Please enter the initial probability*' : '',
        }
        setError(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (!hasErrors) {
            const payload = {
                diagnosticsId: values.diagnosticsId,
                painBehaviorId: values.painBehaviorId,
                isPossibleDiag: values.isPossibleDiag,
            }
            const probability = {
                painBehaviorId: values.painBehaviorId,
                probability: values.initialProbability
            }
            dispatch(postProbabilityDisease(probability));
            dispatch(postPossibleDiagnosis(payload))
            setValues({
                diagnosticsId: '',
                isPossibleDiag: '',
                painBehaviorId: '',
                painAreaId: "",
                painDefinitionId: "",
                initialProbability: "",
            })
        }

    }

    const handleUpdate = () => {
        const newErrors = {
            diagnosticsId: values.diagnosticsId.trim() === '' ? 'Please select the Id*' : '',
            isPossibleDiag: values.isPossibleDiag === '' ? 'Please select the possibble diagnosis*' : '',
            painBehaviorId: values.painBehaviorId.trim() === '' ? 'Please select the pain behavior*' : '',
        }
        setError(newErrors);
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if(!hasErrors) {
            const payload = {
                diagnosticsId : values.diagnosticsId,
                painBehaviorId : values.painBehaviorId,
                isPossibleDiag : values.isPossibleDiag,
            }
    
            dispatch(patchPossibleDiagnosis({id: updateValues._id, payload}))
            setValues({
                diagnosticsId: '',
                isPossibleDiag: '',
                painBehaviorId: '',
                painAreaId: "",
                painDefinitionId: "",
                initialProbability: "",
            })
        }

    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
            {
                !updateValues && <div>
                    <label className='form-label mt-4'>Please select the pain area</label>
                    <SelectField
                        onChange={handlePainArea}>
                        <option value="" selected={values.painAreaId === ""}>Please select the pain definition</option>
                        {
                            painAreaData?.map(item => {
                                return <option value={item._id}>{item?.name}</option>
                            })
                        }
                    </SelectField>
                    {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
                </div>
            }
            {
                !updateValues &&
                <div>
                    <label className='form-label mt-4'>Select the pain definition</label>
                    <SelectField
                        onChange={handlePainDefinition}>
                        <option value="" selected={values.painDefinitionId === ""}>Please select the pain definition</option>
                        {
                            painDefintionDataById.map(item => <option value={item._id}>{item.name}</option>)
                        }
                    </SelectField>
                    {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
                </div>
            }

            <div>
                <label className='form-label mt-4'>Select pain Behavior</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, painBehaviorId: e.target.value })}>
                    <option value="" selected={values.painBehaviorId === ""}>Please select the pain behavior</option>
                    {
                        painBehaviorDataById.map(item => <option
                            value={item._id}
                            selected={updateValues?.painBehaviorId?._id === item._id}
                        >{item.name}</option>)
                    }

                </SelectField>
                {error.painBehaviorId && <p className='error'>{error.painBehaviorId}</p>}
            </div>
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
                                    selected={updateValues?.diagnosticsId?._id === item.id}
                                >{item?.diagnostic}</option>
                            </>

                        })
                    }
                </SelectField>
                {error.diagnosticsId && <p className='error'>{error.diagnosticsId}</p>}
            </div>
            <div>
                <label className='form-label mt-4'>Select the possibble diagnosis</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, isPossibleDiag: e.target.value })}>
                    <option value="" selected={values.isPossibleDiag === ""}>Please select the possibble diagnosis</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </SelectField>
                {error.isPossibleDiag && <p className='error'>{error.isPossibleDiag}</p>}
            </div>
            {
                !updateValues && <div>
                    <label htmlFor="pointX" className='form-label mt-4'>Enter the initial probability</label>
                    <NumberField
                        id="pointX"
                        placeholder='Enter the value horizontally'
                        onChange={(e) => setValues({ ...values, initialProbability: parseInt(e.target.value) })}
                        value={values.initialProbability}
                    />
                    {error.initialProbability && <p className='error'>{error.initialProbability}</p>}
                </div>
            }

            {updateValues ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
                :
                <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
            }
        </div>
    )
}

export default PossibleDiagnosis
