const { connect } = require("mongoose");
const { Hash } = require("./utils");
const User = require("./models/user");
const Role = require("./models/role");

module.exports = async function DatabaseInit() {
  try {
    await connect(process.env.DATABASE_URL, { useNewUrlParser: true });
    console.log("Connection Mongo: OK");

    // Create default admin user
    // user details set in .env
    run().catch((err) => console.error(err));
  } catch (err) {
    throw new Error("Unable to connect to database: " + err);
  }
};

async function run() {
  await connect(process.env.DATABASE_URL, { useNewUrlParser: true });

  // TODO: This doesn't prevent recreate of new old dbs if they already exist
  // need to update for better way of handling these
  const usrRole = await Role.findOne({ name: "User" });
  const mdRole = await Role.findOne({ name: "Moderator" });
  const admRole = await Role.findOne({ name: "Admin" });

  if (!usrRole) {
    const userRole = new Role({
      name: "User",
    });

    await userRole.save();
  }
  if (!mdRole) {

    const modRole = new Role({
      name: "Moderator",
    });

    await modRole.save();
  }
  if (!admRole) {
    const adminRole = new Role({
      name: "Admin",
    });

    await adminRole.save();
  }

  const user = await User.findOne({ admin: true });
  const getUsrRole = await Role.findOne({ name: "User"});
  const getAdminRole = await Role.findOne({ name: "Admin"});

  if (!user) {
    const password = Hash("changeme");

    const newUser = new User({
        username: "admin",
        roles: {
            "User": getUsrRole?._id,
            "Admin": getAdminRole?._id,
        },
        password,
        avatar: "",
    });
    await newUser.save();

    console.log(`Default user & roles created. Recommended to change user details after logging in. Default password is 'changeme'.`);
  }
}