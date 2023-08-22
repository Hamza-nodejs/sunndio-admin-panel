import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { deletePainDefinition, getPainDefintion } from '../../../redux/slices/painDefinition';
import { deletPainBehavior, getAllPainBehaviorData } from '../../../redux/slices/painBehavior';

const GetPainBehavior = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllPainBehaviorData());
    }, [dispatch]);

    const painBehaviorData = useSelector(state => state?.painBehavior?.allPainBehaviorData);

    const handlePainBehaviorDelete = (id) => {
        dispatch(deletPainBehavior(id));
        window.location.reload()
    }

    const handlePainBehaviorUpdate = (Values) => {
        navigate(`/pain-behavior/${Values._id}?edit=true`)
    }

    return (
        <div style={{ paddingTop: '40px', paddingLeft: '100px', paddingRight: '100px' }}>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Spanish Name</th>
                        <th scope="col">Pain Definition</th>
                        <th scope="col">Image</th>
                        <th scope='col'>Update</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        painBehaviorData?.map((item, index) => {
                            return <tr>
                                <th scope="row">{index + 1}</th>
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
            </table>
        </div>
    )
}

export default GetPainBehavior;
