import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteQuestion, getAllQuestion } from '../../../redux/slices/questionDefinitionSlice';
import Loader from '../../common/Loader';

const GetAllQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllQuestion());
    }, [dispatch]);

    const allQuestionData = useSelector(state => state?.questionDefinitionSlice?.allQuestionData);

    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(15);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        if (Array.isArray(allQuestionData)) {
          setShowData(allQuestionData?.slice(firstNumber, secondNumber));
        }
      }, [allQuestionData, firstNumber, secondNumber]);

    const handlePrevious = (e) => {
        e.preventDefault();
        setFirstNumber(firstNumber - 15);
        setSecondNumber(secondNumber - 15);
    }

    const handleNext = (e) => {
        e.preventDefault();
        setFirstNumber(firstNumber + 15);
        setSecondNumber(secondNumber + 15);
    }

    const handleDeleteQuestion = (id) => {
        dispatch(deleteQuestion(id));
        window.location.reload()
    }

    const handleUpdateQuestion = (Values) => {
        navigate(`/questions/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
            {
                showData.length > 0 ? <table className="table">
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
                            showData?.map((item, index) => {
                                return <tr key={item?._id}>
                                    <th scope="row">{index + 1 + firstNumber}</th>
                                    <td>{item.question}</td>
                                    <td>{item.questionEs}</td>
                                    <td onClick={() => handleUpdateQuestion(item)}><i className='fa fa-pencil-square'></i></td>
                                    <td onClick={() => handleDeleteQuestion(item._id)}><i className='fa fa-trash'></i></td>
                                </tr>
                            })
                        }

                    </tbody>
                </table> : <Loader />
            }
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button disabled={firstNumber <= 0} className='btn btn-primary px-5 p-3' onClick={handlePrevious}>
                    Previous
                </button>

                <button disabled={secondNumber > allQuestionData.length} className='btn btn-primary px-5 p-3' onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default GetAllQuestion;

