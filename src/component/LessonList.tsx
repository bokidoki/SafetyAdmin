import {useMediaQuery} from '@mui/material';
import {List, SimpleList, Datagrid, TextField, FunctionField, ImageField} from 'react-admin';

export const LessonList = () => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <>
            <List>
                {isSmall ? (
                    <SimpleList
                        primaryText={(record) => record.lesson_id}
                        secondaryText={(record) => record.title}
                        tertiaryText={(record) => record.description}
                    />
                ) : (
                    <Datagrid rowClick='edit'>
                        <TextField source='id' label='Id' emptyText='无'/>
                        <TextField source='title' label='标题' emptyText='无' sortable={false}/>
                        <TextField source='description' label='描述' emptyText='无' sortable={false}/>
                        <TextField source='content' label='内容' emptyText='无' sortable={false}/>
                        <ImageField source='cover' src='cover' title='课程封面' label='封面' sortable={false} emptyText='无'/>
                        {/*<TextField source='cover' label='封面' emptyText='无' sortable={false}/>*/}
                        <TextField source='difficultyLevel' label='难度' emptyText='无'/>
                        <TextField source='duration' label='学习时长' emptyText='无'/>
                        <TextField source='createdAt' label='创建时间' emptyText='无'/>
                        <TextField source='updatedAt' label='更新时间' emptyText='无'/>
                        <FunctionField label='状态' sortable={false}
                                       render={(record: any) => {
                                           if (record.status === 'published') return '已发布'; else if (record.status === 'draft') return '草稿'; else return '归档'
                                       }}/>
                        <TextField source='prerequisites' label='前置课程' emptyText='无' sortable={false}/>
                        <TextField source='instructor' label='讲师' emptyText='无' sortable={false}/>
                        <TextField source='type' label='类型' emptyText='无' sortable={false}/>
                        <TextField source='tags' label='标签' emptyText='无' sortable={false}/>
                        <TextField source='rating' label='评分' emptyText='无'/>
                        <TextField source='views' label='查看次数' emptyText='无'/>
                        <FunctionField label='语言' sortable={false}
                                       render={(record: any) => {
                                           if (record.language === 'CN') return '中文'; else return '其它';
                                       }}/>
                    </Datagrid>
                )}
            </List>
        </>
    );
};