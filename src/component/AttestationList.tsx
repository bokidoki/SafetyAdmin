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
                    <TextField source='id' label='Id' emptyText='\'/>
                    <TextField source='is_debuggable' label='可调式' emptyText='\'/>
                    <EmailField source='find_frida' label='frida' emptyText='\'/>
                    <TextField source='find_xposed' label='xposed' emptyText='\'/>
                    <TextField source='check_maps' label='映射表' emptyText='\'/>
                    <TextField source='build_tags' label='构造标签' emptyText='\'/>
                    <TextField source='ro_debuggable' label='magisk' emptyText='\'/>
                    <TextField source='ro_boot_verifiedboot_state' label='magisk' emptyText='\'/>
                    <TextField source='app_signature' label='应用签名' emptyText='\'/>
                    <FunctionField label='设备Id' render={(record: any) => {
                        if (record.device_id.length > 10) return record.device_id.slice(0, 10) + '...'; else return record.device_id;
                    }}/>
                    <TextField source='created_at' label='创建时间' emptyText='\'/>
                    <TextField source='updated_at' label='更新时间' emptyText='\'/>
                </Datagrid>
            )}
        </List>
    );
};