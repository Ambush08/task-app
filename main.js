const taskInput = document.getElementById('task-input');

const dateInput = document.getElementById('date-input');

const addTaskBtn = document.getElementById('add-task-btn');

const taskContainer = document.getElementById('tasks-container');

class todo {
        constructor(task, date, isComplete) {
            this.task = task;
            this.date = date;
            this.isComplete = isComplete;
        }
    }

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks(tasks);

let editIndex = -1;

addTaskBtn.addEventListener('click', function() {

    if(!taskInput.value || !dateInput.value) {
        alert('Please Enter task and date.');
        return;
    } 

    if(editIndex === -1) {
        const todoTask = new todo(taskInput.value, dateInput.value, false);
         tasks.push(todoTask);
    } else {
        tasks[editIndex].task = taskInput.value;
        tasks[editIndex].date = dateInput.value;

        editIndex = -1;
    }

    updateButtonText();
        
   
    localStorage.setItem('tasks', JSON.stringify(tasks));
     
    renderTasks()
     taskInput.value = '';
     dateInput.value = '';
});


function renderTasks() {

    taskContainer.innerHTML = '';
    for(let i = 0; i < tasks.length; i++){

        let task = document.createElement('div');
        task.classList.add('task-list');

        let taskList = document.createElement('li');
        taskList.classList.add('task');
        taskList.innerText = tasks[i].task;
        task.appendChild(taskList);

        let dateList = document.createElement('li');
        dateList.classList.add('date');
        dateList.innerText = tasks[i].date;
        task.appendChild(dateList);

        let completeTask = document.createElement('button');
        completeTask.classList.add('complete-task');
         if(tasks[i].isComplete) {
                completeTask.innerText = 'Completed';
                completeTask.style.backgroundColor = 'black';
            } else {
                completeTask.innerText = 'Complete';
            }
        task.appendChild(completeTask);

        let editTask = document.createElement('button');
        editTask.classList.add('edit-task');
        editTask.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        task.appendChild(editTask);

        let deleteTask = document.createElement('button');
        deleteTask.classList.add('delete-task');
        deleteTask.innerHTML = '<i class="fa-solid fa-trash"></i>';
        task.appendChild(deleteTask);

        taskContainer.appendChild(task);

        completeTask.addEventListener('click', function() {
            tasks[i].isComplete = !tasks[i].isComplete;

            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });

        editTask.addEventListener('click', () => {

            if(!tasks[i].isComplete) {
                taskInput.value = tasks[i].task;
                dateInput.value = tasks[i].date;

                editIndex = i;

                updateButtonText();
            }
        })

        deleteTask.addEventListener('click', () => {

            tasks.splice([i], 1);
            
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        })
    }
}

function updateButtonText() {
    addTaskBtn.innerText = editIndex === -1 ? 'Add Task' : 'Update';
}