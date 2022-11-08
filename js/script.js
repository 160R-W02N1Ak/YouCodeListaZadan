{
  const tasks = [
    {
      content: "zadanie 1",
      done: false,
    },
    {
      content: "zadanie 2",
      done: true,
    },
  ];

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
      <li>
      ${task.content}
      </li>
      `;

    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

   const init = () => {
    render();

   };

   init();

}