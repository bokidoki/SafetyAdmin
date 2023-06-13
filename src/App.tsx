import React from 'react';
import './App.css';
import {DataProvider} from './providers/DataProvider';

import {Admin, Resource} from 'react-admin';
import {AuthProvider} from "./providers/AuthProvider";
import {
    UserList,
    DeviceList,
    KeyList,
    LessonList,
    AttestationList,
    UserEdit,
    DeviceEdit,
    LessonEdit,
    LessonCreate
} from "./component";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import chineseMessages from '@haxqer/ra-language-chinese';
import {useTranslate} from 'react-admin';
import UserIcon from "@mui/icons-material/Group";
import DevicesIcon from '@mui/icons-material/Devices';
import BookIcon from '@mui/icons-material/Book';
import PreviewIcon from '@mui/icons-material/Preview';
import KeyIcon from '@mui/icons-material/Key';

const i18nProvider = polyglotI18nProvider(() => chineseMessages, 'zh');

function App() {
    const translate = useTranslate();
    return (
        <Admin authProvider={AuthProvider} dataProvider={DataProvider} i18nProvider={i18nProvider}>
            <Resource name="user" list={UserList} icon={UserIcon} options={{label: translate('用户')}} edit={UserEdit}/>
            <Resource name="device" list={DeviceList} icon={DevicesIcon} options={{label: '设备'}} edit={DeviceEdit}/>
            <Resource name="lesson" list={LessonList} icon={BookIcon} options={{label: '课程'}} edit={LessonEdit}
                      create={LessonCreate}/>
            <Resource name="attestation" list={AttestationList} icon={PreviewIcon} options={{label: '认证'}}/>
            <Resource name="key" list={KeyList} icon={KeyIcon} options={{label: '密钥'}}/>
        </Admin>
    );
}

export default App;
