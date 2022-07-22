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

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (isAuthenticated({ email, password })) {
    const user = getUsersDb().users.find(
      (user) => user.email === email && user.password === password
    );
    const { id, nickname, type } = user;

    const jwToken = createToken({ id, nickname, type, email });
    return res.status(200).json(jwToken);
  } else {
    const status = 401;
    const message = "Incorrect email or password";
    return res.status(status).json({ status, message });
  }

  return res.status(200).json("Login Success");
});

server.use(router);
server.listen(3006, () => {
  console.log("JSON Server is running");
});
