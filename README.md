#使用方法

[本项目demo](http://autoform-ws.meteor.com)

[官方demo参考资料](http://autoform.meteor.com/)

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
#####或者在schema中定义样式
```meteor
summary: {
  type: String,
  optional: true,
  max: 2000,
  autoform: {
    afFieldInput: {
      type: "textarea",
      rows: 10,
      class: "foo"
    }
  }
}
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
#如果form表单在服务器没有对应的collection
1.In client+server code, create a SimpleSchema instance to define the form's schema.
2.Use the SimpleSchema instance as the schema attribute of autoForm or quickForm.
3.Set up the form to be submitted properly. There are three ways to handle this:
    *Define an onSubmit hook for the form. Put your logic in that function and have it return false to prevent normal form submission.
    *Add normal form attributes like action and let the form do a normal browser POST after being validated.
    *Define a server method that does something with the form data. On your autoForm or quickForm set type="method" and meteormethod="yourServerMethodName".

###例子 common.js
```meteor
Schema = {};
Schema.contact = new SimpleSchema({
    name: {
        type: String,
        label: "Your name",
        max: 50
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address"
    },
    message: {
        type: String,
        label: "Message",
        max: 1000
    }
});
```

html
```meteor
<template name="contactForm">
  {{#autoForm schema=contactFormSchema id="contactForm" type="method" meteormethod="sendEmail"}}
  <fieldset>
    <legend>Contact Us</legend>
    {{> afQuickField name="name"}}
    {{> afQuickField name="email"}}
    {{> afQuickField name="message" rows=10}}
    <div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-default">Reset</button>
    </div>
  </fieldset>
  {{/autoForm}}
</template>
```

client.js
```meteor
Template.contactForm.helpers({
  contactFormSchema: function() {
    return Schema.contact;
  }
});
```

server.js
```meteor
Meteor.methods({
  sendEmail: function(doc) {
    // Important server-side check for security and data integrity
    check(doc, Schema.contact);

    // Build the e-mail text
    var text = "Name: " + doc.name + "\n\n"
            + "Email: " + doc.email + "\n\n\n\n"
            + doc.message;

    this.unblock();

    // Send the e-mail
    Email.send({
        to: "test@example.com",
        from: doc.email,
        subject: "Website Contact Form - Message From " + doc.name,
        text: text
    });
  }
});
```

##任何时候获得表单的值（Getting Current Field Values）
* You can get the current values of all fields on a form at any time by passing the form id
 to AutoForm.getFormValues. This method is not reactive. The form must be
 currently rendered for this to work.
* You can get the current value of a specific field on a specific form by passing the field name to AutoForm.getFieldValue. This method is reactive so it can be used in place of the built-in afFieldValueIs helper to show pieces of a form based on
   custom criteria about the values of other fields on the form. If using outside of the autoForm, pass the formId as the second argument.

##回调（Callbacks/Hooks）
1 To add client-side hooks and callbacks for a form, use the AutoForm.hooks or AutoForm.addHooks method. The syntax for AutoForm.hooks is
```meteor
AutoForm.hooks({
  myFormId: hooksObject
});
```
2 If you want to add the same hook for multiple forms or for all forms, use the
  AutoForm.addHooks method instead:
```meteor
  // Pass an array of form IDs for multiple forms
  AutoForm.addHooks(['form1', 'form2', 'form3', 'form4'], hooksObject);

  // Or pass `null` to run the hook for all forms in the app (global hook)
  AutoForm.addHooks(null, hooksObject);

  // Pass `true` as optional third argument to replace all existing hooks of the same type
  AutoForm.addHooks('form1', hooksObject, true);
```

### 修改 字段验证不合法提示 参考github地址
`github: https://github.com/aldeed/meteor-simple-schema#customizing-validation-messages`


