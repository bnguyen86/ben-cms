var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Comment Model
 * ==========
 */

var Comment = new keystone.List('Comment', {
	map: { name: 'subject' },
	autokey: { path: 'slug', from: 'subject', unique: true }
});

Comment.add({
	subject: { type: String},
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	content: { type: String },
	post: { type: Types.Relationship, ref: 'Post'},
	reply: { type: Types.Relationship, ref: 'Comment'}
});

Comment.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Comment.defaultColumns = 'subject, state|20%, author|20%, publishedDate|20%';
Comment.register();