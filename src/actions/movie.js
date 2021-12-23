import { ADD_MOVIE, GET_MOVIES, GET_NUMBER, REMOVE_MOVIE } from "./index";

export const addMovie = movie => {
    let movies = JSON.parse(localStorage.getItem('movies'));

    if (movies) {
        movies = [...movies, movie];
    } else {
        movies= [];
        movies.push(movie);
    }

    localStorage.setItem('movies', JSON.stringify(movies));
    return {
        type: ADD_MOVIE,
        payload: movies
    }
}

export const removeMovie = movieId => {
    let oldMovies = JSON.parse(localStorage.getItem('movies'));
    const movies = oldMovies.filter(movie => movie.id !== movieId);

    localStorage.setItem('movies', JSON.stringify(movies));
    return {
        type: REMOVE_MOVIE,
        payload: movies
    }
}

export const getMovies = () => {
    let movies = JSON.parse(localStorage.getItem('movies'));

    return {
        type: GET_MOVIES,
        payload: movies
    }
}

export const getNumber = () => {
    let movies = JSON.parse(localStorage.getItem('movies'));
    let nbrMovies;

    if (movies) {
        nbrMovies = movies.length;
    } else {
        nbrMovies = 0;
    }
    return {
        type: GET_NUMBER,
        payload: nbrMovies
    }
}