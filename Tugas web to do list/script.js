const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const themeToggle = document.getElementById("theme-toggle")
const themePanel = document.getElementById("theme-panel")
const themeMenu = document.querySelector(".theme-menu")

const themes = {
    red: { accent: "#ff3b30", soft: "#350b0b" },
    green: { accent: "#2ee70d", soft: "#07200d" },
    yellow: { accent: "#fff01f", soft: "#382d05" },
    pink: { accent: "#ff69b4", soft: "#3b1027" },
    cyan: { accent: "#00d9ff", soft: "#062f38" },
    blue: { accent: "#287bff", soft: "#071d3d" },
    purple: { accent: "#8a2be2", soft: "#1d0b38" },
    orange: { accent: "#ff8c00", soft: "#3b2005" },
    magenta: { accent: "#ff00aa", soft: "#3b0528" }
}

function applyTheme(theme) {
    document.documentElement.style.setProperty("--accent", theme.accent)
    document.documentElement.style.setProperty("--accent-soft", theme.soft)
}

function setTheme(name) {
    const selectedTheme = themes[name] || themes.green
    applyTheme(selectedTheme)
    localStorage.setItem("theme", name)
}

themeToggle.addEventListener("click", function () {
    const isOpen = !themePanel.hidden
    themePanel.hidden = isOpen
    themeToggle.setAttribute("aria-expanded", String(!isOpen))
})

document.addEventListener("click", function (event) {
    if (!themeMenu.contains(event.target)) {
        themePanel.hidden = true
        themeToggle.setAttribute("aria-expanded", "false")
    }
})

document.querySelectorAll(".theme-option[data-theme]").forEach(function (option) {
    option.addEventListener("click", function () {
        setTheme(option.dataset.theme)
    })
})

const savedTheme = localStorage.getItem("theme") || "green"
setTheme(themes[savedTheme] ? savedTheme : "green")

inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    if(inputBox.value === '') {
        alert("Ketik sesuatu woik")
    }

    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML)
}
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data")
}
showTask();