import React from 'react';
import { Link } from 'react-router-dom';

import { ChildrenProps } from 'models';


interface PrimaryLinkProps extends ChildrenProps {
    to: string;
};

export const PrimaryLink: React.FC<PrimaryLinkProps> = ({ to, children }) => {
    return (
        <Link 
            to={to}
            className="btn"
        >
            {children}
        </Link>
    );
};