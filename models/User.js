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
            // validate: [validateEmail, 'E-Mail not valid!'],
            // match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,3})$/, 'E-Mail is not Valid!']
        },
        thoughts: 
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
        friends:
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;