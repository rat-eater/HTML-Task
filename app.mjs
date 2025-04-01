document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks
    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            taskItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                ${task.completed ? '<span class="done">Done</span>' : ''}
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            `;
            taskList.appendChild(taskItem);
        });
    };

    // Add task
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            renderTasks();
        }
    };

    // Edit task
    window.editTask = (index) => {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            tasks[index].text = newTaskText.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Delete task
    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Complete task
    window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Event listener for adding a task
    addTaskButton.addEventListener('click', addTask);

    renderTasks();
});