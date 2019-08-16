function AuthenticationService(connection) {
    this.connection = connection;
}

AuthenticationService.prototype.authenticate = async function (username, password) {
    return {
        id: 1,
        username: username,
        password: password
    }
};

AuthenticationService.prototype.register = async function (username, password) {
    return {
        id: 1,
        username: username,
        password: password
    }
};

AuthenticationService.prototype.findUser = async function (identifier) {
    return {
        id: 1,
        username: 'test_user',
        password: 'test_user'
    }
};

module.exports = AuthenticationService;