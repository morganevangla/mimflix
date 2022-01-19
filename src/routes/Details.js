
import React, {Component} from "react";

import { ActorList, HeaderDetails, Spinner } from "../components";

import axios from "axios";
import { API_KEY, API_URL } from "../config";
import { renderLogin } from "../utils/helpers";

import { Navigate } from 'react-router';

const flag = renderLogin();

class Details extends Component {


    state = {
        loading: true,
        actors: [],
        mTitle: '',
        mDesc: '',
        imgSrc: '',
        runtime: '',
        revenue: '',
        status: '',
        vote: '',
        flag: flag
    }

    async componentDidMount() {
        try {
            const movieId = this.props.taskId;
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`;
            const {
                data: {
                    revenue,
                    runtime,
                    title,
                    overview,
                    status,
                    vote_average,
                    poster_path
                }
            } = await this.loadInfos(url);

            this.setState({
                revenue: revenue,
                runtime: runtime,
                mTitle: title,
                mDesc: overview,
                status: status,
                imgSrc: poster_path,
                vote: vote_average
            }, async () => {
                const url = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=fr`;
                const {data: { cast }} = await this.loadInfos(url)
                this.setState({actors: cast, loading: false})
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    loadInfos = url => axios.get(url);


    render() {
        const { loading, actors, mTitle, mDesc, imgSrc, runtime, revenue, status, vote } = this.state;
        return (
            <div className="app">
                {loading ?
                    (
                        <Spinner />
                    ) : (
                        <>
                            {!this.state.flag && (
                                <Navigate to="/login" replace={true} />
                            )}
                            <HeaderDetails
                                mTitle={mTitle}
                                mDesc={mDesc}
                                imgSrc={imgSrc}
                                runtime={runtime}
                                revenue={revenue}
                                status={status}
                                vote={vote}
                            />
                            <ActorList actors={actors} />
                        </>
                    )}
            </div>
        )
    }
}

export { Details };