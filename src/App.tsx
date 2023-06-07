import React from 'react';
import './App.css';
import {DataProvider} from './providers/DataProvider';

import {Admin, Resource} from 'react-admin';
import {AuthProvider} from "./providers/AuthProvider";
import {Dashboard, UserList, DeviceList, KeyList, LessonList, AttestationList} from "./component";
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
        <Admin authProvider={AuthProvider} dataProvider={DataProvider} dashboard={Dashboard}
               i18nProvider={i18nProvider}>
            <Resource name="users" list={UserList} icon={UserIcon} options={{label: translate('用户')}}/>
            <Resource name="devices" list={DeviceList} icon={DevicesIcon} options={{label: '设备'}}/>
            <Resource name="lessons" list={LessonList} icon={BookIcon} options={{label: '课程'}}/>
            <Resource name="attestation" list={AttestationList} icon={PreviewIcon} options={{label: '认证'}}/>
            <Resource name="keys" list={KeyList} icon={KeyIcon} options={{label: '密钥'}}/>
        </Admin>
    );
}

export default App;
