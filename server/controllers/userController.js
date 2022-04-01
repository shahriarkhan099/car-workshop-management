
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID '+ connection.threadId);
    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
      connection.release();
      if(!err) {
        res.render('admin', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  });
}

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID '+ connection.threadId);
    let searchTerm = req.body.search;
    connection.query('SELECT * FROM user WHERE name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
      connection.release();
      if(!err) {
        res.render('admin', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  });
}

exports.form = (req, res) => {
  res.render('home');
}

exports.create = (req, res) => {
  const { name, address, phone, license, car_engine, appointment_date, mechanics } = req.body;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID '+ connection.threadId);
    let searchTerm = req.body.search;
    connection.query('INSERT INTO user SET name = ?, address = ?, phone = ?, license = ?, car_engine = ?, appointment_date = ?, mechanics = ?',[name, address, phone, license, car_engine, appointment_date, mechanics],
    (err, rows) => {
      connection.release();
      if(!err) {
        res.render('home', { alert: 'Appointment has been successfully set.' });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  });
}

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID '+ connection.threadId);
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release();
      if(!err) {
        res.render('edit', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  });
}

exports.update = (req, res) => {
  const { name, address, phone, license, car_engine, appointment_date, mechanics } = req.body;
  pool.getConnection((err, connection) => {
    if(err) throw err;
    console.log('Connected as ID '+ connection.threadId);
    connection.query('UPDATE user SET name = ?, address = ?, phone = ?, license = ?, car_engine = ?, appointment_date = ?, mechanics = ? WHERE id = ?',
    [name, address, phone, license, car_engine, appointment_date, mechanics, req.params.id],
    (err, rows) => {
      connection.release();
      if(!err) {

        pool.getConnection((err, connection) => {
          if(err) throw err;
          console.log('Connected as ID '+ connection.threadId);
          connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();
            if(!err) {
              res.render('edit', { rows, alert: `${name} has been updated.` });
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n', rows);
          });
        });

      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  });
}

exports.delete = (req, res) => {
  connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/?removed=' + removedUser);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });
}
