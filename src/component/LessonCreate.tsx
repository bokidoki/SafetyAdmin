import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    required,
    ImageInput,
    ImageField,
    SelectInput,
    NumberInput
} from 'react-admin';
import {lessonStatusList, difficultLevel, languages} from '../constants/SelectData'

export const LessonCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput name='title' source='title' label='课程标题' validate={[required()]}/>
            <TextInput name='description' source='description' validate={[required()]} multiline={true}
                       label='课程描述'/>
            <TextInput name='content' source='content' label='课程内容' validate={[required()]}/>
            {/*<ImageInput name='cover' source='cover' label='课程封面'>*/}
            {/*    <ImageField source='src' title='title'/>*/}
            {/*</ImageInput>*/}
            <TextInput name='cover' source='cover' label='课程封面地址' validate={[required()]}/>
            <SelectInput label='课程难度等级' source="difficulty_level" choices={difficultLevel} name='difficulty_level'
                         validate={[required()]} defaultValue='1'/>
            <NumberInput name='duration' source='duration' label='课程时长' validate={[required()]}/>
            <SelectInput label='课程状态' source="status" choices={lessonStatusList} name='status'
                         validate={[required()]} defaultValue='draft'/>
            <TextInput name='instructor' source='instructor' label='讲师姓名'/>
            <SelectInput label='课程语言' source="language" choices={languages} name='language'
                         validate={[required()]} defaultValue='CN'/>
        </SimpleForm>
    </Create>
)