async function resetAdminAccount() {

    let mongoose    = require('mongoose');
    let user        = require('./../app/models/user');

    try {

        process.chdir('./../');

        await mongoose.connect('mongodb://127.0.0.1:27017/Fusion', {useMongoClient: true, promiseLibrary: global.Promise});

        let adminUser = await user.findOne({username: 'admin', usergroup: 'Admin'});

        if (adminUser) {

            adminUser.password = adminUser.generateHash('admin');

            await adminUser.save();

            console.log('Admin user password reset');

        } else {

            let adminData = {
                username: 'admin',
                password: '',
                securityquestion: 'Who is your favorite actor, musician, or artist?',
                securityanswer: 'admin',
                usergroup: 'Admin'
            };

            adminUser = new user(adminData);

            adminUser.password = adminUser.generateHash('admin');
            adminUser.filepath = await adminUser.generateFileSystem(adminUser.username);

            await adminUser.save();

            console.log('Admin user created');

        }

        await mongoose.disconnect();

    } catch(err) {

        console.log(err);

    }

};

resetAdminAccount();