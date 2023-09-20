import React from 'react';
import { useState, useEffect } from 'react';
import SelectField from '../../common/SelectField';
import FileField from '../../common/FileField';
import { useDispatch, useSelector } from 'react-redux';
import { getPainBehaviorByPainAreaId } from '../../../redux/slices/painBehavior';
import { getPainArea } from '../../../redux/slices/painArea';
import { getPainDeifnitionByPainAreaId } from '../../../redux/slices/painDefinition';
import { getQuestionDefinition } from '../../../redux/slices/questionDefinitionSlice';
import { getPainBehaviorQuestionById, patchPainBehaviorQuestion, postPainBehaviorQuestion } from '../../../redux/slices/painBehaviorQuestion';
import { useParams } from 'react-router-dom';

const PainBehaviorQuestion = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getPainBehaviorQuestionById(id));
    }, [id, dispatch]);

    const updateValue = useSelector(state => state?.painBehaviorQuestionSlice?.painBehaviorDataById);

    const [values, setValues] = useState({})

    useEffect(() => {
        setValues({
            painAreaId: "",
            painDefinitionId: "",
            painBehaviorId: updateValue ? updateValue?.painBehaviorId?._id : '',
            questionId: updateValue ? updateValue?.questionId?._id : '',
            gifUrl: '',
        })
    }, [updateValue])

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
    }, [dispatch]);

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

    useEffect(() => {
        dispatch(getPainBehaviorByPainAreaId(updateValue?.painBehaviorId?.painDefinitionId));
    }, [updateValue, dispatch])

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
            setValues({
                painAreaId: "",
                painDefinitionId: "",
                painBehaviorId: '',
                questionId: '',
                gifUrl: ''
            })
        }

    }

    const handleUpdate = () => {
        const newErrors = {
            painBehaviorId: values.painBehaviorId.trim() === '' ? 'Please select the pain Behavior*' : '',
            questionId: values.questionId.trim() === '' ? 'Please select the question*' : '',
        }
        setError(newErrors);
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if(!hasErrors) {
            if(values.gifUrl === "") {
             const payload = {
                questionId : values.questionId,
                painAreaId : values.painBehaviorId,
                gifUrl : updateValue.gifUrl,
             }
             dispatch(patchPainBehaviorQuestion({id: updateValue._id, payload}))
             setValues({
                painAreaId: "",
                painDefinitionId: "",
                painBehaviorId: '',
                questionId: '',
                gifUrl: ''
            })
            }
            else {
                const payload = new FormData();
                payload.append("questionId", values.questionId);
                payload.append("painBehaviorId", values.painBehaviorId);
                payload.append("gifUrl", values.gifUrl);

                dispatch(patchPainBehaviorQuestion({id : updateValue._id, payload}))
                setValues({
                    painAreaId: "",
                    painDefinitionId: "",
                    painBehaviorId: '',
                    questionId: '',
                    gifUrl: ''
                })
            }
        }
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>

            {
                !updateValue &&
                 <div>
                    <label className='form-label mt-4'>Please select the pain area</label>
                    <SelectField
                        onChange={handlePainArea}>
                        <option value="" selected={values.painAreaId === ""}>Please select the pain area</option>
                        {
                            painAreaData?.map(item => {
                                return <option value={item?._id}>{item?.name}</option>
                            })
                        }
                    </SelectField>
                    {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
                </div>
            }
            {
                !updateValue &&
                 <div>
                    <label className='form-label mt-4'>Please select the pain definition</label>
                    <SelectField
                        onChange={handlePainDefinition}>
                        <option value="" selected={values.painDefinitionId === ""}>Please select the pain definition</option>
                        {
                            painDefintionDataById.map(item => <option value={item?._id}>{item?.name}</option>)
                        }
                    </SelectField>
                    {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
                </div>
            }

            <div>
                <label className='form-label mt-4'>Please select pain behavior</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, painBehaviorId: e.target.value })}>
                    <option value="" selected={values.painBehaviorId === ""}>Please select the pain behavior</option>
                    {
                        painBehaviorDataById?.map(item => <option
                             value={item?._id}
                             selected = {updateValue?.painBehaviorId?._id === item._id}
                             >{item?.name}</option>)
                    }

                </SelectField>
                {error.painBehaviorId && <p className='error'>{error.painBehaviorId}</p>}
            </div>
            <div>
                <label className='form-label mt-4'>Please select the question</label>
                <SelectField
                    onChange={(e) => setValues({ ...values, questionId: e.target.value })}>
                    <option value="" selected={values.questionId === ""}>Please select the question</option>
                    {
                        questionDefinitionData?.map(item => <option
                             value={item?._id}
                             selected = {updateValue?.questionId?._id === item?._id}
                             >{item.question}</option>)
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
                {updateValue?.gifUrl && 
                  <div style={{display: "flex" , justifyContent: "center"}}>
                  <img style={{width: "200px", height: "200px", alignSelf: "center"}} src={updateValue?.gifUrl} alt="" />
                 </div>
                }
            </div>
            {
          updateValue ? <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleUpdate}>Update</button>
          :
          <button className='btn btn-primary w-100 p-3 mt-4 button-common' onClick={handleSubmit}>Submit</button>
        }
        </div>
    )
}

export default PainBehaviorQuestion
