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
import Select from 'react-select';

const PossibleDiagnosis = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getPossibleDiagnosisById(id))
        }

    }, [id, dispatch]);

    const updateValues = useSelector(state => state?.possibleDiagnosisSlice?.possibleDiagnosisDataById);

    const [values, setValues] = useState({});
    const [diagnosis, setDiagnosis] = useState(null)

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
    }, [dispatch]);

    const painAreaData = useSelector((state) => state?.painArea?.painAreaData);

    const diagnosisData = useSelector(state => state?.diagnosis?.diagnosisData);

    const handlePainArea = (e) => {
        setValues({ ...values, painAreaId: e.target.value });
        if(e.target.value) {
            dispatch(getPainDeifnitionByPainAreaId(e.target.value));
        }
    }

    const painDefintionDataById = useSelector(state => state?.painDefinitionSlice?.painDefinitionDataByAreaId);

    const handlePainDefinition = (e) => {
        setValues({ ...values, painDefinitionId: e.target.value });
        if(e.target.value) {
            dispatch(getPainBehaviorByPainAreaId(e.target.value));
        }
    }

    useEffect(() => {
        if (updateValues?.painBehaviorId?.painDefinitionId) {
            dispatch(getPainBehaviorByPainAreaId(updateValues?.painBehaviorId?.painDefinitionId));
        }
    }, [updateValues, dispatch])

    const painBehaviorDataById = useSelector(state => state?.painBehavior?.painBehaviorDataById);

    const handleSubmit = async () => {
        const newErrors = {
            diagnosticsId: values.diagnosticsId === '' ? 'Please select the diagnosis*' : '',
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
            setDiagnosis(null)
        }

    }

    const handleUpdate = () => {
        const newErrors = {
            diagnosticsId: values.diagnosticsId === '' ? 'Please select the diagnosi*' : '',
            isPossibleDiag: values.isPossibleDiag === '' ? 'Please select the possibble diagnosis*' : '',
            painBehaviorId: values.painBehaviorId === '' ? 'Please select the pain behavior*' : '',
        }
        setError(newErrors);
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (!hasErrors) {
            const payload = {
                diagnosticsId: values.diagnosticsId,
                painBehaviorId: values.painBehaviorId,
                isPossibleDiag: values.isPossibleDiag,
            }

            dispatch(patchPossibleDiagnosis({ id: updateValues._id, payload }))
            setValues({
                diagnosticsId: '',
                isPossibleDiag: '',
                painBehaviorId: '',
                painAreaId: "",
                painDefinitionId: "",
                initialProbability: "",
            })
            setDiagnosis(null)
        }

    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
            {
                !updateValues && <div>
                    <label className='form-label mt-4'>Pain Area</label>
                    <SelectField
                        onChange={handlePainArea}>
                        <option value="" selected={values.painAreaId === ""}>Please select the Pain Area</option>
                        {
                            painAreaData?.map(item => {
                                return <option key={item._id} value={item._id}>{item?.name}</option>
                            })
                        }
                    </SelectField>
                    {error.painAreaId && <p className='error'>{error.painAreaId}</p>}
                </div>
            }
            {
                !updateValues &&
                <div>
                    <label className='form-label mt-4'>Pain Definition</label>
                    <SelectField
                        onChange={handlePainDefinition}>
                        <option value="" selected={values.painDefinitionId === ""}>Please select the Pain Definition</option>
                        {
                            painDefintionDataById.map(item => <option key={item._id} value={item._id}>{item.name}</option>)
                        }
                    </SelectField>
                    {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
                </div>
            }

            <div>
                <label className='form-label mt-4'>Pain Behavior</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, painBehaviorId: e.target.value })}>
                    <option value="" selected={values.painBehaviorId === ""}>Please select the Pain Behavior</option>
                    {
                        painBehaviorDataById.map(item => <option
                            value={item._id}
                            key={item._id}
                            selected={updateValues?.painBehaviorId?._id === item._id}
                        >{item.name}</option>)
                    }

                </SelectField>
                {error.painBehaviorId && <p className='error'>{error.painBehaviorId}</p>}
            </div>
            <div>
                <label className='form-label mt-4'>Diagnosis Definition</label>
                {/* <SelectField
                    onChange={(e) => setValues({ ...values, diagnosticsId: e.target.value })}>
                    <option value="" selected={values.diagnosticsId === ""}>Please select the diagnosis definition</option>
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
                </SelectField> */}
                <Select
                    onChange={(e) => {
                        setValues({ ...values, diagnosticsId: e.value });
                        setDiagnosis(e)

                    }}
                    className='form-control'
                    value={diagnosis}
                    options={diagnosisData.map(option => ({ value: option.id, label: option.diagnostic }))}
                    placeholder={updateValues?.diagnosticsId ? updateValues?.diagnosticsId?.diagnosisName : "Please select the diagnosis definition"}
                />
                {error.diagnosticsId && <p className='error'>{error.diagnosticsId}</p>}
            </div>
            <div>
                <label className='form-label mt-4'>Possible Diagnosis</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, isPossibleDiag: e.target.value })}>
                    <option value="" selected={values.isPossibleDiag === ""}>Please select the possible diagnosis</option>
                    <option value="true" selected={values.isPossibleDiag}>true</option>
                    <option value="false" selected={!values.isPossibleDiag}>false</option>
                </SelectField>
                {error.isPossibleDiag && <p className='error'>{error.isPossibleDiag}</p>}
            </div>
            {
                !updateValues && <div>
                    <label htmlFor="pointX" className='form-label mt-4'>Initial probability</label>
                    <NumberField
                        id="pointX"
                        placeholder='Please enter the initial probability'
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
