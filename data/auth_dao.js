class AuthDao {
    constructor() {
        if (new.target === AuthDao) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
        if (this.findUser === undefined ||
            this.register === undefined) {
            throw new TypeError("must be override")
        }
    }
}

module.exports = AuthDao;