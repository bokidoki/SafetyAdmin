import {fetchUtils} from "react-admin";
import {stringify} from "query-string";

const apiUrl = 'https://my-json-server.typicode.com/bokidoki/fake_api/';
const httpClient = fetchUtils.fetchJson;

// TypeScript users must reference the type `DataProvider`
export const DataProvider = {
    getList: (resource: string, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        const isUser = resource === 'users';
        const isDevices = resource === 'devices';
        const isLessons = resource === 'lessons';

        return httpClient(url).then(({headers, json}) => ({
            data: isUser ? json.map((resource: any) => ({
                ...resource,
                id: resource.user_id
            })) : isDevices ? json.map((resource: any) => ({
                ...resource,
                id: resource.device_id
            })) : isLessons ? json.map((resource: any) => ({...resource, id: resource.lesson_id})) : json,
            total: 1,
        }));
    },

    getOne: (resource: string, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({json}) => ({
            data: json,
        })),

    getMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const isUser = resource === 'users';
        const isDevices = resource === 'devices';
        const isLessons = resource === 'lessons';
        return httpClient(url).then(({json}) => ({
            data: isUser ? json.map((resource: any) => ({
                ...resource,
                id: resource.user_id
            })) : isDevices ? json.map((resource: any) => ({
                ...resource,
                id: resource.device_id
            })) : isLessons ? json.map((resource: any) => ({...resource, id: resource.lesson_id})) : json,

        }));
    },

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
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({headers, json}) => ({
            data: json,
            total: parseInt((headers.get('content-range') || "0").split('/').pop() || "0", 10),
        }));
    },

    update: (resource: string, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json})),

    updateMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({data: json}));
    },

    create: (resource: string, params: any) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({json}) => ({
            data: {...params.data, id: json.id},
        })),

    delete: (resource: string, params: any) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({json}) => ({data: json})),

    deleteMany: (resource: string, params: any) => {
        const query = {
            filter: JSON.stringify({id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({json}) => ({data: json}));
    }
};