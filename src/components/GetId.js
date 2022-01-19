import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Details, MoviePlayer } from '../routes';

function GetId(props) {

    const { id } = useParams();
    let navigate = useNavigate();

    return (
        <div>
            {
                props.component === 'Details' ? (
                    <Details taskId={id} navigate={navigate} />
                ) : 
                props.component === 'MoviePlayer' ? (
                    <MoviePlayer taskId={id} navigate={navigate} />
                ) : null
            }
        </div>
    );
}

export { GetId };