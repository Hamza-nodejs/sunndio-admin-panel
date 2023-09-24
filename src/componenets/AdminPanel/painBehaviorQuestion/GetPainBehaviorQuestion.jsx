import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deletePainBehaviorQuestion, getAllPainBehaviorQuestion } from '../../../redux/slices/painBehaviorQuestion';
import Loader from '../../common/Loader';

const GetPainBehaviorQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPainBehaviorQuestion());
    }, [dispatch]);

    const painBehaviorQuestionData = useSelector(state => state?.painBehaviorQuestionSlice?.allPainBehaviorQuestion);
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(15);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        if (Array.isArray(painBehaviorQuestionData)) {
          setShowData(painBehaviorQuestionData?.slice(firstNumber, secondNumber));
        }
      }, [painBehaviorQuestionData, firstNumber, secondNumber]);

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

    const handlePianBehaviorQuestionDelete = (id) => {
        dispatch(deletePainBehaviorQuestion(id));
        window.location.reload()
    }

    const handlePainBehaviorQuestionUpdate = (Values) => {
        navigate(`/pain-behavior-question/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
           {
            showData.length > 0 ?  <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pain Behavior Name</th>
                    <th scope="col">Question</th>
                    <th scope="col">Image</th>
                    <th scope='col'>Update</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    showData?.map((item, index) => {
                        return <tr key={item?._id}>
                            <th scope="row">{firstNumber + index + 1}</th>
                            <td>{item.painBehaviorId?.name}</td>
                            <td>{item?.questionId?.question}</td>
                            <td><img src={item.gifUrl} alt="pain-definition" style={{ width: "75px", height: "75px" }} /></td>
                            <td onClick={() => handlePainBehaviorQuestionUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                            <td onClick={() => handlePianBehaviorQuestionDelete(item._id)}><i className='fa fa-trash'></i></td>
                        </tr>
                    })
                }

            </tbody>
        </table> : <Loader/>
           }
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button disabled={firstNumber <= 0} className='btn btn-primary px-5 p-3' onClick={handlePrevious}>
                    Previous
                </button>

                <button disabled={secondNumber > painBehaviorQuestionData.length} className='btn btn-primary px-5 p-3' onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default GetPainBehaviorQuestion;
