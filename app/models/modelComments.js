module.exports = {
    addComment: (dbConnection, idObra, comment, callback) => {
        console.log('[Model comment] cheguei no model comment');
        const sql = `INSERT INTO comentarios (comentario, idobra) VALUES ('${comment}', ${idObra});`;
        dbConnection.query(sql, callback);
    },
    getComments: (connection, callback) => {
        const sql = `SELECT * FROM comentarios;`;
        connection.query(sql, callback);
    },
}
