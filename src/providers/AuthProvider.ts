import {BASE_PATH, LOGIN_PATH} from '../constants/Paths'
import {LOCAL_STORAGE_KEY_TOKEN} from '../constants/KeyAlias'

export const AuthProvider = {
    // called when the user attempts to log in
    login: ({username, password}: { username: string, password: string }) => {
        const url = BASE_PATH + LOGIN_PATH;

        const request = new Request(url, {
            method: 'POST',
            body: JSON.stringify({userName: username, passwordSHA: password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        })

        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json()
            })
            .then((data) => {
                if (data.code !== 400200) {
                    throw new Error(data.message);
                }
                localStorage.setItem(LOCAL_STORAGE_KEY_TOKEN, data.data.token);
            })
            .catch(() => {
                throw new Error('Network err')
            })
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({status}: { status: number }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem(LOCAL_STORAGE_KEY_TOKEN);
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem(LOCAL_STORAGE_KEY_TOKEN)
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};