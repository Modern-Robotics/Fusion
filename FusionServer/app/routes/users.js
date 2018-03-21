


module.exports = function(app, User, passport, fusionProgram){

    // api route for users =====================================================
    // Get Users
    app.get('/api/users', authenticationMiddleware(), function (req, res) {
        User.find({ usergroup: { $ne: 'Guest' }}, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });
    // Create User
    app.post('/api/users', passport.authenticate('local-signup', {
        session: true        

    }), function (req, res) {

        if (req.user.Error){

            return res.status(500).send(req.user.Error);

        }
        else{

            return res.status(200).json({
                serverMessage: "User created!",
                user: req.user
            });

        }        

    });
    // Get User
    app.get('/api/users/:User_Id', authenticationMiddleware(), function (req, res) {
        User.findOne({
            'username': req.params.User_Id.toLowerCase().trim()
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });
    // Update User
    app.put('/api/users/:User_Id', authenticationMiddleware(), function (req, res) {
        User.findOne({
            'username': req.params.User_Id.toLowerCase().trim()
        }, function (err, user) {
            if (err)
                res.send(err);

            if (req.body.password) {
                user.password = user.generateHash(req.body.password);
            }
            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            if (req.body.language) {
                user.language = req.body.language;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.defaultprogramminglanguage) {
                user.defaultprogramminglanguage = req.body.defaultprogramminglanguage;
            }
            if (req.body.securityquestion) {
                user.securityquestion = req.body.securityquestion;
            }
            if (req.body.securityanswer) {
                user.securityanswer = req.body.securityanswer;
            }
            if (req.body.usergroup) {
                user.usergroup = req.body.usergroup;
            }

            user.save(function (err) {
                if (err)
                    res.status(500).send(err);
                res.status(200).json({
                    serverMessage: 'User updated!'
                });
            });
        });
    });
    // Delete User
    app.delete('/api/users/:User_Id', authenticationMiddleware(), function (req, res) {

        User.remove({
            'username': req.params.User_Id.toLowerCase().trim()
        }, function (err, user) {
            if (err)
                return res.send(err);

            User.removeFileSystem(req.params.User_Id.toLowerCase().trim());

            return res.status(200).json({
                serverMessage: 'Successfully deleted'
            });
        });
    });
    // Login User
    app.post('/api/users/login', passport.authenticate('local-login', {
        session: true
    }), function (req, res) {

        res.status(200).json({
            serverMessage: "Login Successfull",
            user: req.user
        });

    });
    // Logout User
    app.post('/api/users/logout', authenticationMiddleware(), function (req, res) {        

        if (fusionProgram.runningProgram)
            if (fusionProgram.runningProgram.User == req.user.username)
                fusionProgram.KillProgram();

        req.logout();

        res.status(200).json({
            serverMessage: 'Logged out successfully'
        });

    });
    // Get User Security Question
    app.get('/api/recovery/:User_Id', function (req, res) {

        User.findOne({
            'username': req.params.User_Id.toLowerCase().trim()
        }, function (err, user) {
            if (err)
                res.status(500).send(err);

            if (!user)
                res.status(500).send("User does not exist");
            else
                res.status(200).json(user.securityquestion);
        });

    });

    // Logs user in using correct security answer
    app.post('/api/recovery', passport.authenticate('local-recovery', {
        session: true
    }), function (req, res) {

        res.status(200).json({
            serverMessage: "Login Successfull",
            user: req.user
        });

    });

    // Gets allowed user groups
    app.get('/api/allowedUserGroups', function(req, res){
       
        var usergroups = ['User'];

        User.findOne({
            'usergroup': 'Admin'
        }, function (err, user) {
            if (err)
                return res.status(200).send(usergroups);

            if (!user)
                usergroups.unshift('Admin');

            return res.status(200).send(usergroups);
           
        });

    });

    function authenticationMiddleware() {
        return function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            } else {
                res.status(401).send("User Unauthenticated");
            }
        };
    }

};