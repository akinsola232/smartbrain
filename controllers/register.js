


 const registerHandler = (req, res, db, bcrypt) => {

	const { email, name , password } = req.body;

	const hash = bcrypt.hashSync(password);

	if(!email||!name||!password){

		return res.status(400).json(`can't register, one or more fields blank`)
	}

	db.transaction(trx => {

		trx('login').insert({
			hash:hash,
			email:email
		})
		.returning('email')
		.then(loginEmail => {

		return trx('users')
			.returning('*')
			.insert({

				email: loginEmail[0],
				name:name,
				joined:new Date()
			})
			.then(user => {

				res.json(user[0]);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json("Unable to register"))		
}

module.exports = {

	registerHandler
}