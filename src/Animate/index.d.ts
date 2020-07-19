import * as React from 'react';

export interface AnimateProps {
  dataHook?: string;
  children?: React.ReactNode;
  triggerAnimation?: boolean;
  onEnter?: Function;
  onExited?: Function;
  loop?: boolean;
  delay?: boolean;
}

export default class Animate extends React.PureComponent<AnimateProps>{}
