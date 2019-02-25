const mongoose = require('mongoose');

//Map global promise - get rid of err depricated
mongoose.Promise = global.Promise;

//connect to db
const db = mongoose.connect('mongodb://localhost:27017/customercli'
);

//Import model

const Customer = require('./models/customer');

//Add customer
const addCustomer = (customer) => { //use.then to get a response from a promise
    Customer.create(customer).then(customer => {//create is a mongoose method resulting in a promise
        console.info('New Customer Added');
        db.close(); //must close db ir it will hang
    })
}

//Find Customer

const findCustomer = (name) => {
    //Make case insensitive
    const search = new RegExp(name, 'i'); //RegExp regular expression will allow the search of john to equal John. lowercase i means to check for lowercase
    Customer.find({$or: [{firstname: search}, {lastname: search}]})//$or allows to check in multiple fields
        .then(customer => {
            console.info(customer);
            console.info(`${customer.length} matches`);
            db.close();
        });
}

//Export All Methods
module.exports = {
    addCustomer,
    findCustomer
}