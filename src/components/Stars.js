import React from "react";
import FontAwesome from "react-fontawesome";
import '../css/stars.css';

const Stars = props => {
    //methode qui retourne les étoiles pleines
  const renderStars1 = () => {
        return props.fakeArray1.map((el, i) => {
            return (
                <FontAwesome
                key= {i}
                className="stars"
                name='star'
                size="3x"
                />
            )
        })
    }

    // methode qui retourne les étoiles vides
    const renderStars2 = () => {
        return props.fakeArray2.map((el, i) => {
            return (
                <FontAwesome
                key= {i}
                className="stars"
                name='star-o'
                size="3x"
                />
            )
        })
    }


    return (
        <div className="stars">
            {renderStars1()}
            {renderStars2()}
        </div>
    )
}

export { Stars };