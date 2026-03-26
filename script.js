let applications = [];
let editingId = null;

function loadData() {
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
        applications = JSON.parse(saved);
    } 
    renderTable();
    updateStats();
}

function saveData() {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
}

function addApplication() {
    const newApp = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        position: '',
        company: '',
        type: 'Full-time',
        workMode: 'Hybryda',
        level: 'Junior',
        status: 'Wysłana',
        location: '',
        salary: '',
        source: '',
        notes: ''
    };
    applications.unshift(newApp);
    editingId = newApp.id;
    renderTable();
    updateStats();
}

function deleteApplication(id) {
    if (confirm('Czy na pewno chcesz usunąć tę aplikację?')) {
        applications = applications.filter(app => app.id !== id);
        saveData();
        renderTable();
        updateStats();
    }
}

function startEdit(id) {
    editingId = id;
    renderTable();
}

function saveEdit(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const app = applications.find(a => a.id === id);
    
    app.date = row.querySelector('.edit-date').value;
    app.position = row.querySelector('.edit-position').value;
    app.company = row.querySelector('.edit-company').value;
    app.type = row.querySelector('.edit-type').value;
    app.workMode = row.querySelector('.edit-workMode').value;
    app.level = row.querySelector('.edit-level').value;
    app.status = row.querySelector('.edit-status').value;
    
    const locationSelect = row.querySelector('.edit-location');
    const locationOther = row.querySelector('.edit-location-other');
    app.location = locationSelect.value === 'inne' && locationOther ? locationOther.value : locationSelect.value;
    
    app.salary = row.querySelector('.edit-salary').value;
    app.source = row.querySelector('.edit-source').value;
    app.notes = row.querySelector('.edit-notes').value;

    editingId = null;
    saveData();
    renderTable();
    updateStats();
}

