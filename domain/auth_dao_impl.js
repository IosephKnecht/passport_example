const AuthDao = require('../data/auth_dao');
const TediousWrapper = require('./tedious_wrapper');
const bcrypt = require('bcrypt');

class AuthDaoImpl extends AuthDao {
    constructor(connection) {
        super();
        this.connection = connection;
    }

    async register(username, password) {
        // TODO: register
    }

    async authenticate(username, password) {
        let result = this.findUser(username);
    }


    async findUser(username) {
        let query = 'SELECT username, password, password_salt FROM dbo.\"user\" WHERE username=@username';

        return await TediousWrapper.execSqlWithParams(this.connection, query, [{
            name: 'username',
            type: 'VarChar',
            value: username
        }]);
    }
}

module.exports = AuthDaoImpl;