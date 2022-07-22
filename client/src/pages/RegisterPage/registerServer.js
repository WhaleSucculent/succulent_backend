const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const jwt = require("jsonwebtoken");
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));

server.use(jsonServer.bodyParser);
server.use(middlewares);

const getUsersDb = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "users.json"), "UTF-8")
  );
};

const isAuthenticated = ({ email, password }) => {
  return (
    getUsersDb().users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
};

const SECRET = "123123JIOJWEFsfse12323986";
const expiresIn = "1h";
const createToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn });
};

//register
server.post("/auth/register", (req, res) => {
  const { email, password, type } = req.body;

  if (isAuthenticated({ email, password })) {
    const status = 401;
    const message = "Email and Password already exist";
    return res.status(status).json({ status, message });
  }

  fs.readFile(path.join(__dirname, "user.json"), (err, _data) => {
    if (err) {
      const status = 401;
      const message = err;
      return res.status(status).json({ status, message });
    }
    //get current users data
    const data = JSON.parse(_data.toString());
    //get the id of last user
    const last_item_id = data.users[data.users.length - 1].id;
    //add new user
    data.users.push({ id: last_item_id + 1, email, password, type }); //add some data
    fs.writeFile(
      path.join(__dirname, "users.json"),
      JSON.stringify(data),
      (err, result) => {
        //write
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  const jwToken = createToken({ id, type, email });
  res.status(200).json(jwToken);
});

server.use(router);
server.listen(3006, () => {
  console.log("JSON Server is running");
});
