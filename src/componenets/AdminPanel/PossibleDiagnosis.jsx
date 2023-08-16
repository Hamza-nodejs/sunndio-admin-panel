import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from "react-redux";
import SelectField from '../common/SelectField';
import NumberField from '../common/NumberField';
import { getPainBehaviorByPainAreaId } from '../../redux/slices/painBehavior';
import { getPainDeifnitionByPainAreaId } from '../../redux/slices/painDefinition';
import { getDiagnosisDefinition } from '../../redux/slices/diagnosis';
import { getPainArea } from '../../redux/slices/painArea';
import { postPossibleDiagnosis } from '../../redux/slices/possibleDiagnosis';

const PossibleDiagnosis = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        diagnosticsId: '',
        isPossibleDiag: '',
        painBehaviorId: '',
        painAreaId: "",
        painDefinitionId: "",
        initiaProbabilityl: "",

    })

    const [error, setError] = useState({
        diagnosticsId: '',
        isPossibleDiag: '',
        painBehaviorId: '',
        painAreaId: "",
        painDefinitionId: "",
        initiaProbabilityl: "",
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

    const painBehaviorDataById = useSelector(state => state?.painBehavior?.painBehaviorDataById);


    const errorHandling = () => {
        setError((prevError) => ({
            ...prevError,
            diagnosticsId: values.diagnosticsId.trim() === '' ? 'Please select the Id*' : '',
            isPossibleDiag: values.isPossibleDiag.trim() === '' ? 'Please select the possibble diagnosis*' : '',
            painBehaviorId: values.painBehaviorId.trim() === '' ? 'Please select the pain behavior*' : '',
            painAreaId: values.painAreaId.trim() === '' ? 'Please select the pain area*' : '',
            painDefinitionId: values.painDefinitionId.trim() === '' ? 'Please select the pain definition*' : '',
            initiaProbabilityl: values.initiaProbabilityl === '' ? 'Please enter the initial probability*' : '',


        }));
    };
    const handleSubmit = async () => {
        errorHandling()
        if (!(values.diagnosticsId.trim() === '' || values.isPossibleDiag.trim() === ''
            || values.painBehaviorId.trim() === '' || values.painAreaId.trim() === ""
            || values.painDefinitionId.trim() === "" || values.initiaProbabilityl === ""
        )) {
            const payload = {
                diagnosticsId: values.diagnosticsId,
                painBehaviorId: values.painBehaviorId,
                isPossibleDiag: values.isPossibleDiag,
            }
           dispatch(postPossibleDiagnosis(payload))
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
                    onChange={(e) => setValues({ ...values, painBehaviorId: e.target.value })}>
                    <option value="">Please select the pain behavior</option>
                    {
                        painBehaviorDataById.map(item => <option value={item._id}>{item.name}</option>)
                    }

                </SelectField>
                {error.painBehaviorId && <p className='error'>{error.painBehaviorId}</p>}
            </div>
            <div>
                <label className='form-label mt-4'>Select the diagnosis definition</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, diagnosticsId: e.target.value })}>
                    <option value="">select the diagnosis definition</option>
                    {
                        diagnosisData?.map(item => {
                            return <>
                                <option value={item.id}>{item?.diagnostic}</option>
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
                    <option value="">Please select the possibble diagnosis</option>
                    <option value="true">true</option>
                    <option value="false">false</option>
                </SelectField>
                {error.isPossibleDiag && <p className='error'>{error.isPossibleDiag}</p>}
            </div>

            <div>
                <label htmlFor="pointX" className='form-label mt-4'>Enter the initial probability</label>
                <NumberField
                    id="pointX"
                    placeholder='Enter the value horizontally'
                    onChange={(e) => setValues({ ...values, initiaProbabilityl: parseInt(e.target.value) })}
                />
                {error.initiaProbabilityl && <p className='error'>{error.initiaProbabilityl}</p>}
            </div>

            <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default PossibleDiagnosis
