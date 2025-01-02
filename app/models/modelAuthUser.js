module.exports = {
    criarUsuario: (dbConnection, usuario, password, callback) => {
        console.log('[Model criarUsuario]');

        const sql = 'INSERT INTO users(email, password, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP);'
        const values = [usuario.email, usuario.password];

        dbConnection.query(sql, [usuario, password], callback);
    },
    authenticateUser: (dbConnection, user, callback) => {
        console.log('[Model authenticateUser]');

        const sql = 'SELECT * FROM users WHERE email = ? ;';
        const values = [user.email];

        dbConnection.query(sql, [user.email], callback);
    }
}