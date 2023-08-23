import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deletePainDefinition, getPainDefintion } from '../../../redux/slices/painDefinition';
import { deletePainBehaviorQuestion, getAllPainBehaviorQuestion } from '../../../redux/slices/painBehaviorQuestion';

const GetPainBehaviorQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPainBehaviorQuestion());
    }, [dispatch]);

    const painDefinitionData = useSelector(state => state?.painBehaviorQuestionSlice?.allPainBehaviorQuestion);

    const handlePainDefinitionDelete = (id) => {
        dispatch(deletePainBehaviorQuestion(id));
        window.location.reload()
    }

    const handlePainDefinitionUpdate = (Values) => {
         navigate(`/pain-difinition/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Pain Behavior Name</th>
                        <th scope="col">Question name</th>
                        <th scope="col">Image</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        painDefinitionData?.map((item, index) => {
                            return <tr>
                                <th scope="row">{index+1}</th>
                                <td>{item.painBehaviorId?.name}</td>
                                <td>{item?.questionId?.question}</td>
                                <td><img src={item.gifUrl} alt="pain-definition" style={{width: "75px", height: "75px"}}/></td>
                                <td onClick={() => handlePainDefinitionUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                                <td onClick={() => handlePainDefinitionDelete(item._id)}><i className='fa fa-trash'></i></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default GetPainBehaviorQuestion;
