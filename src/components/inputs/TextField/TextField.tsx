import React from 'react';
import TextField from '@mui/material/TextField';


interface TextBoxProps {
    name: string;
    label: string;
    value: string;
    isValid: boolean;
    isTouched: boolean;
    helperText?: string;
    onChange: (e: React.ChangeEvent<any>) => void
    onBlur: (e: React.ChangeEvent<any>) => void
}

export const TextBox: React.FC<TextBoxProps> = ({ name, label, value, helperText, isValid, isTouched, onChange, onBlur }) => {    
    return (
        <TextField
            name={name}
            label={label}
            value={value}
            helperText={helperText}
            error={!isValid && isTouched}
            autoComplete="off"
            onChange={onChange}
            onBlur={onBlur}
        />
    );
};