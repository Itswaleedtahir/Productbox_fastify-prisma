const userController = require('../controller/user');

const routes = [{
        method: 'POST',
        url: '/api/users/generateOTP',
        handler: userController.generateOtp
    },
    {
        method: 'POST',
        url: '/api/users',
        handler: userController.create
    },
{
        method: 'GET',
        url: '/api/users/:userId/verifyOTP',
        handler: userController.verify
    },
]
module.exports = routes