import axios from "axios";
import React, { Component } from "react";
import _ from "lodash";
// import { useNavigate } from "react-router-dom";


import { MvPlayerList, Spinner, VideoPlayer } from "../components";
import { API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

import '../css/MoviePlayer.css';
import { calcTime } from "../utils/helpers";

let newMovies = [];

// function newNagigate (movieId) {
//     let navigate = useNavigate();
// }

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
            console.log(selectedMovie, 'selectedmovie if no id')
            this.setState({
                loading: false,
                movies: [...newMovies],
                selectedMovie: selectedMovie
            })

            window.history.pushState("first !", undefined, `/player/${selectedMovie.id}`);
            // const history = window.history;
            // history.push({
            //     pathname: `/player/${selectedMovie.id}`
            // })
            // console.log(history)
            // this.props.navigate(`/player/${selectedMovie.id}`);
        }
    }

    componentDidUpdate (prevProps) {
        console.log('component dis update : prevporops : ', prevProps.taskId, 'props', this.props.taskId, 'nextProps', this.state.selectedMovie.id)
        if (prevProps.taskId !== this.props.taskId) {
            const id = this.props.taskId;
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            this.setState({selectedMovie: selectedMovie, })
        }
    }

    getSelectedMovie = (movies, movieId) => {
      const selectedMovie = _.find(movies, {id: parseInt(movieId, 10)});
      return selectedMovie;
    }

    handleEnded = () => {
        console.log('video ended')
        const { movies, selectedMovie } = this.state;
        const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id);
        const nextMovieIndex = movieIndex === movies.length - 1 ? 0 : movieIndex + 1;
        const newSelectedMovie = movies[nextMovieIndex];
        // console.log('new selected movie', newSelectedMovie, 'selected movie: ', selectedMovie, 'next movie index: ', nextMovieIndex)
        // window.history.go(`/player/${newSelectedMovie.id}`);
        window.history.pushState(`${newSelectedMovie.id}`, undefined, `/player/${newSelectedMovie.id}`);
        // window.history.go(`${newSelectedMovie.id}`);
        // console.log(window.history, 'history')
        this.setState({selectedMovie: newSelectedMovie})
    }

    getTime = (movieId) => {
        return new Promise((resolve, reject) => {
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
            axios.get(url)
                 .then(data => {
                     const duration = data.data.runtime;
                     resolve(duration)
                 })
                 .catch(error => {
                     console.log('error: ', error);
                     reject('error: ', error);
                 })
        })
    }

    getNewMovies = async (oldMovies) => {
        let promises = [];
        for(let i = 0; i < oldMovies.length; i++) {
            const element = oldMovies[i];
            const id = element.id;
            const time = await this.getTime(id);
            promises.push(calcTime(time))
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