import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import GoogleChart from 'react-google-charts';
import { Spin } from 'antd';

import jsonData from '@/data/json/data.json';
import { convertJSONData, buildDataRows, buildDataTable, getMaxMin, filterData } from '../../service';
import Styles from './styles.module.scss';

const { data } = convertJSONData(jsonData);

class Chart extends PureComponent {
  static propTypes = {
    currentTime: PropTypes.number.isRequired,
    filter: PropTypes.shape({
      gender: PropTypes.array,
      ageGroup: PropTypes.array,
      side: PropTypes.array,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    const filteredData = filterData(data, props.filter);
    this.state = {
      dataRows: buildDataRows(filteredData)
    };
  }

  componentDidUpdate(prevProps) {
    const { filter } = this.props;
    if (!isEqual(filter, prevProps.filter)) {
      const filteredData = filterData(data, filter);
      const dataRows = buildDataRows(filteredData);
      this.setState({ dataRows });
    }
  }

  // getDataTable = () => {
  //   return [
  //     ['Time', 'Overall', 'Milestone', { role: 'tooltip' }, { role: 'style' }],
  //     ['20:00', 20, 40, 'Topic 1', null],
  //     ['20:01', 10, null, null, null],
  //     ['20:02', -10, 40, 'Topic 2', 'red'],
  //     ['20:03', -30, null, null, null],
  //     ['20:04', 10, 40, 'Topic 3', null]
  //   ];
  // };

  getDataTable = () => {
    const { currentTime } = this.props;
    const { dataRows } = this.state;
    const dataTable = buildDataTable(dataRows, currentTime);
    return dataTable;
  };

  getOption = () => {
    const { dataRows } = this.state;
    const { max, min } = getMaxMin(dataRows);

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
      bar: { groupWidth: '4' },
      chartArea: {'width': '85%', 'height': '75%'},
    };
  };

  render() {
    const option = this.getOption();
    const dataTable = this.getDataTable();
    const hasData = dataTable.length > 1; // dataTable includes header row

    return (
      <div className={Styles.wrapper}>
        {hasData
          ? (
            <GoogleChart
            width="100%"
            height="100%"
            chartType="ComboChart"
            loader={<Spin />}
            data={dataTable}
            options={option}
            className={Styles.chart}
          />
          )
          : <div>No Data</div>
        }
      </div>
    );
  }
}

export default Chart;
