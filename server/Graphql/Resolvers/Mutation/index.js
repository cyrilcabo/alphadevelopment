const subscribe = require('./subscribe');
const like = require('./like');
const contact = require('./contact');
const likeBlog = require('./likeblog');
const addComment = require('./addcomment');


const Mutation =  {
	subscribe,
	like,
	contact,
	likeBlog,
	addComment
}

module.exports = {
	Mutation,
}