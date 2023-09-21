import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deletPainBehavior, getAllPainBehaviorData } from '../../../redux/slices/painBehavior';
import Loader from '../../common/Loader';

const GetPainBehavior = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPainBehaviorData());
    }, [dispatch]);

    const painBehaviorData = useSelector(state => state?.painBehavior?.allPainBehaviorData);

    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(15);
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        if (Array.isArray(painBehaviorData)) {
          setShowData(painBehaviorData.slice(firstNumber, secondNumber));
        }
      }, [painBehaviorData, firstNumber, secondNumber]);

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

    const handlePainBehaviorDelete = (id) => {
        dispatch(deletPainBehavior(id));
        window.location.reload()
    }

    const handlePainBehaviorUpdate = (Values) => {
        navigate(`/pain-behavior/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px', paddingBottom: "30px" }}>
           {
            showData.length > 0 ?  <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name in English</th>
                    <th scope="col">Name in Spanish</th>
                    <th scope="col">Pain Definition</th>
                    <th scope="col">Image</th>
                    <th scope='col'>Update</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    showData?.map((item, index) => {
                        return <tr>
                            <th scope="row">{firstNumber+ index + 1}</th>
                            <td>{item.name}</td>
                            <td>{item.nameEs}</td>
                            <td>{item.painDefinitionId.name ? item.painDefinitionId.name : "-"}</td>
                            <td><img src={item.imageUrl} alt="pain-definition" style={{ width: "75px", height: "75px" }} /></td>
                            <td onClick={() => handlePainBehaviorUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                            <td onClick={() => handlePainBehaviorDelete(item._id)}><i className='fa fa-trash'></i></td>
                        </tr>
                    })
                }

            </tbody>
        </table> : <Loader/>
           }
            <div style={{display : "flex", justifyContent: "space-between"}}>
                <button disabled={firstNumber <= 0} className='btn btn-primary px-5 p-3' onClick={handlePrevious}>
                    Previous
                </button>

                <button disabled={secondNumber > painBehaviorData.length} className='btn btn-primary px-5 p-3' onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default GetPainBehavior;
