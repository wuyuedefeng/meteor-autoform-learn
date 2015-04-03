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