const digitMap = {
  0: ["a", "b", "c", "d", "e", "f"],
  1: ["b", "c"],
  2: ["a", "b", "g", "e", "d"],
  3: ["a", "b", "g", "c", "d"],
  4: ["f", "g", "b", "c"],
  5: ["a", "f", "g", "c", "d"],
  6: ["a", "f", "g", "e", "c", "d"],
  7: ["a", "b", "c"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"],
};

function createDigit(num) {
  const digit = document.createElement("div");
  digit.className = "digit";

  ["a", "b", "c", "d", "e", "f", "g"].forEach((seg) => {
    const segDiv = document.createElement("div");
    segDiv.className = `segment seg-${seg}`;
    if (digitMap[num] && digitMap[num].includes(seg)) {
      segDiv.classList.add("on");
    }
    digit.appendChild(segDiv);
  });

  return digit;
}

function createColon() {
  const colon = document.createElement("div");
  colon.className = "colon";
  colon.innerHTML = `<div class="dot"></div><div class="dot"></div>`;
  return colon;
}

function updateClock() {
  const clock = document.getElementById("clock");
  clock.innerHTML = "";

  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  const timeStr = h + ":" + m + ":" + s;

  for (let char of timeStr) {
    if (char === ":") {
      clock.appendChild(createColon());
    } else {
      clock.appendChild(createDigit(char));
    }
  }
}

setInterval(updateClock, 1000);
updateClock();

// search for the digit element with the class name "digit" and the id "digit-0"
document
  .getElementById("searchInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = this.value.trim();
      if (query) {
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(
          query
        )}`;
      }
    }
  });

//   calendar
function getSegments(digit) {
  const map = {
    0: ["a", "b", "c", "d", "e", "f"],
    1: ["b", "c"],
    2: ["a", "b", "g", "e", "d"],
    3: ["a", "b", "g", "c", "d"],
    4: ["f", "g", "b", "c"],
    5: ["a", "f", "g", "c", "d"],
    6: ["a", "f", "e", "d", "c", "g"],
    7: ["a", "b", "c"],
    8: ["a", "b", "c", "d", "e", "f", "g"],
    9: ["a", "b", "c", "d", "f", "g"],
  };
  return map[digit] || [];
}

// Render digit using segment divs
function renderSegmentedDigit(num) {
  const segments = ["a", "b", "c", "d", "e", "f", "g"];
  const onSegments = getSegments(num);
  return `
      <div class="date-digit">
        ${segments
          .map(
            (seg) => `
          <div class="date-segment date-seg-${seg} ${
              onSegments.includes(seg) ? "on" : ""
            }"></div>
        `
          )
          .join("")}
      </div>
    `;
}

// Update the bottom date box
function updateCalendarBox() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0"); // "05"
  const shortWeekday = now.toLocaleString("default", { weekday: "short" }); // "Sat"

  document.getElementById("calendar-date").textContent = day;
  document.getElementById("calendar-day").textContent = shortWeekday;
}

updateCalendarBox();
setInterval(updateCalendarBox, 60 * 1000);
