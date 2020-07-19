import * as React from 'react';
import { TagProps } from '../Tag';
import { ButtonProps } from '../Button';

export type TagListProps = {
  dataHook?: string;
  tags: Array<TagProps>;
  actionButton?: TagListActionButtonProps;
}

type TagListActionButtonProps = ButtonProps & {
  label?: string;
}

export default class TagList extends React.PureComponent<TagListProps>{
  
}
