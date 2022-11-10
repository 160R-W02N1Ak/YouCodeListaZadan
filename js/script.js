{
  const tasks = [];


 

  /* dodaje nowe zadanie bez done i odpala render */

  const addNewTask = (newTaskContent) => {
    tasks.push({
      content: newTaskContent,
    });

    render();
  };
  /*  dostaje index z zadania i za pomoca splice usuwa zadanie + render*/
  const removeTask = (taskIndex) => {
    tasks.splice(taskIndex, 1);
    render();
  }

  /* dostaje index i zmienia wartosc done + render */
  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();

  }
  /* przyciski */
  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);

      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-done");

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
      <li class="new__task">
      <button class="js-done">${task.done ? " ✓" : ""}</button>
      <button class="js-remove">🗑</button>
      ${task.content }
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

    


  };

  
/* funkcja init  */
  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();

}