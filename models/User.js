const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must enter a valid email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    //prevents virtuals from creating duplicate of _id as 'id'
    id: false,
  }
);

// get total count of a users friend list
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;