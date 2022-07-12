import React from 'react';
import { useFormik } from 'formik';

import { PostForm, PostFormRequired } from 'models';
import { useAppDispatch, useAppSelector } from 'hooks';
import { PostSection } from '../../components/PostSection/PostSection'
import { errorMessages as messages, regExpPatterns } from 'constants/index';
import { 
    getPositionsListThunk, 
    selectPositionsList, 
    selectSubmitStatus, 
    addUserThunk,
    setUsersSubmitStatusAction 
} from 'store/home';


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

    const dispatch = useAppDispatch()
    const positionsList = useAppSelector(selectPositionsList);
    const submitStatus = useAppSelector(selectSubmitStatus);
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
            dispatch(addUserThunk(values as PostFormRequired));
        },
    });   

    const getFieldProps = (field: keyof PostForm) => form.getFieldProps(field);
    const onChangeUploadField = (value: File | null) => {
        form.setFieldTouched('photo', true);
        form.setFieldValue('photo', value);
    };
    const onSubmit = form.handleSubmit;

    React.useEffect(() => {
        dispatch(getPositionsListThunk());
    }, []);

    return (
        <PostSection
            touched={form.touched}
            errors={form.errors}
            isValidForm={form.isValid && form.dirty}
            positionsList={positionsList}
            submitStatus={submitStatus}
            getFieldProps={getFieldProps}
            onChangeUploadField={onChangeUploadField}
            onSubmit={onSubmit}
        />
    );
};