const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: { 
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'E-Mail not valid!'],
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'E-Mail is not Valid!']
        },
        thoughts: 
            [thoughtSchema],
        friends:
            [userSchema],
        
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', studentSchema);

module.exports = User;