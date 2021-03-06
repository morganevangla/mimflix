import { ADD_MOVIE, GET_MOVIES, GET_NUMBER, REMOVE_MOVIE } from "../actions";

const initialState = {
    movies: [],
    nbrMovies: 0
}

export const movieReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MOVIE:
            console.log('add movie', action.payload)
            return {
                movies: action.payload,
                nbrMovies: action.payload.length
            }
            case REMOVE_MOVIE:
           console.log('remove movie', action.payload)     
            return {
                movies: action.payload,
                nbrMovies: state.nbrMovies - 1
            }
            case GET_MOVIES:
             console.log('get movies', action.payload)   
                return {
                    ...state,
                    movies: action.payload,
                }
                case GET_NUMBER:
             console.log('get number', action.payload)       
                    return {
                        ...state,
                        nbrMovies: action.payload,
                    }
        default:
            return state;
    }
}
