const { connections, set, connect } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  if (connections[0].readyState) return;
  set("strictQuery", false);
  await connect(process.env.MONGO_URL);
  console.log("connected to db");
};

module.exports = {
  connectDB,
};
