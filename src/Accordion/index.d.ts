import * as React from 'react';

import { AccordionItemProps, AccordionItemButtonType } from './AccordionItem';

interface AccordionItem {
  title: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
  expandLabel: React.ReactNode;
  collapseLabel: React.ReactNode;
  buttonType: AccordionItemButtonType;
  disabled: boolean;
  onToggle: Function;
  open: boolean;
  initiallyOpen: boolean;
}

export interface AccordionProps {
  dataHook?: string;
  multiple?: boolean;
  items?: AccordionItem[];
  skin?: AccordionItemProps['skin'];
  hideShadow?: boolean;
}

export default class Accordion extends React.Component<AccordionProps> {}
