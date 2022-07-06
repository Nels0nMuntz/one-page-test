import React from 'react';
import Typography from '@mui/material/Typography';

import { ChildrenProps } from 'models';

import './Text.scss';


interface TextProps extends ChildrenProps {
  className?: string;
  innerRef?: React.RefObject<HTMLElement> | null;
};

export const Text: React.FC<TextProps> = ({ className, innerRef, children }) => {
  return (
    <Typography
      variant="body1"
      className={`typography-text ${!!className && className}`}
      ref={innerRef}
    >
      {children}
    </Typography>
  )
};