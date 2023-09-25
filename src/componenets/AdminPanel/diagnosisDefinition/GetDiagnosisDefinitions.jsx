import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteDianosisDefinition, getAllDiagnosisDefinition } from '../../../redux/slices/diagnosis';
import Loader from '../../common/Loader';

const GetDiagnosisDefinitions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getAllDiagnosisDefinition());
    }, [dispatch]);

    const allDiagnosisData = useSelector(state => state?.diagnosis?.allDiagnosisData);

    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(15);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        if (Array.isArray(allDiagnosisData)) {
            setShowData(allDiagnosisData.slice(firstNumber, secondNumber));
        }
    }, [allDiagnosisData, firstNumber, secondNumber]);

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

    const handlePainAreaDelete = (id) => {
        dispatch(deleteDianosisDefinition(id));
        dispatch(getAllDiagnosisDefinition());
    }

    const handlePainAreaUpdate = (Values) => {
        navigate(`/diagnosis/${Values._id}?edit=true`)
    }


    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
            {
                showData.length > 0 ? <div style={{ width: "100%", overflowX: "auto" }}>
                    <table className="table table-definition">
                        <thead >
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Diagnosis name in  English</th>
                                <th scope="col">Diagnosis name in Spanish</th>
                                <th scope="col">Diagnosis description in  English</th>
                                <th scope="col">Diagnosis description in Spanish</th>
                                <th scope="col">Treatment in English</th>
                                <th scope="col">Treatment in Spanish</th>
                                <th scope="col">Treatment time in  English</th>
                                <th scope="col">Treatment time in Spanish</th>
                                <th scope='col'>Update</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                showData?.map((item, index) => {
                                    return <tr key={item?._id}>
                                        <th scope="row">{firstNumber + index + 1}</th>
                                        <td>{item?.diagnosisName?.slice(0, 30)}...</td>
                                        <td>{item?.diagnosisNameEs?.slice(0, 30)}...</td>
                                        <td>{item?.diagnosisDesc?.slice(0, 50)}...</td>
                                        <td>{item?.diagnosisDescEs?.slice(0, 50)}...</td>
                                        <td>{item?.treated?.slice(0, 30)}...</td>
                                        <td>{item?.treatedEs?.slice(0, 30)}...</td>
                                        <td>{item?.treatmentTime}</td>
                                        <td>{item?.treatmentTimeEs}</td>
                                        <td onClick={() => handlePainAreaUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                                        <td onClick={() => handlePainAreaDelete(item._id)}><i className='fa fa-trash'></i></td>
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div> : <Loader />
            }
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "30px" }}>
                <button disabled={firstNumber <= 0} className='btn btn-primary px-5 p-3' onClick={handlePrevious}>
                    Previous
                </button>

                <button disabled={secondNumber > allDiagnosisData.length} className='btn btn-primary px-5 p-3' onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default GetDiagnosisDefinitions;

