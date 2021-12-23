import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {addMovie, removeMovie} from '../actions/movie'
import '../css/Poster.css';
import FontAwesome from 'react-fontawesome';

class PosterComponent extends Component {

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

    remove = () => {
        // à implémenter avec redux
        console.log('remove avec redux')
        this.props.removeM(this.props.id)

    }

    add = () => {
        // à implémenter avec redux
        console.log('add avec redux')
        this.props.addM(this.props.movie)
    }

    render() {
        const { hover } = this.state
        const { wished } = this.props;
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
            className='poster'
            >
                <Link to={{ pathname: `/${this.props.id}`}} >
                <img className='poster--img' src={imgSrc} alt="poster" />
                </Link>
                {hover ?
                (
                    <div className='poster--overlay'>
                        <h3 className='poster--overlay__text'>LISTE DE SOUHAITS</h3>
                        {wished ? 
                        (
                            <FontAwesome
                            onClick={this.remove}
                            className='poster--icon'
                            name='heart'
                            size='3x'
                            />
                        )
                    : (
                        <FontAwesome
                        onClick={this.add}
                        className='poster--icon__not'
                        name='heart-o'
                        size='3x'
                        />
                    )}
                    </div>
                ) : null}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addM : movie => dispatch(addMovie(movie)),
        removeM : movieId => dispatch(removeMovie(movieId))
    }
}

const Poster = connect(null, mapDispatchToProps)(PosterComponent);

export { Poster };