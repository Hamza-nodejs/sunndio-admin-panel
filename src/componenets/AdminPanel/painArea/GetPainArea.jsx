import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePainArea, getAllPainArea, } from '../../../redux/slices/painArea';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';

const GetPainArea = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPainArea());
    }, [dispatch]);


    const handlePainAreaDelete = (id) => {
        const result = window.confirm("Are you sure want to delete?");
        if (result) {
            dispatch(deletePainArea(id));
            dispatch(getAllPainArea());
        }
    }

    const painAreaData = useSelector(state => state?.painArea?.allPainArea);

    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(15);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        if (Array.isArray(painAreaData)) {
            setShowData(painAreaData.slice(firstNumber, secondNumber));
        }
    }, [painAreaData, firstNumber, secondNumber]);

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

    const handlePainAreaUpdate = (Values) => {
        navigate(`/pain-area/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
            {
                showData?.length > 0 ? <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name in English</th>
                            <th scope="col">Name in Spanish</th>
                            <th scope="col">Position</th>
                            <th scope="col">PointX</th>
                            <th scope="col">PointY</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Update</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            showData?.map((item, index) => {
                                return <tr key={item?._id}>
                                    <th scope="row">{firstNumber + index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.nameEs}</td>
                                    <td>{item.position ? item.position : "-"}</td>
                                    <td>{item.points[0] ? item.points[0] : "-"}</td>
                                    <td>{item.points[1] ? item.points[1] : "-"}</td>
                                    <td>{item.isLive ? "true" : "false"}</td>
                                    <td onClick={() => handlePainAreaUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                                    <td onClick={() => handlePainAreaDelete(item._id)}><i className='fa fa-trash'></i></td>
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

                <button disabled={secondNumber > painAreaData.length} className='btn btn-primary px-5 p-3' onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default GetPainArea
