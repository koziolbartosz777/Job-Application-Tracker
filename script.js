let applications = [];
let editingId = null;
let currentLang = localStorage.getItem('appLang') || 'pl';

const translations = {
    pl: {
        title: "📋 Tracker Aplikacji o Pracę", subtitle: "Zarządzaj swoimi aplikacjami w jednym miejscu",
        btnAdd: "➕ Dodaj aplikację", btnExport: "💾 Eksportuj", btnImport: "📂 Importuj",
        statAll: "Wszystkie", statInProgress: "W trakcie", statOffers: "Oferty", statRejected: "Odrzucone",
        colDate: "Data", colPosition: "Stanowisko", colCompany: "Firma", colType: "Typ", colMode: "Forma",
        colLevel: "Poziom", colStatus: "Status", colLocation: "Lokalizacja", colSalary: "Wynagrodzenie",
        colSource: "Źródło", colNotes: "Notatki", colActions: "Akcje",
        emptyTitle: "Brak aplikacji", emptyDesc: "Kliknij 'Dodaj aplikację' lub zaimportuj plik CSV, aby rozpocząć!",
        confirmDelete: "Czy na pewno chcesz usunąć tę aplikację?",
        confirmOverwrite: "Znalazłem aplikacje w pliku. Czy chcesz całkowicie nadpisać swoje obecne aplikacje? \n(Kliknij OK aby nadpisać, Anuluj aby dopisać do istniejących)",
        importSuccess: "Pomyślnie zaimportowano plik CSV!",
        importError: "Plik CSV jest pusty lub zawiera same nagłówki.",
        phPosition: "Nazwa stanowiska", phCompany: "Nazwa firmy", phCity: "Wpisz miasto", phSalary: "np. 8000-10000", phSource: "np. LinkedIn", phNotes: "Dodaj notatki...",
        "Nie sprecyzowano": "Nie sprecyzowano", "Full-time": "Full-time", "Part-time": "Part-time", "Kontrakt": "Kontrakt", "Praktyki": "Praktyki",
        "Stacjonarnie": "Stacjonarnie", "Hybryda": "Hybryda", "Zdalnie": "Zdalnie",
        "Staż": "Staż", "Junior": "Junior", "Mid": "Mid", "Senior": "Senior",
        "Wysłana": "Wysłana", "W trakcie": "W trakcie", "Rozmowa": "Rozmowa", "Oferta": "Oferta", "Odrzucona": "Odrzucona", "Wycofana": "Wycofana",
        "Wybierz miasto": "Wybierz miasto", "Cała Polska": "Cała Polska", "Inne": "Inne"
    },
    en: {
        title: "📋 Job Application Tracker", subtitle: "Manage your applications in one place",
        btnAdd: "➕ Add Application", btnExport: "💾 Export", btnImport: "📂 Import",
        statAll: "All", statInProgress: "In Progress", statOffers: "Offers", statRejected: "Rejected",
        colDate: "Date", colPosition: "Position", colCompany: "Company", colType: "Type", colMode: "Work Mode",
        colLevel: "Level", colStatus: "Status", colLocation: "Location", colSalary: "Salary",
        colSource: "Source", colNotes: "Notes", colActions: "Actions",
        emptyTitle: "No applications found", emptyDesc: "Click 'Add Application' or import a CSV file to start!",
        confirmDelete: "Are you sure you want to delete this application?",
        confirmOverwrite: "Applications found in file. Do you want to completely overwrite your current list? \n(Click OK to overwrite, Cancel to append)",
        importSuccess: "CSV file imported successfully!",
        importError: "CSV file is empty or contains only headers.",
        phPosition: "Job Title", phCompany: "Company Name", phCity: "Enter city", phSalary: "e.g. 8000-10000", phSource: "e.g. LinkedIn", phNotes: "Add notes...",
        "Nie sprecyzowano": "Not specified", "Full-time": "Full-time", "Part-time": "Part-time", "Kontrakt": "Contract", "Praktyki": "Internship",
        "Stacjonarnie": "On-site", "Hybryda": "Hybrid", "Zdalnie": "Remote",
        "Staż": "Internship", "Junior": "Junior", "Mid": "Mid", "Senior": "Senior",
        "Wysłana": "Sent", "W trakcie": "In Progress", "Rozmowa": "Interview", "Oferta": "Offer", "Odrzucona": "Rejected", "Wycofana": "Withdrawn",
        "Wybierz miasto": "Select city", "Cała Polska": "Poland (All)", "Inne": "Other"
    },
    de: {
        title: "📋 Bewerbungs-Tracker", subtitle: "Verwalten Sie Ihre Bewerbungen an einem Ort",
        btnAdd: "➕ Hinzufügen", btnExport: "💾 Exportieren", btnImport: "📂 Importieren",
        statAll: "Alle", statInProgress: "Im Gange", statOffers: "Angebote", statRejected: "Abgelehnt",
        colDate: "Datum", colPosition: "Position", colCompany: "Firma", colType: "Typ", colMode: "Arbeitsmodell",
        colLevel: "Level", colStatus: "Status", colLocation: "Standort", colSalary: "Gehalt",
        colSource: "Quelle", colNotes: "Notizen", colActions: "Aktionen",
        emptyTitle: "Keine Bewerbungen", emptyDesc: "Klicken Sie auf 'Hinzufügen' oder importieren Sie eine CSV!",
        confirmDelete: "Möchten Sie diese Bewerbung wirklich löschen?",
        confirmOverwrite: "Bewerbungen gefunden. Möchten Sie Ihre aktuelle Liste überschreiben? \n(OK für Überschreiben, Abbrechen zum Hinzufügen)",
        importSuccess: "CSV-Datei erfolgreich importiert!",
        importError: "CSV-Datei ist leer oder enthält nur Kopfzeilen.",
        phPosition: "Jobtitel", phCompany: "Firmenname", phCity: "Stadt eingeben", phSalary: "z.B. 8000-10000", phSource: "z.B. LinkedIn", phNotes: "Notizen hinzufügen...",
        "Nie sprecyzowano": "Nicht angegeben", "Full-time": "Vollzeit", "Part-time": "Teilzeit", "Kontrakt": "Vertrag", "Praktyki": "Praktikum",
        "Stacjonarnie": "Vor Ort", "Hybryda": "Hybrid", "Zdalnie": "Remote",
        "Staż": "Praktikum", "Junior": "Junior", "Mid": "Mid", "Senior": "Senior",
        "Wysłana": "Gesendet", "W trakcie": "Im Gange", "Rozmowa": "Interview", "Oferta": "Angebot", "Odrzucona": "Abgelehnt", "Wycofana": "Zurückgezogen",
        "Wybierz miasto": "Stadt wählen", "Cała Polska": "Ganz Polen", "Inne": "Andere"
    }
};

