// popup slect
let popUp = document.getElementById("popup")
let addBox = document.getElementById("add_box")
let crossBtn = document.getElementById("cross_btn")

let submitBtn = document.getElementById("submit_btn")
let inputTitle = document.getElementById("input_title")
let inpurDescreption = document.getElementById("input_descreption")

let popupTitle = document.getElementById("popuptitle")


// month list
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// get item form localstorage
let noteArr = JSON.parse(localStorage.getItem("noteList")) || [];


// show popup
addBox.addEventListener("click", function () {
    popUp.classList.add("show")
})

// cross popup
crossBtn.addEventListener("click", function () {
    popUp.classList.remove("show")
    submitBtn.innerText = "Add New Note"
    popupTitle.innerText = "Add Note"
    inputTitle.value = ""
    inpurDescreption.value = ""
})

// let get item
let isUpdate = false, updateId;

// show in frontend

function show() {
    let wrapperId = document.getElementById("wrapper_id")
    document.querySelectorAll(".note").forEach(note => note.remove())
    noteArr.map((noteItem, index) => {
        let noteItemDiv = document.createElement("li")
        noteItemDiv.className = "note"

        noteItemDiv.innerHTML = `
            <div class="details">
                <p>${noteItem.title}</p>
                <span>${noteItem.descreption}</span>
            </div>
            <div class="bottom_content">
                <span>${noteItem.noteDate}</span>
                <div class="setting">
                    <i class="fa-solid fa-ellipsis"></i>
                    <ul class="action">
                        <li class="edit" onclick="editNote(${index}, '${noteItem.title}', '${noteItem.descreption}')"><i class="fa-solid fa-pen-to-square"></i></li>
                        <li class="delete" onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i></li>
                    </ul>
                </div>
            </div>
        `
        wrapperId.appendChild(noteItemDiv)
    })
}

// delete item
function deleteNote(index){
    noteArr.splice(index, 1)
    localStorage.setItem("noteList", JSON.stringify(noteArr))
    show()
}

// edit item
function editNote(index, title, descreption){
    isUpdate = true
    updateId = index
    inputTitle.value = title
    inpurDescreption.value = descreption
    popupTitle.innerText = "Upadte Note"
    submitBtn.innerText = "Upadte Note"
    addBox.click()
}

// set item local host
submitBtn.addEventListener("click", function (e) {
    e.preventDefault()
    let inputTitleValue = inputTitle.value
    let descrepTion = inpurDescreption.value


    if (inputTitleValue || descrepTion) {
        let getDate = new Date()
        let day = getDate.getDay()
        let month = months[getDate.getMonth()]
        let year = getDate.getFullYear()
        let date = `${month}, ${day}, ${year}`

        const noteInfo = {
            title: inputTitleValue,
            descreption: descrepTion,
            noteDate: date
        }
        
        if(!isUpdate){
            noteArr.push(noteInfo)
        }else{
            console.log(noteArr[updateId] = noteInfo);
        }

        // set local sttage
        localStorage.setItem("noteList", JSON.stringify(noteArr))
        show()
        crossBtn.click()
    }
})

show()