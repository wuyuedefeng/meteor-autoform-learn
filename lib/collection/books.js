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
    },
    write_year:{
        type:String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "boolean-select"
            }
        }

    },
    write_year2:{
        type:String,
        optional: true,
        allowedValues:['第一个选项','第二个选项','第三个选项'],
        autoform: {
            afFieldInput: {
                firstOption: "请从下面三个选项中选择一个"
            }
        }

    }
}));

//自定义某个字段
SimpleSchema.messages(
    {"required title": '必须填写title'}
);

////修改全局提示
//SimpleSchema.messages({
//    required: "[label] isRequied",
//    minString: "[label] must be at least [min] characters",
//    maxString: "[label] cannot exceed [max] characters",
//    minNumber: "[label] must be at least [min]",
//    maxNumber: "[label] cannot exceed [max]",
//    minDate: "[label] must be on or after [min]",
//    maxDate: "[label] cannot be after [max]",
//    badDate: "[label] is not a valid date",
//    minCount: "You must specify at least [minCount] values",
//    maxCount: "You cannot specify more than [maxCount] values",
//    noDecimal: "[label] must be an integer",
//    notAllowed: "[value] is not an allowed value",
//    expectedString: "[label] must be a string",
//    expectedNumber: "[label] must be a number",
//    expectedBoolean: "[label] must be a boolean",
//    expectedArray: "[label] must be an array",
//    expectedObject: "[label] must be an object",
//    expectedConstructor: "[label] must be a [type]",
//    regEx: [
//        {msg: "[label] failed regular expression validation"},
//        {exp: SimpleSchema.RegEx.Email, msg: "[label] must be a valid e-mail address"},
//        {exp: SimpleSchema.RegEx.WeakEmail, msg: "[label] must be a valid e-mail address"},
//        {exp: SimpleSchema.RegEx.Domain, msg: "[label] must be a valid domain"},
//        {exp: SimpleSchema.RegEx.WeakDomain, msg: "[label] must be a valid domain"},
//        {exp: SimpleSchema.RegEx.IP, msg: "[label] must be a valid IPv4 or IPv6 address"},
//        {exp: SimpleSchema.RegEx.IPv4, msg: "[label] must be a valid IPv4 address"},
//        {exp: SimpleSchema.RegEx.IPv6, msg: "[label] must be a valid IPv6 address"},
//        {exp: SimpleSchema.RegEx.Url, msg: "[label] must be a valid URL"},
//        {exp: SimpleSchema.RegEx.Id, msg: "[label] must be a valid alphanumeric ID"}
//    ],
//    keyNotInSchema: "[key] is not allowed by the schema"
//});