function t(key) {
    return translations[currentLang][key] || key;
}

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('appLang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    document.getElementById('langSwitch').value = lang;

    renderTable();
    updateStats();
}

function loadData() {
    const saved = localStorage.getItem('jobApplications');
    if (saved) {
        applications = JSON.parse(saved);
    } 
    changeLanguage(currentLang); 
}


function saveData() {
    localStorage.setItem('jobApplications', JSON.stringify(applications));
}

function addApplication() {
    const newApp = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        position: '', company: '',
        type: 'Full-time', workMode: 'Hybryda', level: 'Junior', status: 'Wysłana',
        location: '', salary: '', source: '', notes: ''
    };
    applications.unshift(newApp);
    editingId = newApp.id;
    renderTable();
    updateStats();
}

function deleteApplication(id) {
    if (confirm(t('confirmDelete'))) {
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
    
    const buildOptions = (arr, currentValue) => arr.map(val => `<option value="${val}" ${currentValue === val ? 'selected' : ''}>${t(val)}</option>`).join('');

    tbody.innerHTML = applications.map(app => {
        const isEditing = editingId === app.id;
        
        if (isEditing) {
            return `
                <tr data-id="${app.id}">
                    <td><input type="date" class="edit-date" value="${app.date}"></td>
                    <td><input type="text" class="edit-position" value="${app.position}" placeholder="${t('phPosition')}"></td>
                    <td><input type="text" class="edit-company" value="${app.company}" placeholder="${t('phCompany')}"></td>
                    <td><select class="edit-type">${buildOptions(['Nie sprecyzowano', 'Full-time', 'Part-time', 'Kontrakt', 'Praktyki'], app.type)}</select></td>
                    <td><select class="edit-workMode">${buildOptions(['Nie sprecyzowano', 'Stacjonarnie', 'Hybryda', 'Zdalnie'], app.workMode)}</select></td>
                    <td><select class="edit-level">${buildOptions(['Staż', 'Junior', 'Mid', 'Senior'], app.level)}</select></td>
                    <td><select class="edit-status">${buildOptions(['Wysłana', 'W trakcie', 'Rozmowa', 'Oferta', 'Odrzucona', 'Wycofana'], app.status)}</select></td>
                    <td>
                        <select class="edit-location">
                            <option value="">${t('Wybierz miasto')}</option>
                            ${buildOptions(['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Łódź', 'Katowice', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Zdalnie', 'Cała Polska'], app.location)}
                            <option value="inne" ${!['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Łódź', 'Katowice', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Zdalnie', 'Cała Polska'].includes(app.location) && app.location ? 'selected' : ''}>${t('Inne')}</option>
                        </select>
                        ${!['Warszawa', 'Kraków', 'Wrocław', 'Poznań', 'Gdańsk', 'Łódź', 'Katowice', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Białystok', 'Zdalnie', 'Cała Polska'].includes(app.location) && app.location ? 
                            `<input type="text" class="edit-location-other" value="${app.location}" placeholder="${t('phCity')}" style="margin-top: 5px;">` : ''}
                    </td>
                    <td><input type="text" class="edit-salary" value="${app.salary}" placeholder="${t('phSalary')}"></td>
                    <td><input type="text" class="edit-source" value="${app.source}" placeholder="${t('phSource')}"></td>
                    <td><textarea class="edit-notes" rows="2" placeholder="${t('phNotes')}">${app.notes}</textarea></td>
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
                    <td><span class="badge type-${app.type.toLowerCase().replace('-', '')}">${t(app.type)}</span></td>
                    <td><span class="badge mode-${app.workMode.toLowerCase()}">${t(app.workMode)}</span></td>
                    <td><span class="badge level-${app.level.toLowerCase()}">${t(app.level)}</span></td>
                    <td><span class="badge status-${app.status.toLowerCase().replace(' ', '')}">${t(app.status)}</span></td>
                    <td>${t(app.location)}</td>
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
    document.getElementById('stat-progress').textContent = applications.filter(a => a.status === 'W trakcie' || a.status === 'Rozmowa').length;
    document.getElementById('stat-offers').textContent = applications.filter(a => a.status === 'Oferta').length;
    document.getElementById('stat-rejected').textContent = applications.filter(a => a.status === 'Odrzucona').length;
}

function exportToCSV() {
    const headers = [t('colDate'), t('colPosition'), t('colCompany'), t('colType'), t('colMode'), 
                     t('colLevel'), t('colStatus'), t('colLocation'), t('colSalary'), t('colSource'), t('colNotes')];
    
    const rows = applications.map(app => [
        app.date, app.position, app.company, t(app.type), t(app.workMode),
        t(app.level), t(app.status), t(app.location), app.salary, app.source, app.notes
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(','))].join('\n');
    const BOM = '\uFEFF'; 
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `job_tracker_${new Date().toISOString().split('T')[0]}.csv`;
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
            alert(t('importError'));
            return;
        }

        const overwrite = confirm(t('confirmOverwrite'));
        let newApplications = overwrite ? [] : [...applications];

        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
            const cleanRow = row.map(cell => cell.replace(/^"|"$/g, '').trim());

            if(cleanRow.length >= 3) {
                const reverseT = (val) => Object.keys(translations.pl).find(k => translations[currentLang][k] === val) || val;
                
                newApplications.push({
                    id: Date.now() + i,
                    date: cleanRow[0] || '', position: cleanRow[1] || '', company: cleanRow[2] || '',
                    type: reverseT(cleanRow[3]) || 'Full-time', workMode: reverseT(cleanRow[4]) || 'Hybryda',
                    level: reverseT(cleanRow[5]) || 'Junior', status: reverseT(cleanRow[6]) || 'Wysłana',
                    location: reverseT(cleanRow[7]) || '', salary: cleanRow[8] || '', source: cleanRow[9] || '', notes: cleanRow[10] || ''
                });
            }
        }
        
        applications = newApplications;
        saveData();
        renderTable();
        updateStats();
        event.target.value = '';
        alert(t('importSuccess'));
    };
    reader.readAsText(file);
}

loadData();