// Element Selectors - abhinavgautam08
var taskInput = document.getElementById('taskInput');
var addTaskBtn = document.getElementById('addTaskBtn');
var taskList = document.getElementById('taskList');
var statsCounter = document.getElementById('statsCounter'); 
var productivityBar = document.getElementById('productivityBar');
var productivityPercentage = document.getElementById('productivityPercentage');

// tailwind config - abhinavgautam08
tailwind.config = {
  darkMode: "class",
  theme: { extend: {
      colors: { "on-secondary-container": "#646464","surface-container": "#eeeeee","on-primary-fixed": "#410000","surface-variant": "#e2e2e2","on-error": "#ffffff","surface-tint": "#c00000","outline": "#946e68","on-tertiary-fixed": "#1b1b1b","surface-container-lowest": "#ffffff","on-surface": "#1a1c1c","surface-container-high": "#e8e8e8","error-container": "#ffdad6","primary-fixed-dim": "#ffb4a8","primary-container": "#e60000","on-error-container": "#93000a","on-secondary": "#ffffff","primary-fixed": "#ffdad4","on-tertiary-fixed-variant": "#474747","surface-container-highest": "#e2e2e2","primary": "#b70100","inverse-on-surface": "#f0f1f1","surface-dim": "#dadada","surface-bright": "#f9f9f9","on-surface-variant": "#5f3f3a","error": "#ba1a1a","secondary-fixed": "#e2e2e2","secondary-fixed-dim": "#c6c6c6","tertiary-container": "#727272","on-background": "#1a1c1c","on-primary-container": "#fff7f5","background": "#f9f9f9","outline-variant": "#e9bcb5","on-tertiary": "#ffffff","tertiary-fixed": "#e2e2e2","surface": "#f9f9f9","on-secondary-fixed": "#1b1b1b","inverse-surface": "#2f3131","inverse-primary": "#ffb4a8","tertiary": "#5a5a5a","on-tertiary-container": "#f8f8f8","secondary": "#5e5e5e","secondary-container": "#e2e2e2","on-secondary-fixed-variant": "#474747","surface-container-low": "#f3f3f4","on-primary": "#ffffff","tertiary-fixed-dim": "#c6c6c6","on-primary-fixed-variant": "#930100"
      },
      fontFamily: { "headline": ["Space Grotesk"],"body": ["Space Grotesk"],"label": ["Space Grotesk"]
      },
      borderRadius: {"DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "9999px"},
    },
  },
}

// Initialize State - abhinavgautam08
var tasks = [];
var currentFilter = 'all';

// Load from Local Storage - abhinavgautam08
var savedTasks = localStorage.getItem("myTasks");
if (savedTasks !== null) {
    tasks = JSON.parse(savedTasks);
}
// Function to save tasks to Local Storage - abhinavgautam08
function saveTasks() {
    var tasksString = JSON.stringify(tasks);
    localStorage.setItem("myTasks", tasksString);
}

function renderTasks() {
    // Clear the list first - abhinavgautam08
    taskList.innerHTML = "";
    
    var completedCount = 0;
    // Use a basic for loop - abhinavgautam08
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
        
        if (task.completed === true) {
            completedCount = completedCount + 1;
        }
        // Filter logic: Skip this task if it doesn't match the current filter - abhinavgautam08
        if (currentFilter === 'completed' && task.completed === false) {
            continue;
        }
        if (currentFilter === 'pending' && task.completed === true) {
            continue;
        }

        var li = document.createElement('li');
        // Setup classes with if/else
        var liClass = "task-row group flex items-center justify-between p-4 lg:p-6 border-b-4 border-on-background hover:bg-surface-container-high transition-colors ";
        if (task.completed === true) {
            liClass = liClass + "bg-white";
        } else {
            liClass = liClass + "bg-surface-variant";
        }
        li.className = liClass;
        
        var checkboxHtml = "";
        if (task.completed === true) {
            checkboxHtml = '<input type="checkbox" class="brutalist-checkbox shrink-0" checked onchange="toggleTask(' + task.id + ')"/>';
        } else {
            checkboxHtml = '<input type="checkbox" class="brutalist-checkbox shrink-0" onchange="toggleTask(' + task.id + ')"/>';
        }

        var textClass = "task-title text-lg lg:text-xl font-black uppercase text-on-background w-full block ";
        if (task.completed === true) {
            textClass = textClass + "line-through opacity-50";
        }
        // Build HTML string by adding pieces together - abhinavgautam08
        var htmlContent = "";
        htmlContent = htmlContent + '<div class="flex items-center gap-4 lg:gap-6 flex-1">';
        htmlContent = htmlContent + checkboxHtml;
        htmlContent = htmlContent + '<div class="flex-1 mr-4">';
        // Use a span instead of an input field for extreme simplicity - abhinavgautam08
        htmlContent = htmlContent + '<span class="' + textClass + '">' + task.text + '</span>';
        htmlContent = htmlContent + '</div>';
        htmlContent = htmlContent + '</div>';
        htmlContent = htmlContent + '<div class="flex items-center gap-2 lg:gap-4 ml-4">';
        htmlContent = htmlContent + '<button onclick="editTask(' + task.id + ')" class="material-symbols-outlined text-on-background opacity-40 hover:opacity-100 hover:text-primary transition-all ml-2" title="Edit">edit</button>';
        htmlContent = htmlContent + '<button onclick="deleteTask(' + task.id + ')" class="material-symbols-outlined text-on-background opacity-40 hover:opacity-100 hover:text-primary transition-all" title="Delete">delete</button>';
        htmlContent = htmlContent + '</div>';
        
        li.innerHTML = htmlContent;
        taskList.appendChild(li);
    }
    
    updateStats(completedCount, tasks.length);
}

function updateStats(completed, total) {
    if (statsCounter !== null) {
        var remaining = total - completed;
        statsCounter.innerText = remaining + " Remaining / " + completed + " Completed / " + total + " Total";
    }
    
    if (productivityPercentage !== null && productivityBar !== null) {
        var productivity = 0;
        if (total > 0) {
            productivity = Math.round((completed / total) * 100);
        }
        
        productivityPercentage.innerText = productivity + "%";
        productivityBar.style.width = productivity + "%";
    }
}
