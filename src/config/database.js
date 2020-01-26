const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@nappsolutionstest-ixu2m.gcp.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority',
  { useUnifiedTopology: true, useNewUrlParser: true }
)

module.exports = mongoose;