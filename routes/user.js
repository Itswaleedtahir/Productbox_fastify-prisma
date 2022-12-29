const blogController = require('../controller/user');

const routes = [{
        method: 'POST',
        url: '/api/users/generateOTP',
        handler: blogController.Opt
    },
    {
        method: 'POST',
        url: '/api/users',
        handler: blogController.users
    },
{
        method: 'GET',
        url: '/api/users/:userId/verifyOTP',
        handler: blogController.verify
    },
]
module.exports = routes