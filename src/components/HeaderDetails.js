import React, { Component } from 'react';

import { Container, Stars } from './index';

import '../css/HeaderDetails.css';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
import { calcTime, convertMoney } from '../utils/helpers';

class HeaderDetails extends Component {

    calcVote = () => {
        this.fakeArray1 = [];
        this.fakeArray2 = [];

        const vote = Math.round(this.props.vote / 2);
        const reste = 5 - vote;
        console.log(vote, reste)

        for( let i = 0; i < vote; i++) {
            this.fakeArray1.push('1');
        }

        if (reste !== 0) {
            for(let i = 0; i < reste; i++) {
                this.fakeArray2.push('1');
            }
        }

    }

    render() {
        this.calcVote();
        const {mTitle, mDesc, runtime, revenue } = this.props;
        const imgSrc = `${IMAGE_BASE_URL}/${POSTER_SIZE}/${this.props.imgSrc}`;
        return (
            <div className='headerDetails'>
                <div className='badge-decoration'>
                    {this.props.status}
                </div>
                <div className='headerDetails--poster'>
                    <img className='headerDetails--poster__img' src={imgSrc} alt="poster details" />
                </div>
                <div className='headerDetails--container'>
                    <h3 className='headerDetails--container__title'>{mTitle}</h3>
                    <p className='headerDetails--container_desc'>{mDesc}</p>
                    <div className='headerDetails--info'>
                        <Container
                            iconName="hourglass-half"
                            content={calcTime(runtime)}
                        />
                        <Stars
                            fakeArray1={this.fakeArray1}
                            fakeArray2={this.fakeArray2}
                        />
                        <Container
                            iconName="money"
                            content={convertMoney(revenue)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export { HeaderDetails };