const mysql = require("mysql")


let db = mysql.createConnection({
    host: "birdie-test.cyosireearno.eu-west-2.rds.amazonaws.com",
    user: "birdie",
    password: "7VsGDAXfpEH7Bee",
    database: "birdietest",
    port: 3306
});

export default db


