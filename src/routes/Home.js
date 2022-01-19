import React, { Component } from "react";

import { connect } from "react-redux";

import { HeaderImg, LoadButton, PosterList, SearchBar } from "../components";
import { getMovies } from "../actions/movie";
import { renderLogin } from "../utils/helpers";
import { Navigate } from "react-router-dom";

const flag = renderLogin();
class HomeComponent extends Component {

    state = {
        flag: flag
    }

    componentDidMount() {
        this.props.getMovies()
    }

    render() {
        const { mTitle, mDesc, image, movies, loading } = this.props
        console.log(this.props.localMovies)
        return (
            <div>
                {!this.state.flag && (
                    <Navigate to="/login" replace={true} />
                )}
                <HeaderImg
                    title={mTitle}
                    overview={mDesc}
                    imgSrc={image}
                />
                <SearchBar onSearchClick={this.props.onSearchClick} />
                <PosterList movies={movies} localMovies={this.props.localMovies} />
                <LoadButton onButtonClick={this.props.onButtonClick} loading={loading} />
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        localMovies: state.movies.movies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMovies: () => dispatch(getMovies())
    }
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

export { Home };