import axios from 'axios';

export const AxiosCall = async (url: string, method: string): Promise<void> => {
    const config = {
        method: method,
        url: `${url}`,
    };
    const { data } = await axios(config);
    return data;
}