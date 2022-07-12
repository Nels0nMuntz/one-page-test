export const errorMessages = {
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