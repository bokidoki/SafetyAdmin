import {useMediaQuery} from '@mui/material';
import {List, SimpleList, Datagrid, TextField} from 'react-admin';

export const KeyList = () => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.user_id}
                    secondaryText={(record) => record.user_id}
                />
            ) : (
                <Datagrid rowClick='edit'>
                    <TextField source='id' label='Id' emptyText='\'/>
                    <TextField source='user_id' label='用户Id' emptyText='\'/>
                    <TextField source='bdk' label='DUKPT BDK' emptyText='\'/>
                    <TextField source='count' label='协商次数' emptyText='\'/>
                    <TextField source='initial_key_id' label='DUKPT Key ID' emptyText='\'/>
                    <TextField source='created_at' label='创建时间' emptyText='\'/>
                    <TextField source='updated_at' label='更新时间' emptyText='\'/>
                </Datagrid>
            )}
        </List>
    );
};