function cancelEdit() {
    const app = applications.find(a => a.id === editingId);
    if (app && !app.position && !app.company) {
        applications = applications.filter(a => a.id !== editingId);
    }
    editingId = null;
    renderTable();
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (applications.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = applications.map(app => {
        const isEditing = editingId === app.id;
        
        if (isEditing) {
            return `
                <tr data-id="${app.id}">
                    <td><input type="date" class="edit-date" value="${app.date}"></td>
                    <td><input type="text" class="edit-position" value="${app.position}" placeholder="Nazwa stanowiska"></td>
                    <td><input type="text" class="edit-company" value="${app.company}" placeholder="Nazwa firmy"></td>
                    <td>
                        <select class="edit-type">
                            <option ${app.type === 'Nie sprecyzowano' ? 'selected' : ''}>Nie sprecyzowano</option>
                            <option ${app.type === 'Full-time' ? 'selected' : ''}>Full-time</option>
                            <option ${app.type === 'Part-time' ? 'selected' : ''}>Part-time</option>
                            <option ${app.type === 'Kontrakt' ? 'selected' : ''}>Kontrakt</option>
                            <option ${app.type === 'Praktyki' ? 'selected' : ''}>Praktyki</option>
                        </select>
                    </td>
                    <td>
                        <select class="edit-workMode">
                            <option ${app.workMode === 'Nie sprecyzowano' ? 'selected' : ''}>Nie sprecyzowano</option>
                            <option ${app.workMode === 'Stacjonarnie' ? 'selected' : ''}>Stacjonarnie</option>
                            <option ${app.workMode === 'Hybryda' ? 'selected' : ''}>Hybryda</option>
                            <option ${app.workMode === 'Zdalnie' ? 'selected' : ''}>Zdalnie</option>
                        </select>
                    </td>
                    <td>
                        <select class="edit-level">
                            <option ${app.level === 'Staż' ? 'selected' : ''}>Staż</option>
                            <option ${app.level === 'Junior' ? 'selected' : ''}>Junior</option>
                            <option ${app.level === 'Mid' ? 'selected' : ''}>Mid</option>
                            <option ${app.level === 'Senior' ? 'selected' : ''}>Senior</option>
                        </select>
                    </td>
                    <td>
                        <select class="edit-status">
                            <option ${app.status === 'Wysłana' ? 'selected' : ''}>Wysłana</option>
                            <option ${app.status === 'W trakcie' ? 'selected' : ''}>W trakcie</option>
                            <option ${app.status === 'Rozmowa' ? 'selected' : ''}>Rozmowa</option>
                            <option ${app.status === 'Oferta' ? 'selected' : ''}>Oferta</option>
                            <option ${app.status === 'Odrzucona' ? 'selected' : ''}>Odrzucona</option>
                            <option ${app.status === 'Wycofana' ? 'selected' : ''}>Wycofana</option>
                        </select>
                    </td>
                    <td>
                        <select class="edit-location">
                            <option value="">Wybierz miasto</option>
                            <option ${app.location === 'Warszawa' ? 'selected' : ''}>Warszawa</option>
                            <option ${app.location === 'Kraków' ? 'selected' : ''}>Kraków</option>
                            <option ${app.location === 'Wrocław' ? 'selected' : ''}>Wrocław</option>
                            <option ${app.location === 'Poznań' ? 'selected' : ''}>Poznań</option>
                            <option ${app.location === 'Gdańsk' ? 'selected' : ''}>Gdańsk</option>
                            <option ${app.location === 'Łódź' ? 'selected' : ''}>Łódź</option>
                            <option ${app.location === 'Katowice' ? 'selected' : ''}>Katowice</option>
                            <option ${app.location === 'Szczecin' ? 'selected' : ''}>Szczecin</option>
                            <option ${app.location === 'Bydgoszcz' ? 'selected' : ''}>Bydgoszcz</option>
                            <option ${app.location === 'Lublin' ? 'selected' : ''}>Lublin</option>
                            <option ${app.location === 'Białystok' ? 'selected' : ''}>Białystok</option>
                            <option ${app.location === 'Zdalnie' ? 'selected' : ''}>Zdalnie</option>
                            <option ${app.location === 'Cała Polska' ? 'selected' : ''}>Cała Polska</option>
                            <option value="inne" ${!['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Łódź', 'Katowice', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Zdalnie', 'Cała Polska'].includes(app.location) && app.location ? 'selected' : ''}>Inne</option>
                        </select>
                        ${!['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Łódź', 'Katowice', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Zdalnie', 'Cała Polska'].includes(app.location) && app.location ? 
                            `<input type="text" class="edit-location-other" value="${app.location}" placeholder="Wpisz miasto" style="margin-top: 5px;">` : ''}
                    </td>
                    <td><input type="text" class="edit-salary" value="${app.salary}" placeholder="np. 8000-10000"></td>
                    <td><input type="text" class="edit-source" value="${app.source}" placeholder="np. LinkedIn"></td>
                    <td><textarea class="edit-notes" rows="2" placeholder="Dodaj notatki...">${app.notes}</textarea></td>
                    <td>
                        <button class="action-btn btn-save" onclick="saveEdit(${app.id})">✓</button>
                        <button class="action-btn btn-cancel" onclick="cancelEdit()">✕</button>
                    </td>
                </tr>
            `;
        } else {
            return `
                <tr data-id="${app.id}">
                    <td>${app.date}</td>
                    <td>${app.position}</td>
                    <td>${app.company}</td>
                    <td><span class="badge type-${app.type.toLowerCase().replace('-', '')}">${app.type}</span></td>
                    <td><span class="badge mode-${app.workMode.toLowerCase()}">${app.workMode}</span></td>
                    <td><span class="badge level-${app.level.toLowerCase()}">${app.level}</span></td>
                    <td><span class="badge status-${app.status.toLowerCase().replace(' ', '')}">${app.status}</span></td>
                    <td>${app.location}</td>
                    <td>${app.salary}</td>
                    <td>${app.source}</td>
                    <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${app.notes}</td>
                    <td>
                        <button class="action-btn btn-edit" onclick="startEdit(${app.id})">✏️</button>
                        <button class="action-btn btn-delete" onclick="deleteApplication(${app.id})">🗑️</button>
                    </td>
                </tr>
            `;
        }
    }).join('');
}

function updateStats() {
    document.getElementById('stat-all').textContent = applications.length;
    document.getElementById('stat-progress').textContent = 
        applications.filter(a => a.status === 'W trakcie' || a.status === 'Rozmowa').length;
    document.getElementById('stat-offers').textContent = 
        applications.filter(a => a.status === 'Oferta').length;
    document.getElementById('stat-rejected').textContent = 
        applications.filter(a => a.status === 'Odrzucona').length;
}

function exportToCSV() {
    const headers = ['Data aplikacji', 'Nazwa stanowiska', 'Firma', 'Typ pracy', 'Forma pracy', 
                     'Poziom', 'Status aplikacji', 'Lokalizacja', 'Wynagrodzenie', 'Źródło', 'Notatki'];
    
    const rows = applications.map(app => [
        app.date, app.position, app.company, app.type, app.workMode,
        app.level, app.status, app.location, app.salary, app.source, app.notes
    ]);

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(',')) 
    ].join('\n');

    const BOM = '\uFEFF'; 
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `aplikacje_o_prace_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
}

function importFromCSV(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        if(lines.length < 2) {
            alert("Plik CSV jest pusty lub zawiera same nagłówki.");
            return;
        }

        const overwrite = confirm("Znalazłem aplikacje w pliku. Czy chcesz całkowicie nadpisać swoje obecne aplikacje? \n(Kliknij OK aby nadpisać, Anuluj aby dopisać do istniejących)");

        let newApplications = overwrite ? [] : [...applications];

        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
            
            const cleanRow = row.map(cell => cell.replace(/^"|"$/g, '').trim());

            if(cleanRow.length >= 3) { 
                const importedApp = {
                    id: Date.now() + i, 
                    date: cleanRow[0] || '',
                    position: cleanRow[1] || '',
                    company: cleanRow[2] || '',
                    type: cleanRow[3] || 'Full-time',
                    workMode: cleanRow[4] || 'Hybryda',
                    level: cleanRow[5] || 'Junior',
                    status: cleanRow[6] || 'Wysłana',
                    location: cleanRow[7] || '',
                    salary: cleanRow[8] || '',
                    source: cleanRow[9] || '',
                    notes: cleanRow[10] || ''
                };
                newApplications.push(importedApp);
            }
        }
        
        applications = newApplications;
        saveData();
        renderTable();
        updateStats();
        
        event.target.value = '';
        alert("Pomyślnie zaimportowano plik CSV!");
    };
    reader.readAsText(file);
}


loadData();