import {loadNotesFromApi, postNoteToApi} from "./notesService.js";

const form = document.querySelector("#form-notes");
const inputNote = document.querySelector("#input-cpf");

window.addEventListener("load", loadNotesFromApi);

const cleanForm = () => form.reset();

const handleSubmit = (event) => {
    
    event.preventDefault();

    postNoteToApi(inputNote.value);

    cleanForm();
}

form.addEventListener("submit", handleSubmit);