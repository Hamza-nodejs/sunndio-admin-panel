import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import { deleteTreatment, getAllTreatment } from '../../../redux/slices/treatment';

const GetTreatment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllTreatment());
    }, [dispatch]);

    const allTreatmentData = useSelector(state => state?.treatmentSlice?.allTreatmentData);

    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(15);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        if (Array.isArray(allTreatmentData)) {
          setShowData(allTreatmentData?.slice(firstNumber, secondNumber));
        }
      }, [allTreatmentData, firstNumber, secondNumber]);

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

    const handleTreatmentDelete = (id) => {
        dispatch(deleteTreatment(id));
        window.location.reload()
    }

    const handlePainAreaUpdate = (Values) => {
        navigate(`/treatment/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
            {
                showData.length > 0 ? <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Diagnosis Name</th>
                            <th scope="col">Title in English</th>
                            <th scope='col'>Title in Spanish</th>
                            <th scope='col'>Treatment Level</th>
                            <th scope='col'>Video Duration</th>
                            <th scope='col'>Video</th>
                            <th scope='col'>Update</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            showData?.map((item, index) => {
                                return <tr>
                                    <th scope="row">{index + 1 + firstNumber}</th>
                                    <td>{item?.diagnosticId?.diagnosisName}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.titleEs}</td>
                                    <td>{item?.treatmentLevel}</td>
                                    <td>{item?.duration}</td>
                                    <td><video style={{width: "75px", height: "75px", padding: "0px"}} src={item?.treatmentUrl}></video></td>
                                    <td onClick={() => handlePainAreaUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                                    <td onClick={() => handleTreatmentDelete(item._id)}><i className='fa fa-trash'></i></td>
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

                <button disabled={secondNumber > allTreatmentData.length} className='btn btn-primary px-5 p-3' onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default GetTreatment;

