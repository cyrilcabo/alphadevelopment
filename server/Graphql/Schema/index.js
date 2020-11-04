const query = require('./queryschema');
const mutation = require('./mutationschema');
const products = require('./productschema');
const review = require('./reviewschema');
const subscribe = require('./subscribeschema');
const testimonial = require('./testimonialschema');

module.exports = [
	query,
	mutation,
	products,
	review,
	subscribe,
	testimonial
];