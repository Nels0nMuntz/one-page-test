import React from 'react';
import Typography from '@mui/material/Typography';

import { ChildrenProps } from 'models';

import './Heading.scss';


interface HeadingProps extends ChildrenProps {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Heading: React.FC<HeadingProps> = ({ variant, children }) => {
  return (
    <Typography 
      variant={variant}
      className="typography-heading"
    >
      {children}
    </Typography>
  );
};