const taskArray = [];

document.addEventListener("DOMContentLoaded", () => {
  // your code here
  //select DOM variables we'll need
  const form = document.querySelector("#create-task-form");
  const taskUl = document.querySelector("#tasks");

  function renderTask(taskValue, priorityColor) {
    const li = document.createElement("li");
    li.innerHTML = `${taskValue} 
    <button id="edit-button" class="editButton">Edit</button> <button id="delete-button" class="deleteButton">Delete</button>
    <form id="edit-form" action="#" method="post" style= "display: none;">
    <label for="new-task-description">Task description:</label>
    <input type="text" id="new-task-description" name="new-task-description" placeholder="description">
    <label for="new-task-priority">Priority:</label>
    <select name="new-task-priority" id="priority-color">
    <option value="red">Red</option>
    <option value="yellow">Yellow</option>
    <option value="green">Green</option>
    </select>
    <input type="submit" value="Edit">
    </form>`;
    li.style.color = priorityColor
    taskUl.append(li)
  }



  form.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskValue = event.target.querySelector("#new-task-description").value;
    const priorityColor = event.target.querySelector("#priority-color").value;

    let num = 1;
    if (priorityColor === "yellow") {
        num = 2;
    } else if (priorityColor === "green") {
        num = 3;
    }

    const newTask = {desc: taskValue, color: priorityColor, priorityNum: num}
    taskArray.push(newTask);
    console.log(taskArray)

    //sort Arr
    function compare(a, b) {
      let comparison = 0;
      if (a.priorityNum < b.priorityNum) {
        comparison = -1;
      } else if (a.priorityNum > b.priorityNum) {
        comparison = 1;
      }
      return comparison;
    }

    taskArray.sort(compare);
    event.target.reset()
    taskUl.innerHTML = ""
    taskArray.forEach(function(task){
      renderTask(task.desc, task.color)
    })
  });

  taskUl.addEventListener("click", function(e){
    if (e.target.className === "deleteButton") {
      e.target.parentElement.remove();
    } else if (e.target.className === "editButton") {
      const editForm = document.querySelector("#edit-form");
      editForm.style.display = "block";
      editForm.addEventListener("submit", function(e){
        e.preventDefault();
        const taskValue = event.target.querySelector("#new-task-description").value;
        const priorityColor = event.target.querySelector("#priority-color").value;
        console.log(e.target.parentElement)
        e.target.parentElement.style.color = priorityColor
        e.target.parentElement.innerHTML = `    
        ${taskValue} 
        <button id="edit-button" class="editButton">Edit</button> <button id="delete-button" class="deleteButton">Delete</button>
        <form id="edit-form" action="#" method="post" style= "display: none;">
        <label for="new-task-description">Task description:</label>
        <input type="text" id="new-task-description" name="new-task-description" placeholder="description">
        <label for="new-task-priority">Priority:</label>
        <select name="new-task-priority" id="priority-color">
        <option value="red">Red</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        </select>
        <input type="submit" value="Edit">
        </form>
        `
        // e.target.parentElement.style.color = priorityColor
      })
    }
  })
});