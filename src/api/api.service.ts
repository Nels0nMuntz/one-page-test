import { ResponseBaseModel } from 'models';

const config = {
    api: 'https://frontend-test-assignment-api.abz.agency/api/v1',
    options: {
        headers: { 'content-type': 'application/json' },
    },
};

const httpGet = <T extends ResponseBaseModel>(endpoint: string) => {
    return fetch(`${config.api}${endpoint}`, {    
        ...config.options,
    })
        .then(response => handleResponse(response))
        .then(data => data as T)
        .catch(error => {
            console.log({error});
            throw Error(error);
        })
};

const handleResponse = (response: Response) => {
    if (response.status === 200) {
        return response.json();
    } else {
        console.log({response});
        throw Error("Something went wrong");
    }
};

export default { httpGet };