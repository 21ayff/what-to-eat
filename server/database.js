const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// 确保数据目录存在
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DB_PATH || path.join(dataDir, 'database.sqlite');

// 创建数据库连接
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('数据库连接成功');
    initDatabase();
  }
});

// 初始化数据库表
function initDatabase() {
  // 用户表
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      nickname TEXT,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 验证码表（用于临时存储验证码）
  db.run(`
    CREATE TABLE IF NOT EXISTS verify_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL
    )
  `);

  console.log('数据库表初始化完成');
}

// 数据库操作封装
const dbOperations = {
  // 创建用户
  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      const { id, email, nickname, avatar } = userData;
      db.run(
        'INSERT INTO users (id, email, nickname, avatar) VALUES (?, ?, ?, ?)',
        [id, email, nickname, avatar],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, email, nickname, avatar });
          }
        }
      );
    });
  },

  // 根据邮箱查找用户
  findUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  },

  // 根据ID查找用户
  findUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE id = ?',
        [id],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  },

  // 保存验证码
  saveVerifyCode: (email, code, expiresAt) => {
    return new Promise((resolve, reject) => {
      // 先删除该邮箱的旧验证码
      db.run('DELETE FROM verify_codes WHERE email = ?', [email], (err) => {
        if (err) {
          reject(err);
          return;
        }
        
        // 插入新验证码
        db.run(
          'INSERT INTO verify_codes (email, code, expires_at) VALUES (?, ?, ?)',
          [email, code, expiresAt],
          function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id: this.lastID });
            }
          }
        );
      });
    });
  },

  // 验证验证码
  verifyCode: (email, code) => {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      db.get(
        'SELECT * FROM verify_codes WHERE email = ? AND code = ? AND expires_at > ?',
        [email, code, now],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    });
  },

  // 删除验证码
  deleteVerifyCode: (email) => {
    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM verify_codes WHERE email = ?',
        [email],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ deleted: this.changes });
          }
        }
      );
    });
  },

  // 清理过期验证码
  cleanExpiredCodes: () => {
    return new Promise((resolve, reject) => {
      const now = new Date().toISOString();
      db.run(
        'DELETE FROM verify_codes WHERE expires_at < ?',
        [now],
        function(err) {
          if (err) {
            reject(err);
          } else {
            resolve({ deleted: this.changes });
          }
        }
      );
    });
  }
};

module.exports = { db, dbOperations };
