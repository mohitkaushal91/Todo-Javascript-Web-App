var num = 1;
var arr = [];

function addTask() {
    let task = document.getElementById('task');

    let add = `<div id=task${num} class="listoftasks">`;
    add += `<input type="checkbox" onchange="taskStatusChange(${num})" id="check${num}">`
    add += `<span id="name${num}">${task.value}</span>`
    add += `<button onclick=removeTask(${num})>Remove</button>`
    add += `</div>`

    document.getElementById('alltasks').innerHTML += add;
    task.value = '';
    num++;
    arr.forEach(element => {
        document.getElementById(`check${element}`).checked = true;
    });
    numberOfTasks();
}

function taskStatusChange(id) {
    let status = document.getElementById(`check${id}`).checked;
    if (status) {
        arr.push(id);
        document.getElementById(`name${id}`).style.textDecoration = "line-through";
    }
    else {
        let index = arr.indexOf(id);
        if (index > -1) {
            arr.splice(index, 1);
        }
        document.getElementById(`name${id}`).style.textDecoration = "none";
    }
    numberOfTasks();
}

function hideCompleted() {
    let checkstatus = document.getElementById(`hidecomplete`).checked;

    if (checkstatus) {
        for (var i = 1; i < num; i++) {
            let doc = document.getElementById(`check${i}`);
            if (doc != null) {
                let status = doc.checked;
                if (status) {
                    document.getElementById(`task${i}`).style.display = "none";
                }
            }
        }
    }
    else {
        for (var i = 1; i < num; i++) {
            let doc = document.getElementById(`check${i}`);
            if (doc != null) {
                let status = doc.checked;
                if (status) {
                    document.getElementById(`task${i}`).style.display = "block";
                }
            }
        }
    }
}


function removeTask(id) {
    let div = event.target.parentNode;
    let out = div.parentNode;
    out.removeChild(div);
    numberOfTasks();
}

function filtertasks() {
    let searchtext = document.getElementById('searchText').value;
    let finalsearch = searchtext.toUpperCase();
    for (var i = 1; i < num; i++) {
        let a = document.getElementById(`name${i}`);
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(finalsearch) > -1) {
            document.getElementById(`task${i}`).style.display = "";
        } else {
            document.getElementById(`task${i}`).style.display = "none";
        }
    }
}

function numberOfTasks() {
    let numTask = 0;
    for (var i = 1; i < num; i++) {
        let doc = document.getElementById(`check${i}`);
        if (doc != null) {
            let status = doc.checked;
            if (!status) {
                numTask++;
            }
        }
    }
    document.getElementById('numtasks').innerHTML = `<h3>You have ${numTask} todos left</h3>`;
}