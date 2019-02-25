const mongoose = require('mongoose');

//Map global promise - get rid of err depricated
mongoose.Promise = global.Promise;

//connect to db
const client = mongoose.connect('mongodb://localhost:27017/customercli', { 
    useNewUrlParser: true} /* , {
    useMongoClient: true
} */);

//Import model

const Customer = require('./models/customer');

//Add customer
const addCustomer = (customer) => { //use.then to get a response from a promise
    Customer.create(customer).then(customer => {//create is a mongoose method resulting in a promise
        console.info('New Customer Added');
        client.close(); //must close db ir it will hang
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
            client.close();
        });
}

//Update Customer
const updateCustomer = (_id, customer)=> {
    Customer.update({ _id }, customer) //id is finding which one, customer is the data
    .then(customer => {
        console.info('Customer Updated');
        client.close();
    });
}

//remove Customer
const removeCustomer = (_id)=> {
    Customer.remove({ _id })
    .then(customer => {
        console.info('Customer Removed');
        client.close();
    });
}

//List all customers
const listCustomers = () => {
    Customer.find()
    .then(customers => {
        console.info(customers);
        console.info(`${customers.length} customers found`)
        client.close();
    });
}

//Export All Methods
module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers
}