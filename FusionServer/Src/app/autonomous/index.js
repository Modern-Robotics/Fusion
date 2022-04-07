const autonomous        = require('./../models/autonomous');
const logger            = require('./../utils/logger');
const fusionProgram     = require('./../fusionProgram');


module.exports = async function(){

    try {

        // Get autonomous settings
        const autonomousSettings = await autonomous.findOne({}).exec();

        // Settings found, check them
        if (autonomousSettings) {

            // Check if active
            if (autonomousSettings.active) {

                // Run autonomous program
                logger.info(`Autonomus mode active : Running "${autonomousSettings.program}" for "${autonomousSettings.user}"`);

                if (autonomousSettings.type == 'Editor') {

                    const user = autonomousSettings.user;
                    const filepath = `./app/filesystem/${user}/${autonomousSettings.type}/${autonomousSettings.program}`;
                    
                    // Start program
                    fusionProgram.StartProgram(user, filepath, 'autonomous');

                }

            } else {

                logger.info('Autonomous mode inactive');

            }

        } else {

            // Create default autonomous settings
            logger.verbose('Configuring default autonomus settings');
            await autonomous.create({});

        }

    } catch(err) {

        logger.error(err);

    }    

}();