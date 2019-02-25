const monguse = require('mongoose');

//Customer Scheema
const customerSchema = mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    phone: {type: String},
    email: {type: String},
});

//Define and export
module.export = mongoose.model('customer', customerSchema);
