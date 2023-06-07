import {useMediaQuery} from '@mui/material';
import {List, SimpleList, Datagrid, TextField, EmailField, useRecordContext, FunctionField} from 'react-admin';

export const UserList = () => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.id}
                    secondaryText={(record) => record.email}
                    tertiaryText={(record) => record.username}
                />
            ) : (
                <Datagrid>
                    <TextField source='id' label='用户id'/>
                    <EmailField source='email' label='电子邮箱'/>
                    <TextField source='username' label='用户名称'/>
                    <TextField source='last_login_time' label='最后登录时间'/>
                    <TextField source='registration_time' label='注册时间'/>
                    <FunctionField label='用户状态'
                                   render={(record: any) => {
                                       if (record.status === 'active') return '激活'; else return '锁定'
                                   }}/>
                </Datagrid>
            )}
        </List>
    );
};