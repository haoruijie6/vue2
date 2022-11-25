import request from '@/utils/request'

//Get请求
export async function getData(url, query) {
    return request({
        url: url,
        method: 'get',
        params: query
    });
}

//Post请求
export async function postData(url, data) {
    return request({
        url: url,
        method: 'post',
        data: data
    });
}

//Put请求
export async function putData(url, data) {
    return request({
        url: url,
        method: 'put',
        data: data
    });
}

//Delete请求
export async function deleteData(url, query) {
    return request({
        url: url,
        method: 'delete',
        params: query
    });
}
