const tunnel = require("tunnel-ssh");
const fs = require("fs");
const path = require("path");

// server-details
const port = process.env.SQL_DB_PORT;
const server_host=process.env.SERVER_HOST
// ssh-details
const ssh_host = process.env.SSH_HOST;
const ssh_port = process.env.SSH_PORT;
const ssh_user_name = process.env.SSH_USER_NAME;
const passphrase=process.env.SSH_PASSPHRASE;

const path_name = path.join(
  __dirname,
  "../key/private-key/domain-india-ssh-tunnel-private-key"
);

const createSSHTunnel = async () => {
  const tunnelOptions = {
    autoClose: true,
  };

  const serverOptions = {
    port: port, // Local port to forward to
  };

  const sshOptions = {
    host: ssh_host,
    port: ssh_port,
    username: ssh_user_name,
    privateKey: fs.readFileSync(path_name),
    passphrase: passphrase,
  };

  const forwardOptions = {
    srcAddr: server_host,
    srcPort: port,
    dstAddr: "127.0.0.1",
    dstPort: 3306,
  };

  console.log("🔌 Connecting to secure shell (SSH) tunnel...");

  try {
    const [server, conn] = await tunnel.createTunnel(
      tunnelOptions,
      serverOptions,
      sshOptions,
      forwardOptions
    );

    console.log("✅ SSH tunnel established at localhost:3307");

    // Listen for close events
    conn.on("close", () => {
      console.warn("🔌 SSH connection closed.");
    });

    conn.on("error", (err) => {
      console.error("❌ SSH connection error:", err);
    });

    // console.log(server)

    return [server, conn];
  } catch (err) {
    console.error("❌ SSH tunnel creation failed:", err.message || err);
    throw err;
  }
};

module.exports = createSSHTunnel;
