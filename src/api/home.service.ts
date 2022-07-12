import { GetUserListRequestModel } from 'models';


const config = {
    api: 'https://frontend-test-assignment-api.abz.agency/api/v1',
    options: {
        headers: { 'content-type': 'application/json' },
    },
};

const getUserList = async (data: GetUserListRequestModel) => {
    return await fetch(`${config.api}/users?page=${data.page}&count=${data.count}`, { ...config.options });
};

const getPositionsList = async () => {
    return await fetch(`${config.api}/positions`, { ...config.options });
};

const getToken = async () => {
    return await fetch(`${config.api}/token`, { ...config.options });
};

const addUser = async (data: FormData, token: string) => {
    return await fetch(
        `${config.api}/users`, 
        {
            method: 'POST',
            body: data,
            headers: {
                'Token': token,
            }
        }
    );
};

export default { getUserList, getPositionsList, getToken, addUser };