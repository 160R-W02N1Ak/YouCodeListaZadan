{
  let tasks = [];
  let hideDoneTasks = false;

  /* czyści input i ustawia focus */

  const cleanInput = () => {
    document.querySelector(".js-newTask").value = "";
    document.querySelector(".js-newTask").focus();
  };


  /* dodaje nowe zadanie bez done i odpala render */

  /*const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });
    }; wersja przed immutability */

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];
    render();
  };



  /*  dostaje index z zadania i za pomoca splice usuwa zadanie + render*/

  /*const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    }  wersja przed immutability */

  const removeTask = (taskIndex) => {
    tasks = [
      ...tasks.slice(0, taskIndex),
      ...tasks.slice(taskIndex + 1),
    ];
    render();
  };



  /* dostaje index i zmienia wartosc done + render */

  /*const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    } wersja przed immutability */

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

  /* renderuje zawartosc html  */
  const render = () => {
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
    bindEvents();
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