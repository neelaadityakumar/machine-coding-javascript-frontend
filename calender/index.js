const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const getMonthsFragment = () => {
  const fragment = document.createDocumentFragment();
  MONTHS.map((month) => {
    const option = document.createElement("option");
    option.textContent = month;
    fragment.appendChild(option);
  });
  return fragment;
};

const getYearsFragment = (date = proxy.today) => {
  const fragment = document.createDocumentFragment();
  const currentYear = date.getFullYear();

  for (let year = currentYear - 100; year < currentYear + 10; year++) {
    const option = document.createElement("option");
    option.textContent = year;
    fragment.appendChild(option);
  }

  return fragment;
};

const getWeekDaysFragment = (type) => {
  const fragment = document.createDocumentFragment();
  WEEK_DAYS.map((weekDay) => {
    const span = document.createElement(type);
    span.textContent = weekDay;
    fragment.appendChild(span);
  });
  return fragment;
};

const getDaysFragment = (month, year) => {
  const fragment = document.createDocumentFragment();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let day = 0; day < firstDay; day++) {
    const span = document.createElement("span");
    span.textContent = "";
    fragment.appendChild(span);
  }

  for (let date = 1; date <= lastDate; date++) {
    const button = document.createElement("button");
    button.textContent = date;
    button.classList.add("date-" + date);
    fragment.appendChild(button);
  }

  return fragment;
};

const prevBtn = document.querySelector(".prev");
const monthEl = document.querySelector(".month");
const yearEl = document.querySelector(".year");
const nextBtn = document.querySelector(".next");
const weekDaysEl = document.querySelector(".week-days");
const daysEl = document.querySelector(".days");
const todayBtn = document.querySelector(".btn-today");
const selectedDateEl = document.querySelector(".selected-date");

const date = new Date();
const calendar = {
  today: date,
  selectedDate: date,
  month: date.getMonth(),
  year: date.getFullYear(),
};
const calendarProxy = new Proxy(calendar, {
  set: function (target, key, value) {
    if (key === "selectedDate") {
      target[key] = new Date(calendar.year, calendar.month, value);
      updateSelectedDate();
      return true;
    }

    target[key] = value;
    updateCalendar();
    calendar.selectedDate = new Date(
      calendar.year,
      calendar.month,
      calendar.today.getDate()
    );
    updateSelectedDate();
    return true;
  },
});

const populateControls = (date = calendarProxy.today) => {
  const monthOptions = getMonthsFragment();
  monthEl.appendChild(monthOptions);
  monthEl.selectedIndex = date.getMonth();

  const yearOptions = getYearsFragment(date);
  yearEl.appendChild(yearOptions);
  yearEl.selectedIndex = 100;
};

const populateWeekDays = () => {
  weekDaysEl.innerHTML = "";
  weekDaysEl.appendChild(getWeekDaysFragment("span"));
};

const setMonthYear = (
  month = calendarProxy.month,
  year = calendarProxy.year
) => {
  monthEl.selectedIndex = month;
  yearEl.value = year;
};

const populateDays = (date = calendarProxy.today) => {
  const days = getDaysFragment(calendarProxy.month, calendarProxy.year);
  daysEl.innerHTML = "";
  daysEl.appendChild(days);

  const isCurrentMonth =
    date.getMonth() === monthEl.selectedIndex &&
    date.getFullYear() === +yearEl.value;
  if (isCurrentMonth) {
    daysEl.classList.add("current-month");
  } else {
    daysEl.classList.remove("current-month");
  }

  daysEl.querySelector(`.date-${date.getDate()}`)?.classList.add("today");
};

const updateCalendar = () => {
  setMonthYear();
  populateDays();
};

const updateSelectedDate = () => {
  daysEl.querySelector(".selected")?.classList.remove("selected");
  daysEl
    .querySelector(`.date-${calendarProxy.selectedDate.getDate()}`)
    ?.classList.add("selected");
  selectedDateEl.textContent = calendarProxy.selectedDate.toDateString();
};

prevBtn.addEventListener("click", () => {
  const prevDate = new Date(calendarProxy.year, calendarProxy.month, 0);
  if (prevDate.getFullYear() < calendarProxy.today.getFullYear() - 100) {
    return;
  }

  if (prevDate) {
    calendarProxy.month = prevDate.getMonth();
    calendarProxy.year = prevDate.getFullYear();
  }
});

nextBtn.addEventListener("click", () => {
  const nextDate = new Date(calendarProxy.year, calendarProxy.month + 1, 1);
  if (nextDate.getFullYear() >= calendarProxy.today.getFullYear() + 10) {
    return;
  }

  if (nextDate) {
    calendarProxy.month = nextDate.getMonth();
    calendarProxy.year = nextDate.getFullYear();
  }
});

monthEl.addEventListener(
  "change",
  () => (calendarProxy.month = monthEl.selectedIndex)
);
yearEl.addEventListener("change", () => (calendarProxy.year = +yearEl.value));
todayBtn.addEventListener("click", () => {
  calendarProxy.month = calendarProxy.today.getMonth();
  calendarProxy.year = calendarProxy.today.getFullYear();
});
daysEl.addEventListener("click", (e) => {
  if (e.target.className.includes("date")) {
    calendarProxy.selectedDate = e.target.textContent;
  }
});

populateControls();
populateWeekDays();
populateDays();
updateSelectedDate();
