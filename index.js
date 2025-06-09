const dotenv = require("dotenv");
dotenv.config();
const { app } = require("./app.js");
const { AppDataSource } = require("./src/db/sqldb.js");
const seedModes = require("./src/data/Mode.seed.js");
const seedCategories = require("./src/data/Category.seed.js");
const Logger = require("./src/utility/logger.js");
const port = process.env.PORT || 8000;


AppDataSource.initialize()
  .then((res) => {
    const options=res.options;
    console.log(options)
    Logger.info("📦 Database connected successfully:\n" +
      `🔌 Type     : ${options.type}\n` +
      `🌐 Host     : ${options.host}\n` +
      `📍 Port     : ${options.port}\n` +
      `💾 Database : ${options.database}\n` +
      `👤 Username : ${options.username}`
    );
    app.listen(port, async(err) => {
        if(err){
            Logger.info(err.message)
            return;
        }
      Logger.info(`🚀 Server is running on http://localhost:${port}`)
    //   await seedModes(AppDataSource)
    // await seedCategories(AppDataSource);
      
    });
  })
  .catch((error) => {
    Logger.error("❌ Failed to connect to DB:", error);
  });


