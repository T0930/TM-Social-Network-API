const { Schema, model } = require('mongoose');
 


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280, 
        },
        createdAt: { 
            type: Date,
            default: Date.now,
        },
        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        reactions:{
            // [reactionSchema],
            type: String,
            required: false,
        }
        
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;