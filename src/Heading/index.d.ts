import * as React from 'react';
import { EllipsisProps } from '../common/Ellipsis';

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    EllipsisProps {
  dataHook?: string;
  className?: string;
  light?: boolean;
  appearance?: HeadingAppearance;
}

export const Heading: React.SFC<HeadingProps>;
export default Heading;
export type HeadingAppearance = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
