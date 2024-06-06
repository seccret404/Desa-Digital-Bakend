const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const users = [];

const addUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { username, password: hashedPassword };
  users.push(user);
  return user;
};

const getUser = async (username) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
  user: 'desasoso_dolok',
  password:'W]9CO7tcj~HF',
  database: 'desasoso_desadigital_db',
  });

  try {
      const [rows, fields] = await connection.execute('SELECT * FROM admin WHERE username = ?', [username]);
      if (rows.length > 0) {
          return rows[0]; 
      } else {
          return null; 
      }
  } catch (error) {
      console.error('Error fetching user:', error);
      return null;
  } finally {
      await connection.end();
  }
};

const initializeUsers = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'desasoso_dolok',
    password:'W]9CO7tcj~HF',
    database: 'desasoso_desadigital_db',
  });

  try {
      const [rows, fields] = await connection.execute('SELECT COUNT(*) as count FROM admin');
      if (rows[0].count === 0) {
          const adminUsername = 'desasosordolok';
          const adminPassword = 'desamaju01sosordolok'; 
          const hashedPassword = await bcrypt.hash(adminPassword, 10);
          await connection.execute('INSERT INTO admin (username, password) VALUES (?, ?)', [adminUsername, hashedPassword]);
          console.log('Admin user added to the database.');
      } else {
          console.log('Admin user already exists.');
      }
  } catch (error) {
      console.error('Error initializing users:', error);
  } finally {
      await connection.end();
  }
};



module.exports = { addUser, getUser, initializeUsers };
