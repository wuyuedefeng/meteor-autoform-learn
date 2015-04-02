#使用方法

##添加package
```
meteor add aldeed:autoform
meteor add aldeed:collection2
```

##定义schema

```books.js
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
  }
}));
```

###insertBook

```
<template name="insertBookForm">
  {{> quickForm collection="Books" id="insertBookForm" type="insert"}}
</template>
```
or
```
<template name="insertBookForm">
  {{#autoForm collection="Books" id="insertBookForm" type="insert"}}
    <fieldset>
      <legend>Add a Book</legend>
      {{> afQuickField name='title'}}
      {{> afQuickField name='author'}}
      {{> afQuickField name='summary' rows=6}}
      {{> afQuickField name='copies'}}
      {{> afQuickField name='lastCheckedOut'}}
    </fieldset>
    <button type="submit" class="btn btn-primary">Insert</button>
  {{/autoForm}}
</template>
```

*** 



