import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

// import videoUrl from '@/data/video/video.mp4';
import Styles from './styles.module.scss';

// https://cdn-b-east.streamable.com/video/mp4/1asj1.mp4?token=IS_0-8hEfJByYsFF5HuVmw&expires=1553802764"
// https://vimeo.com/327434240

const VIDEO_MAX_TIME = 61;
class Video extends PureComponent {
  static propTypes = {
    updateCurrentTime: PropTypes.func.isRequired
  };

  onSeek = currentTime => {
    let time = Math.ceil(currentTime / 60);
    if (time > 0) {
      const { updateCurrentTime } = this.props;
      time = time >= VIDEO_MAX_TIME ? VIDEO_MAX_TIME : time;
      updateCurrentTime(time);
    }
  };

  onProgress = progress => {
    const { playedSeconds } = progress;
    let time = Math.ceil(playedSeconds / 60);
    if (time > 0) {
      const { updateCurrentTime } = this.props;
      time = time >= VIDEO_MAX_TIME ? VIDEO_MAX_TIME : time;
      updateCurrentTime(time);
    }
  };

  render() {
    return (
      <div className={Styles.wrapper}>
        <ReactPlayer
          url="https://vimeo.com/327434240"
          width="100%"
          height="100%"
          controls
          onSeek={this.onSeek}
          onProgress={this.onProgress}
          className={Styles.video}
        />
      </div>
    );
  }
}

export default Video;
