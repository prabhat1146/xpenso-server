const dotenv = require("dotenv");
dotenv.config();
const { app } = require("./app.js");
const { AppDataSource } = require("./src/db/sqldb.js");
const seedModes = require("./src/data/Mode.seed.js");
const seedCategories = require("./src/data/Category.seed.js");
const Logger = require("./src/utility/logger.js");
const port = process.env.PORT || 8000;


AppDataSource.initialize()
  .then(() => {
    Logger.info("📦 Database connected")
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


