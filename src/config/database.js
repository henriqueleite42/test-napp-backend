const mongoose = require('mongoose');

const dbUser = 'ExempleDbUser';
const dbPass = 'ExempleDbPassword';
const dbName = 'NappSolutions';

mongoose.connect(
  'mongodb+srv://'+dbUser+':'+dbPass+'@nappsolutionstest-ixu2m.gcp.mongodb.net/'+dbName+'?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true }
)

module.exports = mongoose;