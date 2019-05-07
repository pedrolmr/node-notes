const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
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

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('note deleted!'));
        saveNotes(notesToKeep);
    }else{
        console.log(chalk.red.inverse('note not found'));
    }

    saveNotes(notesToKeep);
} 

const listNotes = () => {
    console.log(chalk.bgRedBright.whiteBright.italic.bold('Your Notes:'));
    const notes = loadNotes();
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteTitle = notes.find(note => note.title === title);

    if(!noteTitle){
        console.log(chalk.bgRedBright.bold('NOTE NOT FOUND!'));
    }
    else{
        console.log(chalk.bgBlueBright.bold("---", noteTitle.title, "---"));
        console.log(noteTitle.body)
    }
}
module.exports = {
    addNote:addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
};
