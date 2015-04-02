Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "标题",
        max: 200
    },
    author: {
        type: String,
        label: "作者"
    },
    copies: {
        type: Number,
        label: "出版数",
        min: 1
    },
    lastCheckedOut: {
        type: Date,
        label: "最后一次出版日期",
        optional: true
    },
    summary: {
        type: String,
        label: "简介",
        optional: true,
        max: 1000
    },
    cost: {
        type: Number,
        label: "价格",
        min: 1
    }
}));