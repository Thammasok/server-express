const mongoose = require('mongoose');
const moment = require('moment');

const MongoConnector = function({
  host,
  port,
  database
}) {
  this.host = host;
  this.port = port ? `${port}` : '';
  this.database = database;
  this.reconnectInterval = {};
  this.mongoose = mongoose;
  this.connected = false;
  this.lastReconnect = 0;

  mongoose.connection.on('connected', () => {
    console.log(`mongoose connected at ${this.host + this.port}`);
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
    }
  });
  let lastReconnect = 0;
  mongoose.connection.on('disconnected', () => {
    console.log(`disconnected ... > ${lastReconnect}`);
    this.reconnect();
    mongoose.connection.close(() => {
      console.log(`mongo close connection.`);
    }); 
  });
  mongoose.connection.on('error', () => {
    this.reconnect();
  });

}

const $ = MongoConnector.prototype;

$.connect = connect;
$.reconnect = reconnect;

function connect() {
  this.mongoose.connect(`mongodb://${this.host}:${this.port}/${this.database}`);
}

function reconnect() {
  if (this.connected) {
    return;
  }
  if (this.lastReconnect >= moment().unix() + 1) {
    this.lastReconnect = moment.unix();
    this.reconnectInterval = setInterval(
      this.connect,
      1000
    );
  }
}

module.exports = function(options) {
  return new MongoConnector(options);
};