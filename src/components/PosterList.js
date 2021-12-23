import React, { Component } from 'react';

import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import '../css/PosterList.css';

import { Poster } from './index';

let wish;

class PosterList extends Component {

    renderPoster = () => {
        return this.props.movies.map(movie => {
            const imgSrc = movie.poster_path ?
                           `${IMAGE_BASE_URL}/${POSTER_SIZE}/${movie.poster_path}`
                           : null;
            wish = false;
            if (this.props.localMovies) {
                this.props.localMovies.forEach(localMovie => {
                    if (movie.id === localMovie.id) {
                        wish = true
                    }
                });
            }
            return (
                <Poster
                key={movie.id}
                id={movie.id}
                imgSrc= {imgSrc}
                wished={wish}
                movie={movie}
                mTitle={movie.title}
                mDesc={movie.overview}

                />
            )
        })
    }
    render() {
        return (
            <div className='posterList'>
                <h3 className='posterList--title'>NOUVEAUX FILMS</h3>
                <div className='posterList--grid'>
                    {this.renderPoster()}
                </div>
            </div>
        )
    }
}

export { PosterList };