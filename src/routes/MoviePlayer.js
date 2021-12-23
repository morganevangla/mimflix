import axios from "axios";
import React, { Component } from "react";
import _ from "lodash";


import { MvPlayerList, Spinner, VideoPlayer } from "../components";
import { API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

import '../css/MoviePlayer.css';

let newMovies = [];

class MoviePlayer extends Component {

    state = {
        movies: [
            {
                duration: '2h 9m',
                id: 429617,
                imageUrl: 'http://image.tmb.org/t/p/w1280/5myQbDzw318K9yofUXRJ4UTVgam.jpg',
                position: 1,
                title: 'Spider-Man : Far from home',
                videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            },
            {
                duration: '2h 9m',
                id: 429618,
                imageUrl: 'http://image.tmb.org/t/p/w1280/5myQbDzw318K9yofUXRJ4UTVgam.jpg',
                position: 1,
                title: 'Spider-Man : Far from home',
                videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            },
            {
                duration: '2h 9m',
                id: 429616,
                imageUrl: 'http://image.tmb.org/t/p/w1280/5myQbDzw318K9yofUXRJ4UTVgam.jpg',
                position: 1,
                title: 'Spider-Man : Far from home',
                videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            },
            {
                duration: '2h 9m',
                id: 429612,
                imageUrl: 'http://image.tmb.org/t/p/w1280/5myQbDzw318K9yofUXRJ4UTVgam.jpg',
                position: 1,
                title: 'Spider-Man : Far from home',
                videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            },
            {
                duration: '2h 9m',
                id: 429610,
                imageUrl: 'http://image.tmb.org/t/p/w1280/5myQbDzw318K9yofUXRJ4UTVgam.jpg',
                position: 1,
                title: 'Spider-Man : Far from home',
                videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
            }
        ],
        selectedMovie: {
            duration: '2h 9m',
            id: 429617,
            imageUrl: "http://images.tmdb.org/t/p/w1280/qVHBqQYLDRs7ESjP9q6o9iPHLWj.jpg",
            position: 1,
            title: 'Spider-Man : Far from home',
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        loading: true
    }

    async componentDidMount() {
        const oldMovies = JSON.parse(localStorage.getItem('movies'));
        const results = await this.getNewMovies(oldMovies);
        newMovies = oldMovies.map((oldMovie, i) => {
            return {
                id: oldMovie.id,
                position: i + 1,
                title: oldMovie.title,
                duration: results[i],
                imageUrl: `${IMAGE_BASE_URL}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}`,
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
            }
        })
        const id = this.props.taskId;

        if (id) {
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            this.setState({
                loading: false,
                movies: [...newMovies],
                selectedMovie: selectedMovie
            })
        } else {
            const selectedMovie = newMovies[0]
            this.setState({
                loading: false,
                movies: [...newMovies],
                selectedMovie: selectedMovie
            })
            this.props.navigate.push(`/player/${selectedMovie.id}`);
        }
    }

    getSelectedMovie = (movies, movieId) => {
      const selectedMovie = _.find(movies, {id: parseInt(movieId, 10)});
      return selectedMovie;
    }

    handleEnded = () => {
        console.log('video ended')
    }

    getTime = (movieId) => {
        return new Promise((resolve, reject) => {
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
            axios.get(url)
                 .then(data => {
                     const duration = data.data.duration;
                     resolve(duration)
                 })
                 .catch(error => {
                     console.log('error: ', error);
                     reject('error: ', error);
                 })
        })
    }

    getNewMovies = (oldMovies) => {
        let promises = [];
        for(let i; i < oldMovies.length; i++) {
            const element = oldMovies[i];
            const id = element.id;
            promises.push(this.getTime(id))
        }
        return Promise.all(promises);
    }

    render() {
        const { movies, selectedMovie, loading } = this.state
        return (
            <div className="moviePlayer">
                {loading ?
                    (
                        <Spinner />
                    ) : (
                        <>
                            <VideoPlayer
                                videoUrl={selectedMovie.videoUrl}
                                imageUrl={selectedMovie.imageUrl}
                                handleEnded={this.handleEnded}
                            />
                            <MvPlayerList
                                movies={movies}
                                selectedMovie={selectedMovie}
                            />
                        </>
                    )}
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         localMovies: state.movies.movies
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         getMovies: () => dispatch(getMovies())
//     }
// }

// const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export { MoviePlayer };