const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, minLength: [6, 'Title must be at list 6 characters long!'] },
    keyWord: { type: String, minLength: [6, 'Key word must be at list 6 characters long!']  },
    location: { type: String, required: true, maxLength: [15, 'Location must be maximum 15 characters long!']  },
    date: { type: String, required: true,  },
    imageUrl: { type: String, required: true , match: [/^https?/, 'Image must be a valid URL!']},
    description: { type: String, minLength: [8, 'Description must be at list 8 characters long!']  },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    authorFirstName: { type: String },
    authorLastName: { type: String },
    votes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    votesPlus: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    votesMinus: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    rating: { type: Number, default: 0 },
})

module.exports = model('Post', schema);