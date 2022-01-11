import { formatData } from "./utils.js";

const sectionListNotes = document.querySelector("#list-notes");

const API_HOST = "http://localhost:3333/notes";

//Carrega as notas da api
export const loadNotesFromApi = async () => {
  try {
    const response = await fetch(API_HOST);

    if (!response.ok) {
      return alert("Erro ao consultar a api");
    }
    const listNotes = await response.json();

    listNotes.forEach((note) => {
      note.date = new Date(note.date);
      addNoteToSection(note);
    });
  } catch (error) {
    console.log(error);
    alert("Ops, houve um erro ao consultar a api");
  }
};
//cria uma nota da api
export const postNoteToApi = async (textNote) => {

    try {
  
      const response = await fetch(API_HOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: textNote })
      });
  
      if (!response.ok)
        return alert("Ops, houve um erro ao salvar a nota");
  
      const createdNote = await response.json();
  
      createdNote.date = new Date(createdNote.date);
  
      addNoteToSection(createdNote);
  
    } catch (error) {
      console.log(error);
      alert("Ops, houve um erro ao salvar na api");
    }
  
  };

//deleta uma nota da api
const deleteNoteFromToApi = () => {

};const deleteNoteFromApi = async (event, idNote) => {

  try {

    const response = await fetch(API_HOST + `/${idNote}`, {
      method: "DELETE"
    })

    if (!response.ok)
      return alert("Ops, houve um erro ao apagar a nota");

    removeNoteFromSection(event);

  } catch (error) {
    console.log(error);
    alert("Ops, houve um erro ao deletar da api");
  }

};

const createNewNoteElement = ({ id, date, text }) => {
  //criarmos um article com esta nota
  const newNoteElement = document.createElement("article");

  const pDateElement = document.createElement("p");
  pDateElement.textContent = formatData(date);
  newNoteElement.appendChild(pDateElement);

  const pElement = document.createElement("p");
  pElement.textContent = text;
  newNoteElement.appendChild(pElement);

  // Adicionou a lixeira a todas as notas criadas
  const trashElement = document.createElement("span");
  trashElement.className = "material-icons";
  trashElement.textContent = "delete_forever";

  trashElement.addEventListener("click", (event) => deleteNoteFromApi(event, id));

  newNoteElement.appendChild(trashElement);

  return newNoteElement;
};

export const addNoteToSection = (newNote) => {
  const newNoteElement = createNewNoteElement(newNote);

  sectionListNotes.appendChild(newNoteElement);
};

const removeNoteFromSection = (event) => {
  const noteToRemove = event.target.parentNode;
  sectionListNotes.removeChild(noteToRemove);
};
