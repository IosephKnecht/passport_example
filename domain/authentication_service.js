const AuthDao = require('../data/auth_dao');
const bcrypt = require('bcrypt');

function AuthenticationService(dao) {
    if (dao instanceof AuthDao === false) {
        throw TypeError('expect AuthDao instance object')
    }
    this.dao = dao;
}

AuthenticationService.prototype.authenticate = async function (username, password) {
    let result = await this.dao.findUser(username);
    let count = !result.count ? 0 : result.count;

    if (count === 0) {
        return undefined
    }

    let encryptPassword = result.rows[0][1].value;

    let equal = bcrypt.compareSync(password, encryptPassword);

    if (equal) {
        return result.rows[0];
    } else {
        return undefined;
    }
};

AuthenticationService.prototype.register = async function (username, password) {
    let result = await this.dao.findUser(username);
    if (!result || result.count === 0) {
        let passwordSalt = bcrypt.genSaltSync(10);
        let decryptPassword = bcrypt.hashSync(password, passwordSalt);
        return await this.dao.register(username, decryptPassword, passwordSalt);
    } else {
        return {
            error: 'Пользователь уже существует'
        }
    }
};

AuthenticationService.prototype.findUser = async function (username) {
    let result = await this.dao.findUser(username);
    return result;
};

module.exports = AuthenticationService;