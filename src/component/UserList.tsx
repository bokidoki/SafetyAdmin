import {useMediaQuery} from '@mui/material';
import {List, SimpleList, Datagrid, TextField, EmailField, FunctionField} from 'react-admin';

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
                <Datagrid rowClick="edit">
                    <TextField source='id' label='用户id'/>
                    <EmailField source='email' label='电子邮箱' sortable={false}/>
                    <TextField source='username' label='用户名称' sortable={false}/>
                    <TextField source='lastLoginTime' label='最后登录时间' emptyText='null'/>
                    <TextField source='registrationTime' label='注册时间'/>
                    <FunctionField label='用户状态' sortable={false}
                                   render={(record: any) => {
                                       if (record.status === 'active') return '激活'; else if (record.status === 'disable') return '禁用'; else return '已删除'
                                   }}/>
                </Datagrid>
            )}
        </List>
    );
};