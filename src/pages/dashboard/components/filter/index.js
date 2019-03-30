import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MultipleFilter from './components/mutiple';
import SingleFilter from './components/single';
import { checkIndeterminate, checkIsCheckAll } from './service';
import { FILTER_TYPE } from '../../constants';
import Styles from './styles.module.scss';

class Filter extends PureComponent {
  static propTypes = {
    filter: PropTypes.shape({
      gender: PropTypes.array,
      ageGroup: PropTypes.array,
      side: PropTypes.array,
    }).isRequired,
    updateFilter: PropTypes.func.isRequired,
  };

  state = {
    isCheckAll: true,
    indeterminate: false,
  }

  onChange = (filterType, checkedValues) => {
    const { updateFilter, filter: prevFilter } = this.props;
    const filter = { ...prevFilter, [filterType]: checkedValues };

    this.setState({
      indeterminate: checkIndeterminate(filter),
      isCheckAll: checkIsCheckAll(filter),
    }, () => { updateFilter(filter) })
  };

  onCheckAllChange = e => {
    const isCheckAll = e.target.checked;
    const filter = {
      [FILTER_TYPE.GENDER]: isCheckAll ? ['1', '2'] : [],
      [FILTER_TYPE.AGEGROUP]: isCheckAll ? ['1', '2', '3'] : [],
      [FILTER_TYPE.SIDE]: isCheckAll ? ['1', '2', '3'] : [],
    };
    this.setState({ isCheckAll, indeterminate: false }, () => {
      const { updateFilter } = this.props;
      updateFilter(filter);
    });
  }

  render() {
    const { filter: { gender, ageGroup, side } } = this.props;
    const { isCheckAll, indeterminate } = this.state;
    return (
      <div className={Styles.wrapper}>
        <SingleFilter
          title="Total"
          label="Alle"
          checked={isCheckAll}
          indeterminate={indeterminate}
          onChange={this.onCheckAllChange}
        />
        <MultipleFilter
          title="Gender"
          options={[{ label: 'Male', value: '1'}, { label: 'Female', value: '2'}]}
          value={gender}
          onChange={checkedValues => this.onChange(FILTER_TYPE.GENDER, checkedValues)}
        />
        <MultipleFilter
          title="Agegroup"
          options={[{ label: '18-35 y', value: '1'}, { label: '35-50 y', value: '2'}, { label: '50+ y', value: '3'}]}
          value={ageGroup}
          onChange={checkedValues => this.onChange(FILTER_TYPE.AGEGROUP, checkedValues)}
        />
        <MultipleFilter
          title="Partyaffiliation"
          options={[{ label: 'Red', value: '1'}, { label: 'Blue', value: '2'}, { label: 'Tvivlerne (bløde og hårde)', value: '3'}]}
          value={side}
          onChange={checkedValues => this.onChange(FILTER_TYPE.SIDE, checkedValues)}
        />
      </div>
    );
  }
}

export default Filter;
