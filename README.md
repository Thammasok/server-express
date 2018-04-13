This project was server-express with [Create ExpressJS](https://expressjs.com/) and use Express generator for generate project.

## Table of Contents

- [Express and Sequelize Example](#express-and-sequelize-example)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)

## Express and Sequelize Example

## Install Express and Sequelize
npm install express express-generator
  - express . -f
npm install sequelize-cli -g
 - sequelize init

## Starting App

**Without Migrations**

```
npm install
npm start
```

**With Migrations**

```
npm install
node_modules/.bin/sequelize db:migrate
npm start
```

This will start the application and create an mysql database in your app dir.
Just open [http://localhost:3000](http://localhost:3000).

## Running Tests

We have added some [Mocha](https://mochajs.org) based test. You can run them by `npm test`


## Setup in Details

#### Express Setup

First we will create a bare Express App using `express-generator` [Express Generator](https://expressjs.com/en/starter/generator.html)
```bash
# install express generator globally
npm install -g express-generator

# create the sample app
mkdir express-example
cd express-example
express -f

# install all node modules
npm install
```

#### Sequelize Setup

Now we will install all sequelize related modules.

```bash
# install ORM , CLI and SQLite dialect
npm install --save sequelize sequelize-cli sqlite3

# generate models
node_modules/.bin/sequelize init
node_modules/.bin/sequelize model:create --name User --attributes username:string
node_modules/.bin/sequelize model:create --name Task --attributes title:string
```

We are using `.sequelizerc` setup change config path for migrations. You can read more about this in [migration docs](http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-sequelizerc-file)

```js
// .sequelizerc
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.js')
}
```

You will now have a basic express application with some additional directories
(config, models, migrations). Also you will find two migrations and models.
One for the `User` and one for the `Task`.

In order to associate the models with each other, you need to change the models
like this:

```js
// task.js
// ...
  Task.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    Task.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
// ...
```

```js
// user.js
// ...
  User.associate = function(models) {
    User.hasMany(models.Task);
  }
// ...
```

This association will create an attribute `UserId` in `Task` model. We have to amend our `create-task` migration and add this column.

```js
// xxxxxxx-create-task.js
// ...
  UserId: {
    type: Sequelize.INTEGER,
    onDelete: "CASCADE",
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
// ...
```

If you want to use the automatic table creation that sequelize provides,
you have to adjust the `bin/www` file to this:

```js
#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('init:server');
var http = require('http');
var models = require("../models");

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(function () {
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

function normalizePort(val) { /* ... */ }
function onError(error) { /* ... */ }
function onListening() { /* ... */ }
```

And finally you have to adjust the `config/config.js` to fit your environment.
Once thats done, your database configuration is ready!

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  bin/
    www
  config/
    config.json
  controllers/
    Home.js
  middlewares/
  migrations/
  models/
    index.js
    tesk.js
    user.js
  public/
    images/
  routes/
    index.js
    user.js
  seeders/
  test/
    test.js
  .env
  .env.example
  app.js
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.