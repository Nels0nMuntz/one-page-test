import React from 'react';

import { PostForm } from 'models';


export const useForm = (initialValues: PostForm) => {
    const [formValues, setFormValues] = React.useState<PostForm>(initialValues);
};