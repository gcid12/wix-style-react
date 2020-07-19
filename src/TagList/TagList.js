import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './TagList.st.css';
import Tag from '../Tag';
import classNames from 'classnames';

/** TagList */
const TagList = ({ dataHook, tags, actionButton }) => {
  return (
    <div className={styles.root} data-hook={dataHook}>
      {tags.map(({ className, ...tagProps }) => (
        <Tag
          {...tagProps}
          className={classNames(styles.item, className)}
          size="small"
          key={tagProps.id}
        />
      ))}
      {actionButton && (
        <TagListAction
          dataHook="tag-list-action"
          onClick={actionButton.onClick}
        >
          {actionButton.label}
        </TagListAction>
      )}
    </div>
  );
};

const TagListAction = ({ dataHook, className, onClick, children, ...rest }) => (
  <Button
    skin="inverted"
    size="tiny"
    className={classNames(styles.item, className)}
    dataHook={dataHook}
    onClick={onClick}
    {...rest}
  >
    {children}
  </Button>
);

TagListAction.propTypes = {
  dataHook: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

TagList.displayName = 'TagList';

TagList.propTypes = {
  /** Applied as data-hook HTML attribute that can be used in the tests */
  dataHook: PropTypes.string,

  /** List of tags props to be rendered */
  tags: PropTypes.arrayOf(PropTypes.object),

  /** Action button label and onClick handler */
  actionButton: PropTypes.shape({
    onClick: PropTypes.func,
    label: PropTypes.string,
  }),
};

export default TagList;
