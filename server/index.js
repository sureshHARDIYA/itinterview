process.env.NODE_ENV = process.env.NODE_ENV || 'development';

require("@babel/register")({
  presets: ["@babel/preset-env"]
});

module.exports = require('./setup')
