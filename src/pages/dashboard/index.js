import React, { PureComponent } from 'react';
import Video from './components/video';
import Chart from './components/chart';
import Filter from './components/filter';
import { FILTER_TYPE } from './constants';
import Styles from './styles.module.scss';

class Dashboard extends PureComponent {
  state = {
    currentTime: 1,
    filter: {
      [FILTER_TYPE.GENDER]: ['1', '2'],
      [FILTER_TYPE.AGEGROUP]: ['1', '2', '3'],
      [FILTER_TYPE.SIDE]: ['1', '2', '3'],
    },
  };

  updateCurrentTime = currentTime => {
    this.setState({ currentTime });
  };

  updateFilter = filter => {
    this.setState({ filter });
  };

  render() {
    const { currentTime, filter } = this.state;

    return (
      <div className={Styles.wrapper}>
        <div className={Styles.filter}>
          <Filter updateFilter={this.updateFilter} filter={filter} />
        </div>
        <div className={Styles.report}>
          Report
        </div>
        <div className={Styles.video}>
          <Video updateCurrentTime={this.updateCurrentTime} />
        </div>
        <div className={Styles.chart}>
          <Chart currentTime={currentTime} filter={filter} />
        </div>
      </div>
    );
  }
}

export default Dashboard;
