// using commander
const program = require('commander');
const { prompt } = require('inquirer');
const {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers,
} = require('./index');

//Customer Questions
const questions = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Customer First Name'//message is what user sees
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Customer Last Name'
    },
    {
        type: 'input',
        name: 'phone',
        message: 'Customer Phone Number'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Customer email address'
    }

]

program
    .version('1.0.0')
    .description('Client Management System')

/* program
    .command('add <firstname> <lastname> <phone> <email>')
    .alias('a')
    .description('Add a Customer')
    .action((firstname, lastname, phone, email) => {
        addCustomer({firstname, lastname, phone, email});
    }); */

//Adding commands
program
    .command('add')
    .alias('a')
    .description('Add a customer')
    .action(() => {
        prompt(questions).then(answers => addCustomer(answers));
    })

//find command
program
    .command('find <name>')
    .alias('f')
    .description('Find a Customer')
    .action(name => findCustomer(name));

//update
program
    .command('update <_id>')
    .alias('u')
    .description('Update a customer')
    .action(_id => {
        prompt(questions).then(answers => updateCustomer(_id, answers)); //you need the id first because that is what it is looking for in the action
    })

    //remove
    program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a Customer')
    .action(_id => removeCustomer(_id));

    //list
    program
    .command('list')
    .alias('l')
    .description('List all Customers')
    .action(()=> listCustomers());


program.parse(process.argv); 