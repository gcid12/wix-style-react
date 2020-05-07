import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import pick from '../../../utils/operators/pick';
import Text from '../../../Text';
import * as TabPropTypes from '../constants/tab-prop-types';
import { classes } from '../../Tabs.st.css';

class TabItem extends React.Component {
  getItemStyle() {
    const { type, width, itemMaxWidth } = this.props;

    return (
      {
        uniformSide: { width },
        compactSide: itemMaxWidth ? { maxWidth: `${itemMaxWidth}pt` } : {},
      }[type] || {}
    );
  }

  render() {
    const { item, onItemClick, isActive, dynamicProperties } = this.props;

    const containerProps = {
      key: item.id,
      onClick: () => onItemClick(item),
      className: classNames(classes.tab, { [classes.active]: isActive }),
      style: this.getItemStyle(),
      ...pick(this.props, dynamicProperties),
    };

    return (
      <li
        data-active={isActive}
        data-hook={item.dataHook}
        {...containerProps}
        ref={this.createRef}
      >
        <Text className={classes.tabText} weight="normal" ellipsis>
          {item.title}
        </Text>
      </li>
    );
  }
}

TabItem.propTypes = {
  itemMaxWidth: PropTypes.number,
  isActive: PropTypes.bool,
  item: TabPropTypes.item.isRequired,
  onItemClick: TabPropTypes.onClick,
  type: TabPropTypes.type,
  width: TabPropTypes.width,
  dynamicProperties: PropTypes.array,
};

export default TabItem;
