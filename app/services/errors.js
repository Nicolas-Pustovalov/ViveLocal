class UnauthorizedAccess extends Error {
    constructor(userId) {
        super(`unauthorized access with  user id ${userId}`);
    }
}
class UnauthorizedRole extends Error {
    constructor(role) {
        super(`unauthorized access with role ${role}`);
    }
}

module.exports = {
    UnauthorizedAccess,
    UnauthorizedRole
};