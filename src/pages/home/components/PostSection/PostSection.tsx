import React from 'react';
import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio, { RadioProps } from '@mui/material/Radio';
import { styled } from '@mui/material/styles';

import { Heading, TextField, UploadField, Button } from 'components';
import { PostForm } from 'models';

import './PostSection.scss';


const RadioIcon = () => (
    <span className="radio-icon"></span>
);

const RadioIconChecked = () => (
    <span className="radio-icon radio-icon_checked"></span>
)

function CustomRadio(props: RadioProps) {
    return (
        <Radio
            icon={<RadioIcon />}
            checkedIcon={<RadioIconChecked />}
            {...props}
        />
    );
}

interface PostSectionProps {
    touched: FormikTouched<PostForm>;
    errors: FormikErrors<PostForm>;
    isValidForm: boolean;
    getFieldProps: (field: keyof PostForm) => FieldInputProps<any>;
    onChangeUploadField: (value: File | null) => void;
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
};

export const PostSection: React.FC<PostSectionProps> = ({ touched, errors, isValidForm, getFieldProps, onChangeUploadField, onSubmit }) => {

    return (
        <section className="post page-section">
            <div className="container">
                {true ? (
                    <React.Fragment>
                        <Heading variant="h2">Working with POST request</Heading>
                        <form action="#" className="post-form" onSubmit={onSubmit}>
                            <div className="post-form__field post-form__field_text">
                                <TextField
                                    label="Your name"
                                    isValid={errors.name ? false : true}
                                    isTouched={touched.name ? true : false}
                                    helperText={touched.name && errors.name ? errors.name : ' '}
                                    {...getFieldProps("name")}
                                />
                            </div>
                            <div className="post-form__field post-form__field_text">
                                <TextField
                                    label="Email"
                                    isValid={errors.email ? false : true}
                                    isTouched={touched.email ? true : false}
                                    helperText={touched.email && errors.email ? errors.email : ' '}
                                    {...getFieldProps("email")}
                                />
                            </div>
                            <div className="post-form__field post-form__field_text">
                                <TextField
                                    label="Phone"
                                    isValid={errors.phone ? false : true}
                                    isTouched={touched.phone ? true : false}
                                    helperText={touched.phone && errors.phone ? errors.phone : '+38 (XXX) XXX - XX - XX'}
                                    {...getFieldProps("phone")}
                                />
                            </div>
                            <div className="post-form__field post-form__field_radio">
                                <FormControl>
                                    <FormLabel id="position-radio-buttons-group">Select your position</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="position-radio-buttons-group"
                                        {...getFieldProps("position_id")}
                                    >
                                        <FormControlLabel value={1} control={<CustomRadio />} label="Frontend developer" />
                                        <FormControlLabel value={2} control={<CustomRadio />} label="Backend developer" />
                                        <FormControlLabel value={3} control={<CustomRadio />} label="Designer" />
                                        <FormControlLabel value={4} control={<CustomRadio />} label="QA" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className="post-form__field post-form__field_upload">
                                <UploadField
                                    name={getFieldProps("photo").name}
                                    value={getFieldProps("photo").value}
                                    isValid={errors.photo ? false : true}
                                    isTouched={touched.photo ? true : false}
                                    helperText={touched.photo && errors.photo ? errors.photo : ' '}
                                    onChange={onChangeUploadField}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={!isValidForm}
                            >
                                Sign up
                            </Button>
                        </form>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Heading variant="h2">User successfully registered</Heading>
                        <div className="post__success"></div>
                    </React.Fragment>
                )}
            </div>
        </section>
    );
};