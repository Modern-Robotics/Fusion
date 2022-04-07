const logger 	= require('../utils/logger');
const mongoose 	= require('mongoose');
const User 		= require('../models/user');


module.exports = async function(){

	// Override mongoose's default promise library
	mongoose.Promise = global.Promise;

	// Connect to database
	logger.verbose('Configuring database connection');
	await mongoose.connect('mongodb://127.0.0.1:27017/Fusion', {
		useMongoClient: true,
	});  

	// Log any connection errors
	mongoose.connection.on('error', (err) => {
		logger.error(err);
	});


	// Create Guest Account if doesn't exist
	await createGuestAccount();

	// Helper Methods
	async function createGuestAccount(){

		let guestUser = await User.findOne({'username': 'mriguest'});

		// Check if guest user exists
		if (!guestUser){

			logger.info('Configuring guest account');

			guestUser = new User({
				username: 'mriguest',
				password: '',
				securityquestion: 'Who is your favorite actor, musician, or artist?',
				securityanswer: 'mriguest',
				usergroup: 'Guest'
			});

			guestUser.password = guestUser.generateHash(guestUser.username);
			guestUser.filepath = await guestUser.generateFileSystem(guestUser.username);

			// Create guest user
			await guestUser.save();

		}

	}

}();