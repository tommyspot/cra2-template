import React, { PureComponent } from 'react';
import Video from './components/video';
import Chart from './components/chart';
import Styles from './styles.module.scss';

class Dashboard extends PureComponent {
  state = {
    currentTime: null
  };

  updateCurrentTime = currentTime => {
    this.setState({ currentTime });
  };

  render() {
    const { currentTime } = this.state;

    return (
      <div className={Styles.wrapper}>
        <div className={Styles.filter}>filter</div>
        <div className={Styles.video}>
          <Video updateCurrentTime={this.updateCurrentTime} />
        </div>
        <div className={Styles.chart}>
          <Chart currentTime={currentTime} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
