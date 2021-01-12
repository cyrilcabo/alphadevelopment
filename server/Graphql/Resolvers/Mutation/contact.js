const contact = (parent, args, context) => {
	if (!args.contact || !args.message) return {error: true, message: "All fields required!"}
	return context.send(null, 2, args.contact, args.message).then(info => {
		if (info.accepted.length) {
			return {
				error: false,
				message: "Message succesfully sent."
			}
		}
		return {
			error: true,
			message: "Something went wrong.",
		}
	}).catch (err => ({error: true, message: "Service unavailable."}));
}

module.exports = contact;