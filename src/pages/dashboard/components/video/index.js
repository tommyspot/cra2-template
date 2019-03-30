import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import videoUrl from '@/data/video/video.mp4';
import Styles from './styles.module.scss';

// https://cdn-b-east.streamable.com/video/mp4/1asj1.mp4?token=IS_0-8hEfJByYsFF5HuVmw&expires=1553802764"

class Video extends PureComponent {
  static propTypes = {
    updateCurrentTime: PropTypes.func.isRequired
  };

  onSeek = currentTime => {
    const { updateCurrentTime } = this.props;
    updateCurrentTime(currentTime);
  };

  render() {
    return (
      <div className={Styles.wrapper}>
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          onSeek={this.onSeek}
          className={Styles.video}
        />
      </div>
    );
  }
}

export default Video;
