import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GoogleChart from 'react-google-charts';

import jsonData from '@/data/json/data.json';
import { convertJSONData, buildDataTable, getMaxMin } from '../../service';
import Styles from './styles.module.scss';

const data = convertJSONData(jsonData);
const dataTable = buildDataTable(data);
const { max, min } = getMaxMin(data);

class Chart extends PureComponent {
  static propTypes = {
    currentTime: PropTypes.number.isRequired
  };

  getDataTable = () => {
    return [
      ['Time', 'Overall', 'Milestone', { role: 'tooltip' }, { role: 'style' }],
      ['20:00', 20, 40, 'Topic 1', null],
      ['20:01', 10, null, null, null],
      ['20:02', -10, 40, 'Topic 2', 'red'],
      ['20:03', -30, null, null, null],
      ['20:04', 10, 40, 'Topic 3', null]
    ];
  };

  getOption = () => {
    return {
      title: 'Denmark Debate',
      vAxis: { title: 'Means', viewWindow: { min, max } },
      hAxis: { title: 'Time' },
      seriesType: 'lines',
      colors: ['#47908F', '#A7A9AC'],
      series: {
        0: { curveType: 'function' },
        1: { type: 'bars' }
      },
      legend: { position: 'none' },
      bar: { groupWidth: '30%' }
    };
  };

  render() {
    // const dataTable = this.getDataTable();
    const option = this.getOption();
    return (
      <div className={Styles.wrapper}>
        <GoogleChart
          width="100%"
          height="100%"
          chartType="ComboChart"
          loader={<div>Loading Chart</div>}
          data={dataTable}
          options={option}
          className={Styles.chart}
        />
      </div>
    );
  }
}

export default Chart;
