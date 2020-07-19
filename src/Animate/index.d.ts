import * as React from 'react';

export interface AnimateProps {
  dataHook?: string;
  children?: React.ReactNode;
  triggerAnimation?: boolean;
  onEnter?(): void;
  onExited?(): void;
  loop?: boolean;
  delay?: boolean;
}

export default class Animate extends React.PureComponent<AnimateProps>{}
