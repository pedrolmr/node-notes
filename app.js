const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

//customize yargs verison
yargs.version('1.1.0');

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'body for note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        // console.log('Adding a new note!!!', argv)
        notes.addNote(argv.title, argv.body);
    }
});
//create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe: 'title of note to be removed',
            demandOption:true,
            type: 'string' 
        }
    },
    handler(argv){
        notes.removeNote(argv.title, argv.body);
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'list your notes',
    builder: {
        title:{
            describe: 'note listed',
            type: 'string' 
        }
    },
    handler(argv){
        notes.listNotes(argv.title);
    }
})

//create read command
yargs.command({
    command:'read',
    describe: 'read a note',
    handler(){
        console.log('reading a note!')
    }
})
yargs.parse();