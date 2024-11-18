document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input-text");
  const addButton = document.getElementById("add-button");
  const taskList = document.getElementById("task-list");

  // Add task to the list
  addButton.addEventListener("click", function () {
    const task = input.value.trim();

    if (task) {
      addTask(task);
      input.value = ""; // Clear input field
    } else {
      alert("Please enter a task!");
    }
  });

  // Function to create and add a task to the list
  function addTask(taskText) {
    const listItem = document.createElement("li");

    // Task text (editable)
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    editButton.addEventListener("click", function () {
      if (editButton.textContent === "Edit") {
        // Enable editing
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = taskSpan.textContent;

        listItem.replaceChild(inputField, taskSpan); // Replace span with input
        inputField.focus(); // Automatically focus on the input field
        editButton.textContent = "Save";
      } else {
        // Save changes
        const inputField = listItem.querySelector("input");
        const updatedTask = inputField.value.trim();

        if (updatedTask) {
          taskSpan.textContent = updatedTask;
          listItem.replaceChild(taskSpan, inputField); // Replace input with updated span
          editButton.textContent = "Edit";
        } else {
          alert("Task cannot be empty!");
        }
      }
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      listItem.remove();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
  }
});
