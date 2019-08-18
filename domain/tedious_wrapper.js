const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const Types = require('tedious').TYPES;

function matchType(type) {
    if (typeof type !== 'string') {
        throw new TypeError('incorrect type value');
    }

    if (Types.propertyIsEnumerable(type) === true) {
        return Types[type];
    } else {
        throw new TypeError('is not Tedious type');
    }
}

function buildWrapper(connection, request) {
    if (connection instanceof Connection === false) {
        throw TypeError("expected Tedious connection object")
    }
    if (request instanceof Request === false) {
        throw TypeError("expected Tedious request object")
    }

    let wrapper = subscribeOnUserCallback(request);
    connection.execSql(request);
    return wrapper
}

function subscribeOnUserCallback(request) {
    return new Promise((resolve, reject) => {
        request.userCallback = function (error, rowCount, rows) {
            if (!error) {
                resolve({
                    count: rowCount,
                    rows: rows
                });
            } else {
                reject(error);
            }
        }
    });
}

class TediousWrapper {
    static execSql(connection, query) {
        let request = new Request(query);
        return buildWrapper(connection, request)
    }

    static execSqlWithParams(connection, query, params) {
        let request = new Request(query);

        params.forEach(param => {
            request.addParameter(param.name, matchType(param.type), param.value)
        });

        return buildWrapper(connection, request)
    }
}


module.exports = TediousWrapper;