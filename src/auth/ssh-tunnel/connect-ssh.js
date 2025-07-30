const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const connectSSH = () => {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn.on('ready', () => {
      console.log('✅ SSH connection successful');
      conn.end();
      resolve(true);
    });

    conn.on('error', (err) => {
      console.error('❌ SSH connection failed:', err);
      reject(err);
    });

    try {
      console.log('🚀 Attempting SSH connection...');
      conn.connect({
        host: 'businessbasket.in',
        port: 22,
        username: 'business',
        privateKey: fs.readFileSync(
          path.join(__dirname, '../key/private-key/domain-india-ssh-tunnel-private-key')
        ),
        passphrase: '@Prabhat1137'
      });
    } catch (err) {
      console.error('❌ Error before calling .connect():', err);
      reject(err);
    }
  });
};

module.exports = connectSSH;
