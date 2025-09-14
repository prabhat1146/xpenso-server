const dotenv = require("dotenv");
dotenv.config();
const { app } = require("./app.js");
const { AppDataSource } = require("./src/db/sqldb.js");
const seedModes = require("./src/data/Mode.seed.js");
const seedCategories = require("./src/data/Category.seed.js");
const Logger = require("./src/utility/logger.js");
const createSSHTunnel = require("./src/auth/ssh-tunnel/ssh-tunnel.js");
const connectSSH = require("./src/auth/ssh-tunnel/connect-ssh.js");
const sendEmail = require("./src/utility/email/sendEmail.js");
const port = process.env.PORT || 8000;
const host = process.env.SERVER_HOST;

const runServer = async () => {
  app.listen(port, async (err) => {
    if (err) {
      Logger.info(err.message);
      return;
    }
    Logger.info(`🚀 Server is running on ${host}: ${port}`);
  });
};

const initializeDataSource = async () => {
  AppDataSource.initialize()
    .then(async(res) => {
      const options = res.options;
      // console.log(options)
      Logger.info(
        "📦 Database connected successfully:\n" +
          `🔌 Type     : ${options.type}\n` +
          `🌐 Host     : ${options.host}\n` +
          `📍 Port     : ${options.port}\n` +
          `💾 Database : ${options.database}\n` +
          `👤 Username : ${options.username}`
      );
      // await seedModes(AppDataSource);
      // await seedCategories(AppDataSource);
    })
    .catch((error) => {
      Logger.error(`❌ Failed to connect to DB: ${error.message}`);
    });
};

const startApp = async () => {
  await runServer();
  await connectSSH();
  await createSSHTunnel();
  await initializeDataSource();

  // await seedModes(AppDataSource);
  // await seedCategories(AppDataSource);
};

startApp();
