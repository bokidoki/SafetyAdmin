import {useMediaQuery} from '@mui/material';
import {List, SimpleList, Datagrid, TextField, ReferenceField, FunctionField} from 'react-admin';

export const DeviceList = () => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.device_id}
                    secondaryText={(record) => record.user_id}
                    tertiaryText={(record) => record.status}
                />
            ) : (
                <Datagrid rowClick="edit">
                    <FunctionField label='设备Id' render={(record: any) => {
                        if (record.id.length > 10) return record.id.slice(0, 10) + '...'; else return record.id;
                    }}/>
                    <ReferenceField source='userId' reference='user' label='用户Id'/>
                    <TextField source='platform' label='平台' sortable={false}/>
                    <TextField source='platformVersion' label='平台版本' emptyText='无' sortable={false}/>
                    <TextField source='securityPatch' label='系统安全补丁' emptyText='无' sortable={false}/>
                    <TextField source='manufacturer_name' label='厂商名称' emptyText='无' sortable={false}/>
                    <TextField source='manufacturerName' label='设备型号' emptyText='无' sortable={false}/>
                    <TextField source='cpu' emptyText='无' sortable={false}/>
                    <TextField source='gpu' emptyText='无' sortable={false}/>
                    <TextField source='memory' label='内存大小' emptyText='无' sortable={false}/>
                    <TextField source='packageName' label='应用包名' emptyText='无' sortable={false}/>
                    <TextField source='versionCode' label='版本号' emptyText='无' sortable={false}/>
                    <TextField source='versionName' label='版本名称' emptyText='无' sortable={false}/>
                    <TextField source='uploadTime' label='上传时间' emptyText='无'/>
                    <FunctionField label='设备状态' render={(record: any) => {
                        if (record.status === 'active') return '激活'; else if (record.status === 'blocked') return '禁用'; else return '挂起'
                    }}/>
                </Datagrid>
            )}
        </List>
    );
};