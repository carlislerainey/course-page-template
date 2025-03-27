
document.addEventListener("DOMContentLoaded", () => {
  loadSchedule().catch(err => {
    console.error("Failed to load schedule:", err);
    document.getElementById("schedule").innerHTML =
      "<tr><td colspan='6'>Failed to load schedule. Please try again later.</td></tr>";
  });
});

async function loadSchedule() {
  const res = await fetch('schedule.json');
  const data = await res.json();
  const table = document.getElementById('schedule');
  const today = new Date();
  today.setHours(9, 0, 0, 0);

  data.forEach(week => {
    const weekDate = new Date(week.date);
    weekDate.setHours(9, 0, 0, 0);
    const diff = (weekDate - today) / (1000 * 60 * 60 * 24);
    const status = diff > 0 ? 'future' : diff < -7 ? 'past' : '';

    const tr = document.createElement("tr");
    tr.className = `week ${status}`;
    tr.innerHTML = `
      <td>${week.week}</td>
      <td>${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(weekDate)}</td>
      <td>${makeLink(week.slides, "Slides")}</td>
      <td>${makeLink(week.notes, "Notes")}</td>
      <td>${makeLink(week.exercises, "Exercises")}</td>
      <td>${makeLink(week.solutions, "Solutions")}</td>
    `;
    table.appendChild(tr);

    const topicsRow = document.createElement("tr");
    topicsRow.className = status;
    topicsRow.innerHTML = `<td colspan="6" class="topics">${week.topics.join("; ")}</td>`;
    table.appendChild(topicsRow);
  });
}

function makeLink(href, label) {
  if (!href) return "";
  const ext = href.split(".").pop().toLowerCase();
  const iconMap = {
    pdf: "bi-filetype-pdf",
    html: "bi-filetype-html"
  };
  const icon = iconMap[ext] || "";
  return `<a class="btn btn-outline-primary btn-sm" role="button" aria-label="${label}" href="${href}"><i class="bi ${icon}"></i> ${label}</a>`;
}
