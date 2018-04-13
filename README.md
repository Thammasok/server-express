This project was server-express with [Create ExpressJS](https://expressjs.com/) and use Express generator for generate project.

## Install Express and Sequelize
npm install express express-generator
  - express . -f
npm install sequelize-cli -g
 - sequelize init
 
## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)

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