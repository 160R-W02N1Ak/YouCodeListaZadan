{
  let tasks = [];
  let hideDoneTasks = false;


  const cleanInput = () => {
    document.querySelector(".js-newTask").value = "";
    document.querySelector(".js-newTask").focus();
    render();
  };


  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };


  const toggleTaskDone = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      {
        ...tasks[taskIndex],
        done: !tasks[taskIndex].done,
      },
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };


  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  





  

  

  /* przyciski */
  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  }

  const renderTasks = () => {
    let htmlString = "";
    for (const task of tasks) {
      htmlString += `
      <li class="new__task js-tasks">
      <button class="tasks__button tasks__button--toggleDone js-toggleDone">${task.done ? " ✓" : ""}</button>
      <span class="tasks__content${task.done ? " tasks__content--done" : ""}">${task.content}</span>
      <button class="tasks__button tasks__button--remove js-remove">🗑</button>
      </li>
      `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const renderButtons = () => {};

  const bindButtonsEvents = () => {};

  
  const render = () => {

    renderTasks();
    renderButtons();
    
    bindEvents();
    /*bindToggleDoneEvents();*/
    bindButtonsEvents();

  };


  /* pobiera treść formularza */

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    if (newTaskContent === "") {
      return;
    }
    addNewTask(newTaskContent);
    cleanInput();
  };


  /* funkcja init  */
  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };
  init();
}
