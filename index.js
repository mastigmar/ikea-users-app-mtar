
const { Sequelize, Model, DataTypes } = require('sequelize');
// imports the express npm module
const express = require('express');
// imports the cors npm module
const cors = require('cors');
// Creates a new instance of express for our app
const app = express();

// Create Sequelize instance
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Define User model
class User extends Model {}
User.init({
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
}, { sequelize, modelName: 'user' });


const users = [
    { name: "Blade",  isAdmin: false },
    { name: "Lazer", isAdmin: false },
    { name: "White Goodman", isAdmin: false },
    { name: "Blazer", isAdmin: false  },
    { name: "Peppar the Cat", isAdmin: false  },
    { name: "Me'Shell Jones", isAdmin: false  },
    { name: "Fran Stalinovskovichdavidovitchsky", isAdmin: false  }
];

// Sync models with database
sequelize.sync();
// .use is middleware - something that occurs between the request and response cycle.
app.use(cors());
 // We will be using JSON objects to communcate with our backend, no HTML pages.
app.use(express.json());
// This will serve the React build when we deploy our app
app.use(express.static("react-frontend/dist"));

// This route will return 'Hello Ikea!' when you go to localhost:8080/ in the browser
app.get("/", (req, res) => {
    res.json({ data: 'Hello Ikea!' });
    //res.json('Hello Ikea');
});

app.get("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

app.get('/api/seeds', async (req, res) => {
    users.forEach(u => User.create(u));
    res.json(users);
});

app.get('/api/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.post('/api/users', async (req, res) => {
    console.log('hej')
    const user = await User.create(req.body);
    res.json(user);
});

app.put("/api/users/:id", async (req, res) => {
    const { name, isAdmin } = req.body;

    const user = await User.findByPk(req.params.id);
    await user.update({ name, isAdmin });
    await user.save();
    res.json(user);
});

app.delete('/api/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.json({data: `The user with id of ${req.params.id} is removed.`});
});

// This tells the express application to listen for requests on port 8080
// For google cloud the port is in the environment variable 
const port = process.env.PORT || 8081;
app.listen(port, async () => {
    console.log(`Server started at ${port}`);
});