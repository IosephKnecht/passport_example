const AuthDao = require('../data/auth_dao');

function AuthenticationService(dao) {
    if (dao instanceof AuthDao === false) {
        throw TypeError('expect AuthDao instance object')
    }
    this.dao = dao;
}

AuthenticationService.prototype.authenticate = async function (username, password) {
    let result = await this.dao.authenticate(username, password);
    return result;
};

AuthenticationService.prototype.register = async function (username, password) {
    let result = await this.dao.register(username, password);
    return result;
};

AuthenticationService.prototype.findUser = async function (username) {
    let result = await this.dao.findUser(username);
    return result;
};

module.exports = AuthenticationService;