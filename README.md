#使用方法

[demo](http://autoform-ws.meteor.com)

[官方demo参考](http://autoform.meteor.com/)

##添加package
```meteor
meteor add aldeed:autoform
meteor add aldeed:collection2
```

##定义schema

```meteor
Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author"
  },
  copies: {
    type: Number,
    label: "Number of copies",
    min: 0
  },
  lastCheckedOut: {
    type: Date,
    label: "Last date this book was checked out",
    optional: true
  },
  summary: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 1000
  },
   cost: {
       type: Number,
       label: "价格",
       min: 1
   }
}));
```

###insertBook

```meteor
<template name="insertBookForm">
  {{> quickForm collection="Books" id="insertBookForm" type="insert"}}
</template>
```
或 自定义提交按钮
```meteor
<template name="InsertBook4">
    {{#autoForm id="insertBookForm4" type='insert' collection="Books"}}
        {{> afQuickFields}}
        <div>
            <button type="submit">提交</button>
        </div>
    {{/autoForm}}
</template>
```
or 自定义label 和 field颜色样式
```meteor
<template name="InsertBook5">
    {{#autoForm id="insertBookForm5" type='insert' collection="Books"}}
        {{#each afFieldNames}}
            {{> afQuickField name=this.name style="color: orange" label-style="color: green"}}
        {{/each}}
        <div>
            <button type="submit">提交</button>
        </div>
    {{/autoForm}}
</template>
```
or 自定义表单字段顺序
```meteor
<template name="insertBookForm">
  {{#autoForm collection="Books" id="insertBookForm" type="insert"}}
    <fieldset>
      <legend>Add a Book</legend>
      {{> afQuickField name='title'}}
      {{> afQuickField name='author'}}
      {{> afQuickField name='summary' rows=6}}
      {{> afQuickField name='cost'}}
      {{> afQuickField name='copies'}}
      {{> afQuickField name='lastCheckedOut'}}
    </fieldset>
    <button type="submit" class="btn btn-primary">Insert</button>
  {{/autoForm}}
</template>
```
or 自定义样式 （修改cost价格表样式为例）
```meteor
<template name="InsertBook3">
    {{#autoForm collection="Books" id="insertBookForm" type="insert"}}
        <fieldset>
            <legend>添加一本书</legend>
            {{> afQuickField name='title'}}
            {{> afQuickField name='author'}}
            {{> afQuickField name='summary' rows=6}}
            {{> afQuickField name='copies'}}
            {{> afQuickField name='lastCheckedOut'}}
            <div class="form-group{{#if afFieldIsInvalid name='cost'}} has-error{{/if}}">
                <div class="input-group">
                    <span class="input-group-addon">$</span>
                    {{> afFieldInput name='cost'}}
                    <span class="input-group-addon">/each</span>
                </div>
                {{#if afFieldIsInvalid name='cost'}}
                    <span class="help-block">{{afFieldMessage name='cost'}}</span>
                {{/if}}
            </div>
        </fieldset>
        <button type="submit" class="btn btn-primary">Insert</button>
    {{/autoForm}}
</template>
```

***
####afQuickField Examples
```meteor
{{> afQuickField name='firstField' autofocus=''}}
{{> afQuickField name='weirdColors' style="color: orange" label-style="color: green"}}
{{> afQuickField name="longString" rows="5"}}
{{> afQuickField name="radioBoolean" type="boolean-radios" trueLabel="Yes" falseLabel="No"}}
{{> afQuickField name="selectBoolean" type="boolean-select" trueLabel="Yes" falseLabel="No"}}
{{> afQuickField name="optionsButNoSelect" options=numSelectOptions noselect="true"}}
{{> afQuickField name="firstOptionSelect" firstOption="(Select Something)" options=numSelectOptions}}
{{> afQuickField name="decimal" step="0.01"}}
```


*** 
### 修改 字段验证不合法提示 参考github地址
`github: https://github.com/aldeed/meteor-simple-schema#customizing-validation-messages`


