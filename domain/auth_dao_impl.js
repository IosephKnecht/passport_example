const AuthDao = require('../data/auth_dao');
const TediousWrapper = require('./tedious_wrapper');

class AuthDaoImpl extends AuthDao {
    constructor(connection) {
        super();
        this.connection = connection;
    }

    async register(username, password, passwordSalt) {
        let query = 'INSERT INTO dbo.\"user\" (username, password, password_salt) VALUES (@username, @password, @password_salt)';
        return TediousWrapper.execSqlWithParams(this.connection, query, [{
            name: 'username',
            type: 'VarChar',
            value: username
        }, {
            name: 'password',
            type: 'VarChar',
            value: password
        }, {
            name: 'password_salt',
            type: 'VarChar',
            value: passwordSalt
        }]);
    }

    async findUser(username) {
        let query = 'SELECT username, password, password_salt FROM dbo.\"user\" WHERE username=@username';

        return TediousWrapper.execSqlWithParams(this.connection, query, [{
            name: 'username',
            type: 'VarChar',
            value: username
        }]);
    }
}

module.exports = AuthDaoImpl;