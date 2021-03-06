import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { ChildrenProps } from 'models';


interface PrimaryButtonProps extends ChildrenProps {
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
    disabled?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ type, disabled, loading, children, onClick }) => {
    return (
        <Button
            type={type}
            disabled={loading}
            className={`btn ${loading ? 'btn_loading' : ''} ${disabled ? 'btn_disabled' : ''}`}
            onClick={onClick}
        >
            {children}
            {loading && (
                <div className="btn__progress">
                    <CircularProgress size={20} color="inherit" />
                </div>
            )}
        </Button>
    )
};