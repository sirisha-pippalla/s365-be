require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

// console.log(pool)


//let sql = "SELECT * FROM tbl_variants_master"
//  let sql = "SELECT * FROM tbl_state_master"
// pool.execute(sql, function(err, result) {
//     if(err) throw err;

//     //console.log(result);
//     result.forEach((res) => {
//         console.log(res);

//     })
// });

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');

  // Perform your database operations here
  // ...

  connection.release(); // Release the connection back to the pool

  // Don't forget to close the connection pool when you're done with all operations
  //pool.end();
});



module.exports = pool.promise();






