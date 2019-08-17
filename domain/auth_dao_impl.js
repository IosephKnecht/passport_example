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
        // TODO: authenticate
    }


    async findUser(username) {
        return TediousWrapper.execSqlWithParams(this.connection, 'Select * from dbo.\"user\"' +
            'where dbo.\"user\".username = @username',
            [
                {name: 'username', type: 'VarChar', value: username}
            ]);
    }
}

module.exports = AuthDaoImpl;