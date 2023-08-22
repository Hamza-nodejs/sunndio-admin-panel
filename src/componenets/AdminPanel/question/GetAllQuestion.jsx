import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePainArea, getAllPainArea, } from '../../../redux/slices/painArea';
import { useNavigate } from 'react-router-dom';
import { deleteQuestion, getAllQuestion } from '../../../redux/slices/questionDefinitionSlice';

const GetAllQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllQuestion());
    }, [dispatch]);

    const allQuestionData = useSelector(state => state?.questionDefinitionSlice?.allQuestionData);
     
    console.log("questions: ", allQuestionData)

    const handlePainAreaDelete = (id) => {
        dispatch(deleteQuestion(id));
        window.location.reload()
    }

    const handlePainAreaUpdate = (Values) => {
         navigate(`/pain-area/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Question in English</th>
                        <th scope="col">Question in Spanish</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allQuestionData?.map((item, index) => {
                            return <tr>
                                <th scope="row">{index+1}</th>
                                <td>{item.question}</td>
                                <td>{item.questionEs}</td>
                                <td onClick={() => handlePainAreaUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                                <td onClick={() => handlePainAreaDelete(item._id)}><i className='fa fa-trash'></i></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default GetAllQuestion;

