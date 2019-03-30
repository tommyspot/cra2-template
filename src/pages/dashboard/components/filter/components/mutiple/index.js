import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import Styles from './styles.module.scss';

const CheckboxGroup = Checkbox.Group;

class MultipleFilter extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { title, value, options, onChange } = this.props;
    return (
      <div className={Styles.wrapper}>
        <div className={Styles.title}>{title}</div>
        <CheckboxGroup value={value} onChange={onChange}>
          {options.map(({ label, value: valueOpt }) => (
            <Checkbox key={valueOpt} value={valueOpt}>{label}</Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    );
  }
}

export default MultipleFilter;
