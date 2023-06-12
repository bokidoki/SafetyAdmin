import * as React from 'react';
import {Edit, required, SelectInput, SimpleForm, TextInput} from "react-admin";

const deviceStatusList = [
    {id: 'active', name: '激活'},
    {id: 'blocked', name: '禁用'},
    {id: 'suspend', name: '挂起'},
];
export const DeviceEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label='设备Id' source='id'/>
            <TextInput disabled label='应用包名' source='packageName'/>
            <TextInput disabled label='上传时间' source='uploadTime'/>
            <SelectInput source='status' choices={deviceStatusList} validate={required()}/>
        </SimpleForm>
    </Edit>
)