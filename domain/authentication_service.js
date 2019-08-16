function AuthenticationService(connection) {
    this.connection = connection;
}

AuthenticationService.prototype.authenticate = async function (username, password) {
    return true
};

AuthenticationService.prototype.register = async function (username, password) {
    // TODO: register to database
    return true
};

module.exports = AuthenticationService;