const subscribe = (parent, args, context) => {
	return context.db.then(db => db.collection("subscribed_emails").insertOne({_id: args.email})).then(() => {
		return context.send(args.email, 1).then(info => {
			if (info.accepted.length) {
				return response = {
					error: false,
					message: "Email subscribed succesfully!"
				};
			}
			return response = {
				error: true,
				messsage: "Something went wrong. Try again.",
			};
		}).catch(err => {
			return response = {
				error: true,
				message: "Service currently unavailable.",
			};
		});
	}).catch(err => {
		if (err) return {
			error: true,
			message: "Email already subscribed!",
		}
	});
};

module.exports = subscribe;