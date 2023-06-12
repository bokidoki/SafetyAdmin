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
                    <TextField source='id' label='Id' emptyText='无'/>
                    <TextField source='userId' label='用户Id' emptyText='无'/>
                    <TextField source='bdk' label='BDK' emptyText='无' sortable={false}/>
                    <TextField source='count' label='DUKPT协商次数' emptyText='无' sortable={false}/>
                    <TextField source='initialKeyId' label='DUKPT Key ID' emptyText='无' sortable={false}/>
                    <TextField source='createdAt' label='创建时间' emptyText='无'/>
                    <TextField source='updatedAt' label='更新时间' emptyText='无'/>
                </Datagrid>
            )}
        </List>
    );
};