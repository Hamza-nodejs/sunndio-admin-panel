import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePainArea, getAllPainArea, } from '../../../redux/slices/painArea';
import { Value } from 'sass';
import { useNavigate } from 'react-router-dom';

const GetPainArea = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPainArea());
    }, [dispatch]);

    const painAreaData = useSelector(state => state?.painArea?.allPainArea);

    const handlePainAreaDelete = (id) => {
        dispatch(deletePainArea(id));
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
                        <th scope="col">Name</th>
                        <th scope="col">Spanish Name</th>
                        <th scope="col">Position</th>
                        <th scope="col">pointX</th>
                        <th scope="col">pointY</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        painAreaData?.map((item, index) => {
                            return <tr>
                                <th scope="row">{index+1}</th>
                                <td>{item.name}</td>
                                <td>{item.nameEs}</td>
                                <td>{item.position ? item.position : "-"}</td>
                                <td>{item.points[0] ? item.points[0] : "-"}</td>
                                <td>{item.points[1] ? item.points[1] : "-"}</td>
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

export default GetPainArea
