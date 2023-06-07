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
                <Datagrid>
                    <FunctionField label='设备Id' render={(record: any) => {
                        if (record.id.length > 10) return record.id.slice(0, 10) + '...'; else return record.id;
                    }}/>
                    <ReferenceField source='user_id' reference='users' label='用户Id' />
                    <TextField source='platform' label='平台'/>
                    <TextField source='platform_version' label='平台版本'/>
                    <TextField source='security_patch' label='系统安全补丁'/>
                    <TextField source='manufacturer_name' label='厂商名称'/>
                    <TextField source='model_name' label='设备型号'/>
                    <TextField source='cpu' emptyText='\'/>
                    <TextField source='gpu' emptyText='\'/>
                    <TextField source='memory' label='内存大小' emptyText='\'/>
                    <TextField source='package_name' label='应用包名'/>
                    <TextField source='version_code' label='版本号'/>
                    <TextField source='version_name' label='版本名称'/>
                    <TextField source='upload_time' label='上传时间'/>
                    <FunctionField label='设备状态' render={(record: any) => {
                        if (record.status === 'active') return '激活'; else return '锁定'
                    }}/>
                </Datagrid>
            )}
        </List>
    );
};