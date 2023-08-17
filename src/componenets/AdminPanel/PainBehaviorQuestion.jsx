import React from 'react';
import { useState, useEffect } from 'react';
import SelectField from '../common/SelectField';
import FileField from '../common/FileField';
import { useDispatch, useSelector } from 'react-redux';
import { getPainBehaviorByPainAreaId, postpainBehavior } from '../../redux/slices/painBehavior';
import { getPainArea } from '../../redux/slices/painArea';
import { getPainDeifnitionByPainAreaId } from '../../redux/slices/painDefinition';
import { getQuestionDefinition } from '../../redux/slices/questionDefinitionSlice';
import { postPainBehaviorQuestion } from '../../redux/slices/painBehaviorQuestion';

const PainBehaviorQuestion = () => {
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        painAreaId: "",
        painDefinitionId: "",
        painBehaviorId: '',
        questionId: '',
        gifUrl: ''
    })

    const [error, setError] = useState({
        painAreaId: "",
        painDefinitionId: "",
        painBehaviorId: '',
        questionId: '',
        gifUrl: ''
    })

    useEffect(() => {
        dispatch(getPainArea());
        dispatch(getQuestionDefinition());
    }, []);

    const painAreaData = useSelector((state) => state?.painArea?.painAreaData);
    const questionDefinitionData = useSelector(state => state?.questionDefinitionSlice?.questionDefinitionData);

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

    const handleSubmit = async () => {
        const newErrors = {
            painBehaviorId: values.painBehaviorId.trim() === '' ? 'Please select the pain Behavior*' : '',
            painAreaId: values.painAreaId.trim() === '' ? 'Please select the pain area*' : '',
            painDefinitionId: values.painDefinitionId.trim() === '' ? 'Please select the pain definition*' : '',
            questionId: values.questionId.trim() === '' ? 'Please select the question*' : '',
            gifUrl: values.gifUrl === '' ? 'Please choose the gif*' : '',
        }

        setError(newErrors);
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (!hasErrors) {
            const formData = new FormData();
            formData.append("questionId", values.questionId);
            formData.append("painBehaviorId", values.painBehaviorId);
            formData.append("gifUrl", values.gifUrl);

            dispatch(postPainBehaviorQuestion(formData));
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
                <label className='form-label mt-4'>Select the question</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, questionId: e.target.value })}>
                    <option value="">Please select the question</option>
                    {
                        questionDefinitionData.map(item => <option value={item._id}>{item.question}</option>)
                    }

                </SelectField>
                {error.questionId && <p className='error'>{error.questionId}</p>}
            </div>

            <div className='mt-2'>
                <label className='form-label mt-4' htmlFor="">Choose the gif</label>
                <FileField
                    onChange={(e) => setValues({ ...values, gifUrl: e.target.files[0] })}
                />
                {error.gifUrl && <p className='error'>{error.gifUrl}</p>}
            </div>
            <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default PainBehaviorQuestion
