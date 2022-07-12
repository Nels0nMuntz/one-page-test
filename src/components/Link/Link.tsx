import React from 'react';

import { ChildrenProps } from 'models';


interface PrimaryLinkProps extends ChildrenProps {
    href: string;
};

export const PrimaryLink: React.FC<PrimaryLinkProps> = ({ href, children }) => {
    return (
        <a 
            href={href}
            className="btn"
        >
            {children}
        </a>
    );
};