import axios from 'axios';

export const AxiosCall = async (url: string, method: string, cancelToken: any) => {
    if (!navigator.onLine) {
        return Promise.reject().then(err => {//
            // ToastMessage("Unable to connect with internet", "warning", "top-center")
            return err;
        }
        );
    }
    try {
        const config = {
            method: method,
            url: `${url}`,
            cancelToken: cancelToken.token
        };
        const { data } = await axios(config);
        return data;
    } catch (error) {
        return error;
    }

}