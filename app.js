showNotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click",function(){
    let addtext = document.getElementById("addtext");
    let addtitle = document.getElementById("addtitle");
    let notes = localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addtitle.value,
        text: addtext.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    console.log(notesObj);
    addtext.value="";
    addtitle.value="";
    showNotes();

});
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index) {
        html+=`<div class="notecard my-2 mx-2 card" style="width: 18rem;">

        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>
        </div>


    </div>`
        
        
    });
    let notesElem = document.getElementById('notes');
    if(notesObj.length!=0)
    {
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML=`Nothing to show! Use 'Add Note' to add your notes.`
    }

}
//function to delete notes
function deleteNode(index){
    console.log("Iam deleting", index );
    let notes = localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();


}
let search = document.getElementById("searchtxt");
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    let notecards = document.getElementsByClassName("notecard");
    
    Array.from(notecards).forEach(function(element){
        let cardtext = element.getElementsByTagName("p")[0].innerText;
        console.log(cardtext);
        let cardtitle = element.getElementsByTagName("h5")[0].innerText;
        if(cardtext.includes(inputVal) || cardtitle.includes(inputVal))
        {
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })

});
