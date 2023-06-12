import * as React from 'react';
import {Edit, required, SelectInput, SimpleForm, TextInput} from "react-admin";

const lessonStatusList = [
    {id: 'draft', name: '草稿'},
    {id: 'published', name: '发布'},
    {id: 'archived', name: '归档'},
];

export const LessonEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label='课程Id' source='id'/>
            <TextInput disabled label='标题' source='title'/>
            <TextInput disabled label='描述' source='description'/>
            <SelectInput source='status' choices={lessonStatusList} validate={required()}/>
        </SimpleForm>
    </Edit>
)
