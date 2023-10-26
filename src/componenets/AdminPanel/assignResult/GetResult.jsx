import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { assignResultDelete, getAssignResult } from '../../../redux/slices/assignResult';
import { useState } from 'react';
import Loader from '../../common/Loader';

const GetResult = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAssignResult());
    }, [dispatch]);

    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(15);

    const assignResultData = useSelector(state => state?.assignResultSlice?.assignResultData);

    const [showData, setShowData] = useState([]);

    useEffect(() => {
        if (Array.isArray(assignResultData)) {
            setShowData(assignResultData.slice(firstNumber, secondNumber));
        }
    }, [assignResultData, firstNumber, secondNumber]);

    const handleAssignResultDelete = (id) => {
        const result = window.confirm("Are you sure want to delete?");
        if (result) {
            dispatch(assignResultDelete(id));
            dispatch(getAssignResult());
        }
    }

    const handleAssignResultUpdate = (Values) => {
        navigate(`/result/${Values._id}?edit=true`)
    }

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

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
            {
                showData.length > 0 ? <div style={{ width: "100%", overflowX: "auto" }}>
                    <table className="table table-definition" height='200px'>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Pain Behavior</th>
                                <th scope="col">Question</th>
                                <th>Possible Diagnosis</th>
                                <th scope='col'>Percentage</th>
                                <th scope='col'>Diagnosis Answer</th>
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
                                        <td>{item.painBehaviorQuestionId?.questionId?.question.slice(0, 50)}...</td>
                                        <td>{item?.possibleDiagnosticId?.diagnosticsId?.diagnosisName.slice(0, 40)}...</td>
                                        <td>{item?.Percentage}</td>
                                        <td>{item?.DiagAnswer ? "true" : "false"}</td>
                                        <td onClick={() => handleAssignResultUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                                        <td onClick={() => handleAssignResultDelete(item._id)}><i className='fa fa-trash'></i></td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div> : <Loader />
            }

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                <button disabled={firstNumber <= 0} className='btn btn-primary px-5 p-3' onClick={handlePrevious}>
                    Previous
                </button>

                <button disabled={secondNumber >= assignResultData.length} className='btn btn-primary px-5 p-3' onClick={handleNext}>
                    Next
                </button>
            </div>


        </div>
    )
}

export default GetResult;
