import React from 'react';
import { useParams } from 'react-router-dom';
import { Details, MoviePlayer } from '../routes';

function GetId(props) {

    const { id } = useParams();
    console.log(id, props.component);

    return (
        <div>
            {
                props.component === 'Details' ? (
                    <Details taskId={id} />
                ) : 
                props.component === 'MoviePlayer' ? (
                    <MoviePlayer />
                ) : null
            }
        </div>
    );
}

export { GetId };