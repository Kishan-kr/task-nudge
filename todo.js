
/* colors
  pic  #48577D  light purple (white) (complicated)
  pic  #C1AAAD  onion pink (selected)
  pic  #082E41  darkest blue (white text) (selected)
  pic  #731F4D  dark pink (white text) (selected)
  pic  #073936  dark grean (white) (selected)
  pic  #3A0D12  dark maroon (white) (selected)
  pic  #E4846C  light orange selected
  pic  #593F73  purple
  pic  #555454  grey
  pic  #085933  leaf green
  pic  #2F736C  teal blue  
  pic  #037d6c teal
  pic  #966f11 dark yellow

*/
// Font colors 
let fontColors = {
    dark : "#212529",
    light : "#d5d5d5",

}

// colors
let colors = {
    none:"#D9D8D7",
    blueTiber:"#082E41",
    ming:"#2F736C",
    townyPort:"#731F4D",
    zuccini:"#085933",
    paco:"#3A0D12",
    observatory:"#037d6c",
    mulledWine:"#593F73",
    eastBay:"#48577D",
    butteredRum:"#966f11",
    coldTurkey:"#C1AAAD",
    greenTiber:"#073936",
    emporer:"#555454",
    terraCotta:"#E4846C",

    key: function(n) {
        return this[Object.keys(this)[n]];
    }
}


// nav bar 
let isNavOpen = false;
let bar = document.getElementById('nav-bars');
let navButton = document.getElementById('navButton');
let navbar = document.getElementById('navbar');
bar.onclick = () => {
    if(!isNavOpen) {
        navButton.classList.remove('fa-bars');
        navButton.classList.add('fa-times');
        navbar.style.display = 'block';
        isNavOpen = true;
    }
    else {
        navButton.classList.remove('fa-times');
        navButton.classList.add('fa-bars');
        navbar.style.display = 'none';
        isNavOpen = false;
    }
}

// task container
let taskContainer = document.getElementById('task-container');
let emptyTask = document.getElementById('empty-task');

// To check if container is empty or not 
isEmpty();
function isEmpty() {
    if(taskContainer.children.length > 1) {
        emptyTask.classList.remove('d-flex');
        emptyTask.style.display = 'none';
    }
    else {
        emptyTask.style.display = 'flex';
        emptyTask.classList.add('d-flex');
    }
}

// save task 
let saveTask = document.getElementById('save-task');
saveTask.onclick = () => {
    let isValidate = taskValidation();
    if(isValidate) {
        newTitle = document.getElementById('new-title');
        newDesc = document.getElementById('description');
        // newLabel = document.getElementById('new-label'); temporarily disabled
        createNewTask(newTitle.value,newDesc.value/*,newLabel.value*/);
        newTitle.value = "";
        newDesc.value = "";
        document.getElementById('createNewTask').style.display = 'none';
    }
}

// creating new task 
function createNewTask(title,desc,label) {
    let newtask = document.createElement('DIV');
    newtask.classList.add('tasks','border','border-success');

    let incomplete = document.createElement('DIV');
    incomplete.classList.add('incomplete');
    let icon = document.createElement('I');
        icon.classList.add('fas','fa-check-circle');
    
    let newtitle = document.createElement('INPUT');
    newtitle.classList.add('task-title');
    newtitle.value = title;
    setTitleWidth(newtitle);
    newtitle.disabled = true;
    
    let newlabel = document.createElement('DIV');
    newlabel.classList.add('task-label');
    newlabel.innerHTML = label;

    let newdescription = document.createElement('TEXTAREA');
    newdescription.setAttribute('cols', '150');
    newdescription.classList.add('task-desc');
    newdescription.innerText = desc;
    setDescWidth(newdescription);
    newdescription.disabled = true;

    let expandButton = document.createElement('DIV');
    expandButton.classList.add('expand-btn');
    let expandIcon = document.createElement('DIV');
    expandIcon.classList.add('expButton');
    expandButton.appendChild(expandIcon);

    let deletetask = document.createElement('BUTTON');
    deletetask.classList.add('delete-task');
    deletetask.innerHTML = '&times';

    // creating task-footer 
    let taskFooter = document.createElement('DIV');
    taskFooter.classList.add('task-footer');
    let colorPaletteBtn = document.createElement('BUTTON');
    colorPaletteBtn.classList.add('color-palette');
    let colorPaletteIcon = document.createElement('I');
    colorPaletteIcon.classList.add('fas', 'fa-palette', 'fa-2x');
    colorPaletteIcon.style.color = "#212529";
    colorPaletteBtn.appendChild(colorPaletteIcon);
    taskFooter.appendChild(colorPaletteBtn);

    // creating color panel 
    let colorPanel = document.createElement('DIV');
    colorPanel.classList.add('color-panel');
    let colorHeading = document.createElement('DIV');
    colorHeading.innerText = 'Colors';
    colorHeading.classList.add('color-heading');
    let taskColors = document.createElement('DIV');
    taskColors.classList.add('task-colors');
    let closeColorPanel = document.createElement('BUTTON');
    closeColorPanel.classList.add('closePanelBtn');
    closeColorPanel.innerHTML = '&times;';
    colorPanel.appendChild(closeColorPanel);
    colorPanel.appendChild(colorHeading);
    colorPanel.appendChild(taskColors);
    
    for(let colorIdx = 0; colorIdx < Object.keys(colors).length-1; colorIdx++) {
        colorBtn = document.createElement('BUTTON');
        colorBtn.classList.add('color-btn');
        colorBtn.style.backgroundColor = colors.key(colorIdx);
        taskColors.appendChild(colorBtn);
    }

    // appending children 
    incomplete.appendChild(icon);
    newtask.appendChild(incomplete);
    newtask.appendChild(newtitle);
    newtask.appendChild(newdescription);
    newtask.appendChild(newlabel);
    newtask.appendChild(deletetask);
    newtask.appendChild(taskFooter);
    newtask.appendChild(colorPanel);
    newtask.appendChild(expandButton);
    taskContainer.appendChild(newtask);
    showHideLabel(newtask);
    updateTask();
}

