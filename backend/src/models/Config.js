const { Schema, model } = require('mongoose');

const configSchema = Schema({
  siteName: {
    type: String,
    require: true,
  },
  logoName: {
    type: String,
    default: '',
  },
  logoImage: {
    type: String,
    default: '',
  },
});

module.exports = model('Config', configSchema);
