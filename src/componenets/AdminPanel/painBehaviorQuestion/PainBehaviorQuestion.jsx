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
import { useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';

const PainBehaviorQuestion = () => {
    const dispatch = useDispatch();

    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (id) {
            dispatch(getPainBehaviorQuestionById(id));
        }

    }, [id, dispatch]);

    const updateValue = useSelector(state => state?.painBehaviorQuestionSlice?.painBehaviorDataById);

    const [values, setValues] = useState({})
    const [question, setQuestion] = useState(null)
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const isEdit = queryParams.get('edit');

        if (isEdit) {
            setValues({
                painAreaId: "",
                painDefinitionId: "",
                painBehaviorId: updateValue ? updateValue?.painBehaviorId?._id : '',
                questionId: updateValue ? updateValue?.questionId?._id : '',
                gifUrl: '',
            })
            setIsUpdate(true)
        } else {
            setValues({
                painAreaId: "",
                painDefinitionId: "",
                painBehaviorId: '',
                questionId: '',
                gifUrl: '',
            })
            setIsUpdate(false)
        }

    }, [updateValue, location])

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
        if (e.target.value) {
            dispatch(getPainDeifnitionByPainAreaId(e.target.value));
        }
    }

    const painDefintionDataById = useSelector(state => state?.painDefinitionSlice?.painDefinitionDataByAreaId);

    const handlePainDefinition = (e) => {
        setValues({ ...values, painDefinitionId: e.target.value });
        if (e.target.value) {
            dispatch(getPainBehaviorByPainAreaId(e.target.value));
        }
    }

    useEffect(() => {
        if (updateValue?.painBehaviorId?.painDefinitionId) {
            dispatch(getPainBehaviorByPainAreaId(updateValue?.painBehaviorId?.painDefinitionId));
        }
    }, [updateValue, dispatch])

    const painBehaviorDataById = useSelector(state => state?.painBehavior?.painBehaviorDataById);

    const handleSubmit = async () => {
        const newErrors = {
            painBehaviorId: values.painBehaviorId.trim() === '' ? 'Please select the Pain Behavior*' : '',
            painAreaId: values.painAreaId.trim() === '' ? 'Please select the Pain Area*' : '',
            painDefinitionId: values.painDefinitionId.trim() === '' ? 'Please select the Pain Definition*' : '',
            questionId: values.questionId.trim() === '' ? 'Please select the Question*' : '',
            gifUrl: values.gifUrl === '' ? 'Please choose the GIF*' : '',
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
            setQuestion(null)
        }

    }

    const handleUpdate = () => {
        const newErrors = {
            painBehaviorId: values.painBehaviorId.trim() === '' ? 'Please select the Pain Behavior*' : '',
            questionId: values.questionId.trim() === '' ? 'Please select the Question*' : '',
        }
        setError(newErrors);
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (!hasErrors) {
            if (values.gifUrl === "") {
                const payload = {
                    questionId: values.questionId,
                    painBehaviorId: values.painBehaviorId,
                    gifUrl: updateValue.gifUrl,
                }
                dispatch(patchPainBehaviorQuestion({ id: updateValue._id, payload }))
                setValues({
                    painAreaId: "",
                    painDefinitionId: "",
                    painBehaviorId: '',
                    questionId: '',
                    gifUrl: ''
                })
                setQuestion(null)
            }
            else {
                const payload = new FormData();
                payload.append("questionId", values.questionId);
                payload.append("painBehaviorId", values.painBehaviorId);
                payload.append("gifUrl", values.gifUrl);

                dispatch(patchPainBehaviorQuestion({ id: updateValue._id, payload }))
                setValues({
                    painAreaId: "",
                    painDefinitionId: "",
                    painBehaviorId: '',
                    questionId: '',
                    gifUrl: ''
                })
                setQuestion(null)
            }
        }
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>

            {
                !updateValue &&
                <div>
                    <label className='form-label mt-4'>Pain Area</label>
                    <SelectField
                        onChange={handlePainArea}>
                        <option value="" selected={values.painAreaId === ""}>Please select the Pain Area</option>
                        {
                            painAreaData?.map(item => {
                                return <option key={item?._id} value={item?._id}>{item?.name}</option>
                            })
                        }
                    </SelectField>
                    {error.painDefinitionId && <p className='error'>{error.painDefinitionId}</p>}
                </div>
            }
            {
                !updateValue &&
                <div>
                    <label className='form-label mt-4'>Pain Definition</label>
                    <SelectField
                        onChange={handlePainDefinition}>
                        <option value="" selected={values.painDefinitionId === ""}>Please select the Pain Definition</option>
                        {
                            painDefintionDataById.map(item => <option key={item?._id} value={item?._id}>{item?.name}</option>)
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
                        painBehaviorDataById?.map(item => <option
                            value={item?._id}
                            key={item?._id}
                            selected={updateValue?.painBehaviorId?._id === item._id}
                        >{item?.name}</option>)
                    }

                </SelectField>
                {error.painBehaviorId && <p className='error'>{error.painBehaviorId}</p>}
            </div>
            <div>
                <label className='form-label mt-4'>Question</label>
                {/* <SelectField
                    onChange={(e) => setValues({ ...values, questionId: e.target.value })}>
                    <option value="" selected={values.questionId === ""}>Please select the Question</option>
                    {
                        questionDefinitionData?.map(item => <option
                            value={item?._id}
                            selected={updateValue?.questionId?._id === item?._id}
                        >{item.question}</option>)
                    }

                </SelectField> */}

                <Select
                    onChange={(e) => {
                        setValues({ ...values, questionId: e.value });
                        setQuestion(e)

                    }}
                    className='form-control'
                    value={question}
                    options={questionDefinitionData.map(option => ({ value: option._id, label: option.question }))}
                    placeholder={isUpdate && updateValue.questionId ? updateValue?.questionId?.question : "Please select the Question"}
                />

                {error.questionId && <p className='error'>{error.questionId}</p>}
            </div>

            <div className='mt-2'>
                <label className='form-label mt-4' htmlFor="">Choose the GIF</label>
                <FileField
                    onChange={(e) => setValues({ ...values, gifUrl: e.target.files[0] })}
                />
                {error.gifUrl && <p className='error'>{error.gifUrl}</p>}
                {isUpdate &&
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img style={{ width: "200px", height: "200px", alignSelf: "center" }} src={updateValue?.gifUrl} alt="" />
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

export default PainBehaviorQuestion
