import axios from 'axios';
import { configConstants } from '../_constants';
import { clearStorage } from './clearStorage';
import $ from 'jquery';
import { isEmpty } from 'lodash';
function apiCaller(endpoint: any, method = 'GET', body = {}, headers = {}, clearToken = true, showLoading = true, basUrl = configConstants.API_URL) {
    if (isEmpty(headers)) {
        if (localStorage.getItem('Authorization')) {
            headers = {
                'Authorization': localStorage.getItem('Authorization')
            }
        }
    }
    if (showLoading) {
        $('#loading').removeClass('hide');
    }
    return axios({
        method,
        timeout: configConstants.API_TIMEOUT,
        url: `${basUrl}${endpoint}`,
        data: body,
        headers: headers
    } as any).then(handleResponse).catch((error) => {
        $('#loading').addClass('hide');
        if (error && error.response) {
            // handle auto remove token + logout when token expired
            if (clearToken && error.response.status === 401) {
                clearStorage();
            } else {
                let msg = 'Server Error';
                if (error.response.data.errorMessage) {
                    msg = error.response.data.errorMessage;
                }
                return Promise.reject(msg);
            }
        } else {
            if (typeof error === 'string' || error instanceof String) {
                return Promise.reject(error);
            } else {
                return Promise.reject('Server Error');
            }

        }
    });
}


function handleResponse(response: any) {
    $('#loading').addClass('hide');
    if (!response.data.status) {
        let msg = response.data.errorMessage ? response.data.errorMessage : 'Server Error'
        return Promise.reject(msg);
    } else {
        return response.data;
    }
}

export {
    apiCaller
}