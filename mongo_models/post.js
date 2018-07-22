const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		owner_id : {type: Number, index : true},
		owner_name : String,
		title : String,
		detail : String
	},
	{
		timestamps: true
	}
);

var Post = mongoose.model('Post', postSchema);

module.exports = Post;