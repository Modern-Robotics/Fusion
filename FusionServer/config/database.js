
// config/database.js

module.exports = function(mongoose, User){

	// Variables ====================================================
	var mongoUrl = 'mongodb://127.0.0.1:27017/Fusion';

	// Connecting to Database =======================================
	mongoose.Promise = global.Promise;
	mongoose.connect(mongoUrl);

	// Create Guest Account if doesn't exist
	createGuestAccount();

	// Helper Methods
	function createGuestAccount(){

		User.findOne({
                'username': 'mriguest'
            }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    console.log(err);

                // if no user is found, return the message
                if (!user){

					var guestUsername = guestUsername;

					var guestData = {
						username: 'mriguest',
						password: '',
						securityquestion: 'Who is your favorite actor, musician, or artist?',
						securityanswer: 'mriguest',
						usergroup: 'Guest'

					};

					var guestUser = new User(guestData);

                    // set the user's local credentials
                    guestUser.password = guestUser.generateHash(guestUser.username);
                    guestUser.filepath = guestUser.generateFileSystem(guestUser.username);

                    // save the user
                    guestUser.save(function (err) {
                        if (err)
                            console.log(err);
						
						console.log('Guest Created');

                    });

				}					
				
            });

	}

};