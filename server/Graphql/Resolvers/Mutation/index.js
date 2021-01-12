const subscribe = require('./subscribe');
const like = require('./like');
const contact = require('./contact');


const Mutation =  {
	subscribe,
	like,
	contact,
}

module.exports = {
	Mutation,
}