import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import Styles from './styles.module.scss';

class SingleFilter extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    indeterminate: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { title, label, checked, indeterminate, onChange } = this.props;
    return (
      <div className={Styles.wrapper}>
        <div className={Styles.title}>{title}</div>
        <Checkbox checked={checked} indeterminate={indeterminate} onChange={onChange}>{label}</Checkbox>
      </div>
    );
  }
}

export default SingleFilter;
