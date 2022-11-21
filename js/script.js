{
  let tasks = [];
  let hideDoneTasks = false;


  const cleanInput = () => {
    document.querySelector(".form__input").value = "";
    document.querySelector(".form__input").focus();

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
    tasks = [...tasks, { content: newTaskContent }
    ];

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


  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };


  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };


  const renderTasks = () => {
    const taskToHTML = task => `
      <li class="
       new__task tasksList${task.done && hideDoneTasks ? " tasks__item--hidden" : ""} 
      ">

      <button class="tasks__button tasks__button--toggleDone js-toggleDone">
        ${task.done ? " ✓" : ""}
        </button>
      <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
      ${task.content}
      </span>
      <button class="tasks__button tasks__button--remove js-remove">
        🗑
        </button>
      </li>
      `

    const taskElement = document.querySelector(".tasksList");
    taskElement.innerHTML = tasks.map(taskToHTML).join("");
  };


  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    };

    buttonsElement.innerHTML = `
      <button class="buttons__button js-toggleHideDoneTasksButton">
        ${hideDoneTasks ? "Pokaz" : "Ukryj"} ukończone
      </button>
      <button class="buttons__button js-markAllDone"
        ${tasks.every(({ done }) => done) ? " disabled " : ""}
      >
      Ukończ wszystkie
      </button>
    `;
  };


  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    };

    const toggleHideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasksButton");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    };
  };


  const render = () => {
    renderTasks();
    bindRemoveEvents();
    bindToggleDoneEvents();
    renderButtons();
    bindButtonsEvents();
    
  };


  const onFormSubmit = (event) => {
    event.preventDefault();
    
    const newTaskContent = document.querySelector(".form__input").value.trim();
    if (newTaskContent === "") {
      return;
    };

    addNewTask(newTaskContent);
    cleanInput();
  };


  const init = () => {
  
    render();

    const form = document.querySelector(".form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}