import axios from "axios";
import React, { Component } from "react";
import _ from "lodash";
import { Navigate } from 'react-router';


import { MvPlayerList, Spinner, VideoPlayer } from "../components";
import { API_KEY, API_URL, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
import { renderLogin } from "../utils/helpers";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";

import '../css/MoviePlayer.css';
import { calcTime } from "../utils/helpers";

let newMovies = [];
const flag = renderLogin();

class MoviePlayer extends Component {

    state = {
        movies: [],
        selectedMovie: {},
        loading: true,
        flag: flag,
        user: null,
        validSub: false
    }

    async componentDidMount() {
        const userF = firebase.auth().currentUser;

        const auth = getAuth();
        const user = auth.currentUser;
        let dbRef;
        if (user) {
            this.setState({ user: user.uid })
            dbRef = firebase.database().ref(`users/${user.uid}`)
            dbRef.on('value', async snapshot => {
                const data = snapshot.val();
                console.log(data, 'data with user', this.state.user)
                if (data) {
                    const targetDate = data.validUntil;
                    const now = new Date().getTime();
                    console.log('NOW : ', now, 'sub : ', targetDate)
                    if (targetDate > now) {
                        console.log('abonnement valide');
                        this.setState({ validSub: true });
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
                        }
                    } else {
                        this.setState({
                            loading: false
                        })
                    }

                }
            })
        }
    }

    componentDidUpdate(prevProps) {
        console.log('component dis update : prevporops : ', prevProps.taskId, 'props', this.props.taskId, 'nextProps', this.state.selectedMovie.id)
        if (prevProps.taskId !== this.props.taskId) {
            const id = this.props.taskId;
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            this.setState({ selectedMovie: selectedMovie, })
        }
    }

    getSelectedMovie = (movies, movieId) => {
        const selectedMovie = _.find(movies, { id: parseInt(movieId, 10) });
        return selectedMovie;
    }

    handleEnded = () => {
        console.log('video ended')
        const { movies, selectedMovie } = this.state;
        const movieIndex = movies.findIndex(movie => selectedMovie.id === movie.id);
        const nextMovieIndex = movieIndex === movies.length - 1 ? 0 : movieIndex + 1;
        const newSelectedMovie = movies[nextMovieIndex];
        window.history.pushState(`${newSelectedMovie.id}`, undefined, `/player/${newSelectedMovie.id}`);
        this.setState({ selectedMovie: newSelectedMovie })
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
        for (let i = 0; i < oldMovies.length; i++) {
            const element = oldMovies[i];
            const id = element.id;
            const time = await this.getTime(id);
            promises.push(calcTime(time))
        }
        return Promise.all(promises);
    }

    render() {
        const { movies, selectedMovie, loading } = this.state
        console.log(this.state.validSub, 'validSub')
        return (
            <div className="moviePlayer">
                {loading ?
                    (
                        <Spinner />
                    ) : (
                        <>
                            {!this.state.flag && (
                                <Navigate to="/login" replace={true} />
                            )}
                            {this.state.user === null && (
                                <Navigate to="/login" replace={true} />
                            )}
                            {!this.state.validSub && (
                                <Navigate to="/payment" replace={true} />
                            )}
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

export { MoviePlayer };