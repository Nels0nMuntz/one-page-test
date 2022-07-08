import React from 'react';

import './UploadField.scss';


interface UploadFieldProps {
    name: string;
    isValid: boolean;
    isTouched: boolean;
    value: File | null;
    helperText?: string;
    onChange: (value: File | null) => void;
};

export const UploadField: React.FC<UploadFieldProps> = ({ name, isValid, isTouched, helperText, value, onChange }) => {

    const error = !isValid && isTouched;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.files && e.target.files[0]);
    };

    return (
        <div className={`upload-field${error ? ' upload-field_error' : ''}`}>
            <input 
                id="upload-field-input"
                name={name}
                type="file" 
                accept="image/jpg, image/jpeg"
                className="visually-hidden"
                onChange={handleChange}
            />
            <label htmlFor="upload-field-input">
                <span>{value?.name || "Upload your photo"}</span>
            </label>
            <div className="upload-field__helper-text">{helperText}</div>
        </div>
    );
};