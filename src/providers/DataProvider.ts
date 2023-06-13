import {fetchUtils} from "react-admin";
import {stringify} from "query-string";
import {BASE_PATH} from '../constants/Paths'
import {LOCAL_STORAGE_KEY_TOKEN} from '../constants/KeyAlias'

const apiUrl = '';
const httpClient = fetchUtils.fetchJson;

export const DataProvider = {
    // done
    getList: (resource: string, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;

        let query = {
            currentPage: page,
            pageSize: perPage,
            sort: field,
            order: order
        };

        if (Object.keys(params.filter).length !== 0) {
            query = Object.assign(query, {filter: JSON.stringify(params.filter)})
        }

        return commonListRequest(resource, query);
    },

    // done
    getOne: (resource: string, params: any) => {
        const query = {
            ids: [params.id],
        };

        return commonOneDataRequest(resource, query);
    },


    // done
    getMany: (resource: string, params: any) => {
        const query = {
            ids: params.ids,
        };
        return commonIdsList(resource, query)
    },

    // TODO
    getManyReference: (resource: string, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };

        return commonListRequest(resource, query)
    },

    // 更新单个条目
    update: (resource: string, params: any) => {
        const updateUrl = `${BASE_PATH}/${resource}/status/modify`

        const query = {
            id: params.data.id,
            status: params.data.status
        };

        const customHeader = new Headers({
            'Content-Type': 'application/json'
        });

        customHeader.set('Authorization', localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '')

        const request = new Request(updateUrl, {
            method: 'POST',
            body: JSON.stringify(query),
            headers: customHeader
        })

        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    if (response.status === 401) {
                        localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
                    }
                    throw new Error(response.statusText);
                }
                return response.json()
            })
            .then((data) => {
                if (data.code === 400500) throw new Error(data.message);
                const res = {
                    data: query
                }
                return Object.assign(data, res);
            })
            .catch((msg) => {
                throw new Error(msg);
            })
    },

    // TODO
    updateMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json}));
    },

    // DONE
    create: (resource: string, params: any) => {
        const createUrl = `${BASE_PATH}/${resource}/create`;
        const query = params.data;
        return commonRequest(createUrl, resource, query, handleCreateData);
    },

    // TODO
    delete: (resource: string, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({json}) => ({data: json})),

    // TODO
    deleteMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({json}) => ({data: json}));
    }
};

// 查询列表
function commonListRequest(resource: string, query: any) {
    const path = `${BASE_PATH}/${resource}/list`;
    return commonRequest(path, resource, query, handleCommonData);
}

// 查询详情
function commonOneDataRequest(resource: string, query: any) {
    const path = `${BASE_PATH}/${resource}/list/ids`;
    return commonRequest(path, resource, query, handleOneData);
}

// 通过ids查询列表
function commonIdsList(resource: string, query: any) {
    const path = `${BASE_PATH}/${resource}/list/ids`;
    return commonRequest(path, resource, query, handleIdsData);
}

// 通用请求
function commonRequest(path: string, resource: string, query: any, callback: (data: any, resource: string) => any) {
    const customHeader = new Headers({
        'Content-Type': 'application/json'
    });

    customHeader.set('Authorization', localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN) || '')

    const request = new Request(path, {
        method: 'POST',
        body: JSON.stringify(query),
        headers: customHeader
    })

    return fetch(request)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                if (response.status === 401) {
                    localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
                }
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then((data) => {
            return callback(data, resource);
        })
        .catch((msg) => {
            throw new Error(msg);
        })
}

// 处理列表数据
function handleCommonData(data: any, resource: string) {
    const isUser = resource === 'user';
    const isDevices = resource === 'device';
    const isLessons = resource === 'lesson';

    if (data.code !== 200) throw new Error(data.message);
    const result = data.data.records;
    const totalCount = data.data.total;
    return {
        data: isUser ? result.map((resource: any) => ({
            ...resource,
            id: resource.userId
        })) : isDevices ? result.map((resource: any) => ({
            ...resource,
            id: resource.deviceId
        })) : isLessons ? result.map((resource: any) => ({...resource, id: resource.lessonId})) : result,
        total: totalCount,
    }
}

// 处理通过ids查询的列表数据
function handleIdsData(data: any, resource: string) {
    const isUser = resource === 'user';
    const isDevices = resource === 'device';
    const isLessons = resource === 'lesson';

    if (data.code !== 200) throw new Error(data.message);
    const result = data.data;
    return {
        data: isUser ? result.map((resource: any) => ({
            ...resource,
            id: resource.userId
        })) : isDevices ? result.map((resource: any) => ({
            ...resource,
            id: resource.deviceId
        })) : isLessons ? result.map((resource: any) => ({...resource, id: resource.lessonId})) : result
    }
}

// 处理单个数据
function handleOneData(data: any, resource: string) {
    const isUser = resource === 'user';
    const isDevices = resource === 'device';
    const isLessons = resource === 'lesson';

    if (data.code !== 200) throw new Error(data.message);
    const result = data.data[0];
    return {
        data: isUser ? {...result, id: result.userId} : isDevices ? {
            ...result,
            id: result.deviceId
        } : isLessons ? {...result, id: result.lessonId} : result
    }
}

function handleCreateData(data: any, resource: string) {
    const isUser = resource === 'user';
    const isDevices = resource === 'device';
    const isLessons = resource === 'lesson';

    if (data.code === 400500) throw new Error(data.message);
    const result = data.data;
    return {
        data: isUser ? {...result, id: result.userId} : isDevices ? {
            ...result,
            id: result.deviceId
        } : isLessons ? {...result, id: result.lessonId} : result
    }
}