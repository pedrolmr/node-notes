const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    return ('Your notes...');
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body:body
        })
        saveNotes(notes);
        console.log('New note added');
    }else{
        console.log('Note title taken');
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

const removeNote = title => {
    const notes = loadNotes();
    notesToKeep = notes.filter(note => note.title !== title);

    if(notesToKeep !== 0){
        console.log(chalk.red.inverse('note not found'));
    }else{
        console.log(chalk.green.inverse('note deleted!'));
    }

    saveNotes(notesToKeep);
}
module.exports = {
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote
};

//set up remove command to take a require --title option
//create and export a remove function from notes.js
//call removeNote function in remove command handler
//have removeNote log the title of the note to be removed
//test your work using node app.js remove --title="some title"