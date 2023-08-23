import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deleteDianosisDefinition, getAllDiagnosisDefinition } from '../../../redux/slices/diagnosis';

const GetDiagnosisDefinitions = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    useEffect(() => {
        dispatch(getAllDiagnosisDefinition());
     }, [dispatch]);
 
     const allDiagnosisData = useSelector(state => state?.diagnosis?.allDiagnosisData);

    const handlePainAreaDelete = (id) => {
        dispatch(deleteDianosisDefinition(id));
        window.location.reload()
    }

    const handlePainAreaUpdate = (Values) => {
         navigate(`/diagnosis/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
            <div style={{  width: "100%", overflowX: "auto"}}>
            <table class="table table-definition">
                <thead >
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Diagnosis name in  English</th>
                        <th scope="col">Diagnosis name in Spanish</th>
                        <th scope="col">Diagnosis description in  English</th>
                        <th scope="col">Diagnosis description in Spanish</th>
                        <th scope="col">How to treated in  English</th>
                        <th scope="col">How to treated in Spanish</th>
                        <th scope="col">Treatment time in  English</th>
                        <th scope="col">Treatment time in Spanish</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allDiagnosisData?.map((item, index) => {
                            return <tr>
                                <th scope="row">{index+1}</th>
                                <td>{item?.diagnosisName?.slice(0, 30)}...</td>
                                <td>{item?.diagnosisNameEs?.slice(0,30)}...</td>
                                <td>{item?.diagnosisDesc?.slice(0,50)}...</td>
                                <td>{item?.diagnosisDescEs?.slice(0,50)}...</td>
                                <td>{item?.treated?.slice(0,30)}...</td>
                                <td>{item?.treatedEs?.slice(0,30)}...</td>
                                <td>{item?.treatmentTime}</td>
                                <td>{item?.treatmentTimeEs}</td>
                                <td onClick={() => handlePainAreaUpdate(item)}><i className='fa fa-pencil-square'></i></td>
                                <td onClick={() => handlePainAreaDelete(item._id)}><i className='fa fa-trash'></i></td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
            </div>
           
        </div>
    )
}

export default GetDiagnosisDefinitions;

