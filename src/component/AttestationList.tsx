import {useMediaQuery} from '@mui/material';
import {List, SimpleList, Datagrid, TextField, EmailField, FunctionField} from 'react-admin';

export const AttestationList = () => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.id}
                    secondaryText={(record) => record.created_at}
                />
            ) : (
                <Datagrid rowClick='edit'>
                    <TextField source='id' label='Id' emptyText='无'/>
                    <TextField source='isDebuggable' label='可调式' emptyText='无' sortable={false}/>
                    <TextField source='findFrida' label='frida' emptyText='无' sortable={false}/>
                    <TextField source='findXposed' label='xposed' emptyText='无' sortable={false}/>
                    <TextField source='checkMaps' label='映射表' emptyText='无' sortable={false}/>
                    <TextField source='buildTags' label='构造标签' emptyText='无' sortable={false}/>
                    <TextField source='roDebuggable' label='magisk' emptyText='无' sortable={false}/>
                    <TextField source='roBootVerifiedbootState' label='magisk' emptyText='无' sortable={false}/>
                    <TextField source='appSignature' label='应用签名' emptyText='无' sortable={false}/>
                    <FunctionField label='设备Id' render={(record: any) => {
                        if (record.deviceId.length > 10) return record.deviceId.slice(0, 10) + '...'; else return record.deviceId;
                    }}/>
                    <TextField source='createdAt' label='创建时间' emptyText='无'/>
                    <TextField source='updatedAt' label='更新时间' emptyText='无'/>
                </Datagrid>
            )}
        </List>
    );
};