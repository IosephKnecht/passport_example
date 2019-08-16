const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const Types = require('tedious').TYPES;
const AuthDao = require('../data/auth_dao');

class AuthDaoImpl extends AuthDao {
    constructor(connection) {
        super();
        if (connection instanceof Connection === false) {
            throw TypeError('except tedious session object')
        }
        this.connection = connection;
    }

    async register(username, password) {
    }

    async authenticate(username, password) {
    }

    async findUser(username) {
        let request = Request('Select username, password, password_salt where username = @username');
        request.addParameter('username', Types.VarChar, username);

        return this.connection.execSql(request);
    }
}

module.exports = AuthDaoImpl;