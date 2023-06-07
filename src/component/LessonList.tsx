import {useMediaQuery} from '@mui/material';
import {List, SimpleList, Datagrid, TextField, FunctionField} from 'react-admin';

export const LessonList = () => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.lesson_id}
                    secondaryText={(record) => record.description}
                    tertiaryText={(record) => record.status}
                />
            ) : (
                <Datagrid rowClick='edit'>
                    <TextField source='id' label='Id' emptyText='\'/>
                    <TextField source='description' label='描述' emptyText='\'/>
                    <TextField source='content' label='内容' emptyText='\'/>
                    <TextField source='cover' label='封面' emptyText='\'/>
                    <TextField source='difficulty_level' label='难度' emptyText='\'/>
                    <TextField source='duration' label='学习时长' emptyText='\'/>
                    <TextField source='created_at' label='创建时间' emptyText='\'/>
                    <TextField source='updated_at' label='更新时间' emptyText='\'/>
                    <FunctionField label='状态'
                                   render={(record: any) => {
                                       if (record.status === 'published') return '已发布'; else return '未发布';
                                   }}/>
                    <TextField source='prerequisites' label='前置课程' emptyText='\'/>
                    <TextField source='instructor' label='讲师' emptyText='\'/>
                    <TextField source='type' label='类型' emptyText='\'/>
                    <TextField source='tags' label='标签' emptyText='\'/>
                    <TextField source='rating' label='评分' emptyText='\'/>
                    <TextField source='views' label='查看次数' emptyText='\'/>
                    <FunctionField label='语言'
                                   render={(record: any) => {
                                       if (record.language === 'CN') return '中文'; else return '其它';
                                   }}/>
                </Datagrid>
            )}
        </List>
    );
};