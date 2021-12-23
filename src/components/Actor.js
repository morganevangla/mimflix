import React, { Component } from 'react';

import '../css/Actor.css';

class Actor extends Component {

    state = {
        hover: false
    }

    showOverlay = () => {
        if (this.state.hover) {
            return;
        } else {
            this.setState({ hover: true })
        }
    }

    hideOverlay = () => {
            this.setState({ hover: false })
    }

    render() {
        const name = this.props.name.split(" ")
        const imgSrc = this.props.imgSrc ? this.props.imgSrc : './images/Not_Found_Image.jpg';
        return (
            <div
            onMouseEnter={this.showOverlay}
            onMouseLeave={this.hideOverlay}
            style={
                this.props.imgSrc ? 
                {
                    border: 'none'
                } : {
                    border: 'black solid 1px'
                }
            }
            className='actor'
            >
                <img className='actor--img' src={imgSrc} alt="actor" />
                {this.state.hover ?
                (
                    <div className='actor--overlay'>
                        <h3 className='actor--name'>{name[0]}</h3>
                        <h3 className='actor--name'>{name[1]}</h3>
                    </div>
                ): null}
            </div>
        )
    }
}

export { Actor };