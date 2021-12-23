import React, { Component } from 'react';
import ReactPlayer from 'react-player';

import '../css/VideoPlayer.css';

class VideoPlayer extends Component {

    render() {
        const { imageUrl, videoUrl } = this.props
        return (
            <div className='videoPlayer'>
                <ReactPlayer
                url={videoUrl}
                controls
                playing={false}
                width={'100%'}
                height={'100%'}
                style={{ position: 'absolute', top: '0', left: 'O' }}
                light={imageUrl}
                onEnded={this.props.handleEnded}
                />
            </div>
        )
    }
}

export { VideoPlayer };