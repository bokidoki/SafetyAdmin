import * as React from 'react';
import {Edit, SimpleForm, TextInput, required, SelectInput} from 'react-admin';

const statusList = [
    {id: 'active', name: '激活'},
    {id: 'disable', name: '禁用'},
    {id: 'deleted', name: '删除（删除之后不可见）'},
];

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label='用户Id' source='id'/>
            <TextInput label='用户邮箱' source='email' disabled/>
            <TextInput label='用户姓名' source='username' disabled/>
            <SelectInput source='status' choices={statusList} validate={required()}/>
        </SimpleForm>
    </Edit>
);