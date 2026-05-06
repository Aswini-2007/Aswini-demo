// Initial Default Subjects


window.onload = () => {
    const saved = localStorage.getItem('myTimetable');
    if (saved) {
        document.getElementById('timetableBody').innerHTML = saved;
    } else {
        // Load defaults if storage is empty
        defaultData.forEach(item => renderSubject(item.name, item.day, item.time));
    }
};

function handleAdd() {
    const name = document.getElementById('subjectInput').value;
    const day = document.getElementById('dayInput').value;
    const time = document.getElementById('timeInput').value;

    if (!name || !time) return alert("Please enter subject and time");

    renderSubject(name, day, time);
    document.getElementById('subjectInput').value = '';
    saveToStorage();
}

function renderSubject(name, day, time) {
    const tbody = document.getElementById('timetableBody');
    let row = document.querySelector(`tr[data-time="${time}"]`);

    if (!row) {
        row = document.createElement('tr');
        row.setAttribute('data-time', time);
        row.innerHTML = `<td class="time-col">${time}</td><td></td><td></td><td></td><td></td><td></td>`;
        tbody.appendChild(row);
        sortRows();
    }

    // Determine color class based on subject name
    let colorClass = "color-default";
    const lowerName = name.toLowerCase();
    if (lowerName.includes("math")) colorClass = "color-math";
    else if (lowerName.includes("scien") || lowerName.includes("phys") || lowerName.includes("chem")) colorClass = "color-science";
    else if (lowerName.includes("eng")) colorClass = "color-english";
    else if (lowerName.includes("hist")) colorClass = "color-history";

    const cells = row.querySelectorAll('td');
    cells[day].innerHTML = `<span class="subject-tag ${colorClass}">${name}</span>`;
}

function sortRows() {
    const tbody = document.getElementById('timetableBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    rows.sort((a, b) => a.getAttribute('data-time').localeCompare(b.getAttribute('data-time')));
    rows.forEach(row => tbody.appendChild(row));
}

function saveToStorage() {
    localStorage.setItem('myTimetable', document.getElementById('timetableBody').innerHTML);
}

function clearAll() {
    if (confirm("Delete all subjects?")) {
        localStorage.removeItem('myTimetable');
        location.reload();
    }
}

// Determine color class based on subject name
        let colorClass = "color-default";
        const lowerName = name.toLowerCase();
        
        if (lowerName.includes("math")) colorClass = "color-math";
        else if (lowerName.includes("scien") || lowerName.includes("phys") || lowerName.includes("chem")) colorClass = "color-science";
        else if (lowerName.includes("eng")) colorClass = "color-english";
        else if (lowerName.includes("hist")) colorClass = "color-history";
        else if (lowerName.includes("java")) colorClass = "color-java"; // Add this line!