// show or hide label 
function showHideLabel() {
    let task = taskContainer.lastElementChild;
    if(task.children[3].innerHTML == '') {
    task.children[3].style.visibility = 'hidden';
    }
}

// removing tasks 
deleteTask();
function deleteTask() {
    for(let deleteBtn of document.querySelectorAll('.tasks .delete-task')) {
        deleteBtn.onclick = () => {deleteBtn.parentElement.remove(); isEmpty();}
    }
}

// marking done 
toggleDone();
function toggleDone() {
    for(let check of document.querySelectorAll('.tasks .incomplete')) {
        check.onclick = () => {
            check.classList.toggle('done');
            (check.nextElementSibling).classList.toggle('strikethrough');
        }
    }
}

function updateTask() {
    toggleColorPanel();
    toggleDone();
    changeTaskColor();
    showHideLabel();
    toggleTasks();
    deleteTask();
    isEmpty();
}

function taskValidation() {
    newTitle = document.getElementById('new-title');
    newDesc = document.getElementById('description');
    if(newTitle.value != "" && newDesc.value != "") 
        return true;
    return false;
}

// opening and closing a task
toggleTasks();
function toggleTasks() {
    for(let expandBtn of document.getElementsByClassName('expand-btn')) {
        expandBtn.onclick = () => {
            let task = expandBtn.parentElement;
            if(!expandBtn.className.includes('contract-btn')) {
                contractAllTasks();
                task.children[1].style.width = '85%';
                task.children[1].style.borderBottom = '1px solid grey';
                task.children[2].style.width = '85%';
                task.children[5].style.display = 'block';
                
            }
            else {
                setTitleWidth(task.children[1]);
                task.children[1].style.borderBottom = 'none';
                setDescWidth(task.children[2]);
                task.children[5].style.display = 'none';
            }
            task.classList.toggle('expanded');
            expandBtn.classList.toggle('contract-btn');
            task.children[2].classList.toggle('expand-desc');
            task.children[1].disabled = !task.children[1].disabled;
            task.children[2].disabled = !task.children[2].disabled;
        }
    }
}

function contractAllTasks() {
    for(let task of document.querySelectorAll('.tasks')) {
        task.classList.remove('expanded');
        task.children[7].classList.remove('contract-btn');
        task.children[2].classList.remove('expand-desc');
        task.children[1].disabled = true;
        task.children[2].disabled = true;
        task.children[5].style.display = 'none';
        task.children[6].classList.remove('color-panel-open');
        setTitleWidth(task.children[1]);
        task.children[1].style.borderBottom = 'none';
        setDescWidth(task.children[2]);
    }
}

function setTitleWidth(title) {
    title.style.width = (title.value.length + 1) + 'ch';
}

function setDescWidth(desc) {
    desc.style.width = (desc.value.length + 1) + 'ch';
}

function toggleColorPanel() {
    // open color panel
    for(let colorPalette of document.querySelectorAll('.task-footer .color-palette')) {
        colorPalette.onclick = () => {
            let parent = colorPalette.parentElement;
            let colorPanel = parent.nextElementSibling;
            openedPanel = parent.nextElementSibling;
            colorPanel.classList.add('color-panel-open');
        }
    }

    // closing color panel 
    for(let closePanel of document.querySelectorAll('.color-panel .closePanelBtn')) {
        closePanel.onclick = () => {
            let parent = closePanel.parentElement;
            parent.classList.remove('color-panel-open');
        }
    }
}
// changing backgroundColor 
function changeTaskColor() {
    for(let color of document.querySelectorAll('.color-panel .color-btn')) {
        color.onclick = () => {
            let parent = color.parentElement;
            let task = parent.parentElement.parentElement;
            var n = Array.prototype.indexOf.call(parent.children, color);;
            task.style.backgroundColor = colors.key(n);
            setTaskFontColor(task, n);
        }
    }
}
// Set font color of task heading and description
function setTaskFontColor(task, colorIdx) {
    if(colorIdx != 0) {
        task.children[1].style.color = fontColors.light;
        task.children[2].style.color = fontColors.light;
        task.children[5].children[0].children[0].style.color = fontColors.light;
    }
    else {
        task.children[1].style.color = fontColors.dark;
        task.children[2].style.color = fontColors.dark;
        task.children[5].children[0].children[0].style.color = fontColors.dark;
    }
}

// Navigation 
let navTitle = document.getElementById('nav-bars').nextElementSibling.firstElementChild;
navbar.children[0].onclick = () => {showPickedTask(0);}
navbar.children[1].onclick = () => {showPickedTask(1);}
navbar.children[3].onclick = () => {showPickedTask(3);}

async function showPickedTask(linkNum) {
    await showAllTasks();
    for(let task of document.querySelectorAll('.tasks')) {
        // Tasks To Do (0)
        if(linkNum == 0) {
            navTitle.innerText = "To Do";
            if(task.children[0].className.includes('done')) {
                task.style.display = 'none';
            }
        }
        
        // Completed Tasks 
        if(linkNum == 1) {
            navTitle.innerText = "Done";
            if(!task.children[0].className.includes('done')) {
                task.style.display = 'none';
            }
        }
    }
}

function showAllTasks() {
    for(let task of document.querySelectorAll('.tasks')) {
        navTitle.innerText = "Tasks";
        task.style.display = 'flex';
    }
}