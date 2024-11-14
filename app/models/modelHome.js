module.exports = {
    getPaintings: (dbConnection,callback) =>{
        console.log('[Model Home]');
        const sql = 'select * from obrasdearte;';
        dbConnection.query(sql,callback);
    }
}

