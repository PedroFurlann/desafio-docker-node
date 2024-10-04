const express = require("express");
const mysql = require('mysql')

const app = express();

const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};


const connection = mysql.createConnection(config);

const createTableQuery = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;
connection.query(createTableQuery);

const insertQuery = `INSERT INTO people(name) values('Pedro')`

connection.query(insertQuery)

app.get("/", (req, res) => {
  connection.query('SELECT * FROM people', (error, results) => {
    if (error) throw error;
    const peopleNames = results.map(person => person.name);
    res.send(`<h1>Full Cycle Rocks!</h1>
              <h2>Lista de nomes cadastrados no banco de dados</h2>
              <ul>${peopleNames.map(name => `<li>${name}</li>`)}</ul>`
    );
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
