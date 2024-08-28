let isDOBOpen = false;
let dateofBirth;
let intervalId;
const settingCogEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const toggleDateofBirthSelector = () => {
    if (isDOBOpen) {
        settingContentEl.classList.add("hide");
    } else {
        settingContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;
    console.log("Toggle", isDOBOpen);
};

const updateAge = () => {
    const currentDate = new Date();
    let year = currentDate.getFullYear() - dateofBirth.getFullYear();
    let month = currentDate.getMonth() - dateofBirth.getMonth();
    let day = currentDate.getDate() - dateofBirth.getDate();
    let hour = currentDate.getHours() - dateofBirth.getHours();
    let minute = currentDate.getMinutes() - dateofBirth.getMinutes();
    let second = currentDate.getSeconds() - dateofBirth.getSeconds();

    if (second < 0) {
        second += 60;
        minute--;
    }
    if (minute < 0) {
        minute += 60;
        hour--;
    }
    if (hour < 0) {
        hour += 24;
        day--;
    }
    if (day < 0) {
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        day += previousMonth.getDate();
        month--;
    }
    if (month < 0) {
        month += 12;
        year--;
    }

    yearEl.innerHTML = year;
    monthEl.innerHTML = month;
    dayEl.innerHTML = day;
    hourEl.innerHTML = hour;
    minuteEl.innerHTML = minute;
    secondEl.innerHTML = second;
};

const setDOBHandler = () => {
    const dateString = dobInputEl.value;
    dateofBirth = dateString ? new Date(dateString) : null;

    if (dateofBirth) {
        initialTextEl.classList.add("hide");
        afterDOBBtnTxtEl.classList.remove("hide");

        if (intervalId) {
            clearInterval(intervalId);
        }
        updateAge(); // Call it once to update immediately
        intervalId = setInterval(updateAge, 1000);
    } else {
        afterDOBBtnTxtEl.classList.add("hide");
        initialTextEl.classList.remove("hide");

        if (intervalId) {
            clearInterval(intervalId);
        }
    }
};

// Ensure elements exist before adding event listeners
if (settingCogEl && dobButtonEl) {
    settingCogEl.addEventListener("click", toggleDateofBirthSelector);
    dobButtonEl.addEventListener("click", setDOBHandler);
}