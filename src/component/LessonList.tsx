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
                    <TextField source='id' label='Id' emptyText='无'/>
                    <TextField source='description' label='描述' emptyText='无'/>
                    <TextField source='content' label='内容' emptyText='无'/>
                    <TextField source='cover' label='封面' emptyText='无'/>
                    <TextField source='difficulty_level' label='难度' emptyText='无'/>
                    <TextField source='duration' label='学习时长' emptyText='无'/>
                    <TextField source='createdAt' label='创建时间' emptyText='无'/>
                    <TextField source='updatedAt' label='更新时间' emptyText='无'/>
                    <FunctionField label='状态'
                                   render={(record: any) => {
                                       if (record.status === 'published') return '已发布'; else return '未发布';
                                   }}/>
                    <TextField source='prerequisites' label='前置课程' emptyText='无'/>
                    <TextField source='instructor' label='讲师' emptyText='无'/>
                    <TextField source='type' label='类型' emptyText='无'/>
                    <TextField source='tags' label='标签' emptyText='无'/>
                    <TextField source='rating' label='评分' emptyText='无'/>
                    <TextField source='views' label='查看次数' emptyText='无'/>
                    <FunctionField label='语言'
                                   render={(record: any) => {
                                       if (record.language === 'CN') return '中文'; else return '其它';
                                   }}/>
                </Datagrid>
            )}
        </List>
    );
};