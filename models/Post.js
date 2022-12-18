const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, minLength: [6, 'Title must be at list 6 characters long!'] },
    keyWord: { type: String, minLength: [6, 'Title must be at list 6 characters long!']  },
    location: { type: String, required: true, maxLength: [15, 'Title must be maximum 15 characters long!']  },
    date: { type: String, required: true, match: [/^[a-z]{10}+$/, 'Date is exactly 10 characters!'] },
    imageUrl: { type: String, required: true , match: [/^https?/, 'Image must be a valid URL!']},
    description: { type: String, minLength: [8, 'Title must be at list 8 characters long!']  },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    votes: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    rating: { type: Number, default: 0 },
})

module.exports = model('User', schema);