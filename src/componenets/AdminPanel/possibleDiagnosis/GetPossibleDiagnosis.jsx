import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deletePossibleDaignosis, getAllPossibleDiagnosis } from '../../../redux/slices/possibleDiagnosis';
import Loader from '../../common/Loader';

const GetPossibleDiagnosis = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPossibleDiagnosis());
    }, [dispatch]);

    const possibleDiagnosisData = useSelector(state => state?.possibleDiagnosisSlice?.allPossibleDiagnosisData);

    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(15);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        if (Array.isArray(possibleDiagnosisData)) {
          setShowData(possibleDiagnosisData?.slice(firstNumber, secondNumber));
        }
      }, [possibleDiagnosisData, firstNumber, secondNumber]);

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

    const handlePossibleDiagnosisDelete = (id) => {
        dispatch(deletePossibleDaignosis(id));
        window.location.reload();
    }

    const handlePossibleDiagnosisUpdate = (Values) => {
        navigate(`/possible-diagnosis/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
            {
                showData.length > 0 ? <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Pain Behavior Name</th>
                            <th scope="col">Diagnosis name</th>
                            <th scope="col">Possible Diagnosis</th>
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
                                    <td>{item?.diagnosticsId?.diagnosisName}</td>
                                    <td>{item?.isPossibleDiag ? "true" : "false"}</td>
                                    <td onClick={() => handlePossibleDiagnosisUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                                    <td onClick={() => handlePossibleDiagnosisDelete(item._id)}><i className='fa fa-trash'></i></td>
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

                <button disabled={secondNumber > possibleDiagnosisData.length} className='btn btn-primary px-5 p-3' onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default GetPossibleDiagnosis;
