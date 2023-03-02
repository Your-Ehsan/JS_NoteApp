var D = document;
let popUp_wrapper = D.querySelector("#popUp_wrapper"),
  popUp_Header = D.querySelector(".popUp-header header"),
  InputTitle = D.querySelector("#InputTitle"),
  InputDesc = D.querySelector("#InputDesc"),
  closeBtn = D.querySelector(".closeBtn"),
  SaveBtn = D.querySelector("#SaveBtn"),
  addBox = D.querySelector("#addBox"),
  Wrapper = D.querySelector(".wrapper");

let notes = JSON.parse(localStorage.getItem("notes") || "[]");
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "October",
  "September",
  "November",
  "Decenmber",
];
let IsUpdated = false,
  updatedID;
function Note_indicator() {
  if (D.querySelector(".note")) {
    D.querySelector(".No_Note-wrapper").classList.add("hidden");
    Wrapper.classList.remove("hidden");
  } else {
    D.querySelector(".No_Note-wrapper").classList.remove("hidden");
    Wrapper.classList.add("hidden");
  }
}
function ShowPopUp() {
  popUp_Header.innerHTML = `<i class="fa fa-book-bookmark"></i> Add a new Note`;
  SaveBtn.innerHTML = `Save Note`;
  InputTitle.value = "";
  InputTitle.focus();
  InputDesc.value = "";
  IsUpdated = false;
  popUp_wrapper.classList.add("show");
  addBox.classList.add("hidden");
}

function ClosePopUp() {
  popUp_wrapper.classList.remove("show");
  addBox.classList.remove("hidden");
  Note_indicator();
}

addBox.addEventListener("click", ShowPopUp);
closeBtn.addEventListener("click", ClosePopUp);

function CloseOptions() {
  Options.classList.remove("show");
}
function OpenOptions(e) {
  e.parentElement.querySelector(".options").classList.toggle("show");
  D.addEventListener("click", (i) => {
    if (i.target.tagName != "I" || i.target == e) {
      e.parentElement.querySelector(".options").classList.remove("show");
    }
  });
}
function deleteNote(noteID) {
  notes.splice(noteID, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  AddNotes();
  Note_indicator();
}
function editNote(noteID) {
  ShowPopUp();
  popUp_Header.innerHTML = `<i class="fa fa-edit"></i> Edit Note`;
  SaveBtn.innerHTML = `Save changes`;
  InputTitle.focus();
  InputTitle.value = notes[noteID].title;
  InputDesc.value = notes[noteID].description;
  IsUpdated = true;
  updatedID = noteID;
}

SaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let NoteTitle = InputTitle.value;
  let NoteDesc = InputDesc.value;
  if (NoteTitle || NoteDesc) {
    let dateOBJ = new Date(),
      month = months[dateOBJ.getMonth()],
      day = dateOBJ.getDate(),
      year = dateOBJ.getFullYear(),
      Hours = dateOBJ.getHours(),
      Minutes = dateOBJ.getMinutes();
    if (Hours < 10) {
      Hours = `0${Hours}`;
    }
    if (Minutes < 10) {
      Minutes = `0${Minutes}`;
    }
    let NoteInfo = {
      title: NoteTitle,
      description: NoteDesc,
      date: `${month}, ${day},${year}`,
      time: `${Hours} : ${Minutes}`,
    };
    if (!IsUpdated) {
      notes.push(NoteInfo);
    } else {
      IsUpdated = false;
      notes[updatedID] = NoteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closeBtn.click();
    AddNotes();
    Note_indicator();
  }
});

function AddNotes() {
  D.querySelectorAll(".note").forEach((e) => e.remove());
  notes.forEach((E, index) => {
    let NoteHTML = `
    <li class="note">
    <div class="details-wrapper">
      <div class="details">
        <h2 class="details-header">
          ${E.title}
        </h2>
      </div>
      <span class="details-text"
        > ${E.description}
      </span>
    </div>
    <div class="content">
      <div class="content-time">
        <span>
          <i class="fa fa-calendar-alt"></i>
          <em>${E.date}</em>
        </span>
        <span>
        <i class="fa fa-clock-four"></i>
          ${E.time}
        </span>
      </div>
      <div class="options-wrapper">
        <div onclick="OpenOptions(this)" class="getOptions">
          <i class="fa fa-bars-staggered"></i>
        <div class="options">
          <button onclick="editNote(${index})" class="BtnEdit" type="button">
            Edit
            <i class="fa fa-edit"></i>
          </button>
          <button onclick="deleteNote(${index})" class="BtnDelete" type="button">
            Delete
            <i class="fa fa-delete-left"></i>
          </button>
        </div>
        </div>
      </div>
    </div>
  </li>`;
    Wrapper.insertAdjacentHTML("beforeend", NoteHTML);
  });
}
D.addEventListener("DOMContentLoaded", () => {
  AddNotes();
  Note_indicator();
});
