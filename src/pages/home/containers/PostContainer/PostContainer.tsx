import React from 'react';
import { useFormik } from 'formik';

import { PostSection } from '../../components/PostSection/PostSection'
import { PostForm } from 'models';


const messages = {
    empty: "Field is required",
    name: { 
        length: "Name should contain 2-60 characters"
    },
    email: {
        error: "E-mail is incorrect",
        length: "E-mail should contain 2-100 characters"
    },
    phone: {
        error: 'Phone nummber should contain 18 characters',
        length: 'Phone nummber is incorrect',
    },
    photo: {
        type: 'Invalid file type',
        size: 'File is too large',
        resolution: 'Image resolution should be at least 70x70px',
    }
};

const regExpPatterns = {
    email: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    phone: /[\+]{0,1}380([0-9]{9})$/,
};

const validate = (values: PostForm) => {
    const { name, email, phone, photo } = values;
    const errors: Partial<{[K in keyof PostForm]: string}> = {};

    if(!name) errors.name = messages.empty;
    else if(name.length < 2 || name.length > 60) errors.name = messages.name.length;
    
    if(!email) errors.email = messages.empty;
    else if(!regExpPatterns.email.test(email)) errors.email = messages.email.error;
    else if(email.length < 2 || email.length > 100) errors.email = messages.email.length;

    if(!phone) errors.phone = messages.empty;
    else if(!regExpPatterns.phone.test(phone)) errors.phone = messages.phone.error;

    if(!photo) {
        errors.photo = messages.empty;
    } else {
        if(!['image/jpeg', 'image/jpg'].includes(photo.type)){
            errors.photo = messages.photo.type;
        } else if(photo.size > 5e6) {
            errors.photo = messages.photo.size;
        } else {
            const image = new Image();
            const url = URL.createObjectURL(photo);
            image.onload = function(){
                const result = this as HTMLImageElement;
                if(result.width < 70 || result.height < 70) {
                    errors.photo = messages.photo.resolution;
                };
                URL.revokeObjectURL(url);       
            };
            image.src = url;
        };
    };    

    return errors;
};

export const PostContainer = () => {

    const form = useFormik<PostForm>({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            position_id: 1,
            photo: null,
        },
        validate: validate,
        onSubmit: values => {
            console.log({values})
        }
    });   

    const getFieldProps = (field: keyof PostForm) => form.getFieldProps(field);
    const onChangeUploadField = (value: File | null) => {
        form.setFieldTouched('photo', true);
        form.setFieldValue('photo', value);
    };
    const onSubmit = form.handleSubmit;

    return (
        <PostSection
            touched={form.touched}
            errors={form.errors}
            isValidForm={form.isValid && form.dirty}
            getFieldProps={getFieldProps}
            onChangeUploadField={onChangeUploadField}
            onSubmit={onSubmit}
        />
    );
};