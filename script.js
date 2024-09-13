let addTaskBtn = document.getElementById('addTask');
let todoContainer = document.getElementById('todo');

let count = 1;
addTaskBtn.addEventListener("click", ()=>{
    let card = document.createElement('div');
    card.setAttribute("class", "card");
    card.setAttribute("contenteditable", true);
    card.innerHTML = "New Task"
    card.id = `task-${count++}`;
    todoContainer.appendChild(card);

    card.addEventListener("click", (events)=>{
        let selectedCard = events.target;
        if (selectedCard.innerHTML == "New Task") {
            selectedCard.innerHTML = "";
        }
    });

    card.addEventListener("blur", (events)=>{
        let blurredCard = events.target;
        if (blurredCard.innerHTML.trim() === "") {
            blurredCard.remove();
        }
    });

    card.addEventListener("dragstart", (e)=>{
        card.style.opacity = 0.1;
        e.dataTransfer.setData('text', card.id);
    })

    card.addEventListener("dragend", ()=>{
        card.style.opacity = 1;
    })

    
    let dragEvents = ['dragover', 'dragenter', 'drop'];

    for (let drag of dragEvents) {

        let columns = document.querySelectorAll(".column");

        for (let col of columns) {
            col.addEventListener(drag, (e) =>{
                e.preventDefault();

                if (drag == "drop") {
                    let cardId = e.dataTransfer.getData('text');
                    let targetCard = document.getElementById(cardId);
                    col.append(targetCard)
                }
            })
        }
    }
    
});