var express = require ("express"); //Tipo de servidor: Express
var cors = require ("cors");
var bodyParser = require("body-parser"); //Convierte los JSON
const MySQL = require("./modulos/mysql.js");
const app = express(); //Inicializo express
var port = process.env.PORT || 3000; //Ejecuto el servidor en el puerto 3000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.status(200).send({
    message: "GET Home route working fine!",
  });
});

/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 */

app.get("/getWord", async function (req, res) {
  console.log(req.query); //Los pedidos get reciben los datos del req.query
  const respuesta = await MySQL.realizarQuery("SELECT * FROM Word");
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/insertWord", async function (req, res) {
  console.log(req.body);

  const existingWord = await MySQL.realizarQuery(
    `SELECT * FROM Word WHERE WordID = '${req.body.WordID}'`
  );

  if (existingWord.length > 0) {
    console.error("a Word with this ID allredy exist.");
    return res.status(400).send("a Word with this ID allredy exist.");
  }

  await MySQL.realizarQuery(
    `INSERT INTO Word (WordID, Word, Info) VALUES ('${req.body.WordID}','${req.body.Word}', '${req.body.Info}')`
  );

  res.send("Word insert succeffuly.");
});

app.put('/putWord', async function(req, res){
  await MySQL.realizarQuery(`UPDATE Word
  SET
  Word = '${req.body.Word}',
  Info = '${req.body.Info}'
  WHERE WordID = '${req.body.WordID}'`);
  res.send("ok");
})

app.delete('/deleteWord', async function(req, res){
  try {
    await MySQL.realizarQuery(`delete from Word where WordID = '${req.body.WordID}'`);
    res.send("ok");
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Internal server error');
  }
})

// USERS 

app.get("/getUser", async function (req, res) {
  console.log(req.query); //Los pedidos get reciben los datos del req.query
  const respuesta = await MySQL.realizarQuery("SELECT * FROM User");
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/insertUser", async function (req, res) {
  console.log(req.body);

  const existingUser = await MySQL.realizarQuery(
    `SELECT * FROM User WHERE UserID = '${req.body.UserID}'`
  );

  if (existingUser.length > 0) {
    console.error("a User with this ID allredy exist.");
    return res.status(400).send("a User with this ID allredy exist.");
  }

  await MySQL.realizarQuery(
    `INSERT INTO User (Username, Email_Address, Password, Name, Surname ) VALUES ('${req.body.Username}', '${req.body.Email_Address}','${req.body.Password}', '${req.body.Name}', '${req.body.Surname}')`
);


  res.send("User insert succeffuly.");
});

app.put('/putUser', async function(req, res){
  await MySQL.realizarQuery(`UPDATE User
  SET
  Username = '${req.body.Username}',
  Email_Address = '${req.body.Email_Address}',
  Password = '${req.body.Password}',
  Name = '${req.body.Name}',
  Surname = '${req.body.Surname}',
  WHERE UserID = '${req.body.UserID}'`);
  res.send("ok");
})

app.delete('/deleteUser', async function(req, res){
  try {
    await MySQL.realizarQuery(`delete from User where UserID = '${req.body.UserID}'`);
    res.send("ok");
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Internal server error');
  }
})


// GAMES

app.get("/getGame", async function (req, res) {
  console.log(req.query); //Los pedidos get reciben los datos del req.query
  const respuesta = await MySQL.realizarQuery("SELECT * FROM Game");
  console.log({ respuesta });
  res.send(respuesta);
});

app.post("/insertGame", async function (req, res) {
  console.log(req.body);

  const existingGame = await MySQL.realizarQuery(
    `SELECT * FROM Game WHERE GameID = '${req.body.GameID}'`
  );

  if (existingGame.length > 0) {
    console.error("A game with this ID already exists.");
    return res.status(400).send("A game with this ID already exists.");
  }

  try {
    await MySQL.realizarQuery(
      `INSERT INTO Game (UserID, LastWord, BestStreak)
       VALUES (${req.body.UserID}, '${req.body.LastWord}', ${req.body.BestStreak})`
    );

    console.log("Game inserted successfully.");
    res.send("Game inserted successfully.");
  } catch (error) {
    console.error("Error inserting game:", error);
    res.status(500).send("Error inserting game.");
  }
});


app.put('/putGame', async function(req, res){
  await MySQL.realizarQuery(`UPDATE Game
  SET
  UserID = '${req.body.UserID}',
  LastWord = '${req.body.LastWord}',
  BestStreak = '${req.body.BestStreak}',
  WHERE GameID = '${req.body.GameID}'`);
  res.send("ok");
})

app.delete('/deleteGame', async function(req, res){
  try {
    await MySQL.realizarQuery(`delete from Game where GameID = '${req.body.GameID}'`);
    res.send("ok");
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Internal server error');
  }
})



//Pongo el servidor a escuchar
app.listen(port, function () {
  console.log(`Server running in http://localhost:${port}`);
  console.log("Defined routes:");
  console.log("   [GET] http://localhost:3000/getWord");
  console.log("   [POST] http://localhost:3000/insertWord");
  console.log("   [PUT] http://localhost:3000/putWord");
  console.log("   [DELETE] http://localhost:3000/deleteWord");
  console.log("   [GET] http://localhost:3000/getUser");
  console.log("   [POST] http://localhost:3000/insertUser");
  console.log("   [PUT] http://localhost:3000/putUser");
  console.log("   [DELETE] http://localhost:3000/deleteUser");
  console.log("   [GET] http://localhost:3000/getGame");
  console.log("   [POST] http://localhost:3000/insertGame");
  console.log("   [PUT] http://localhost:3000/putGame");
  console.log("   [DELETE] http://localhost:3000/deleteGame");
});