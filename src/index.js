document.addEventListener("DOMContentLoaded", () => {
  // your code here
  //select DOM variables we'll need
  const form = document.querySelector("#create-task-form");
  const taskUl = document.querySelector("#tasks");
  const taskArray = [];

  function renderTask(taskValue, priorityColor) {
    const li = document.createElement("li");
    li.innerHTML = `${taskValue}  <button id="delete-button">Delete</button>`;
    li.style.color = priorityColor
    taskUl.append(li)
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskValue = event.target.querySelector("#new-task-description").value;
    const priorityColor = event.target.querySelector("#priority-color").value;
    const newTask = {desc: taskValue, color: priorityColor}
    taskArray.push(newTask);
    console.log(taskArray)
    renderTask(newTask.desc, newTask.color)
    
    // const li = document.createElement("li");
    // li.innerHTML = `${taskValue}  <button id="delete-button">Delete</button>`;
    // li.style.color = priorityColor
    // taskUl.append(li)
  });

  taskUl.addEventListener("click", function(e){
    if (e.target.nodeName === "BUTTON") {
      e.target.parentElement.remove();
    }
  })
});
