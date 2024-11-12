// Funktion zur Suche nach Artikeln eines bestimmten Autors
async function searchByAuthor() {
    const author = document.getElementById("author").value;
    const endpoint = "http://localhost:3030/Forschungsartikeln/sparql"; // Endpunkt für dein Dataset

    // SPARQL-Abfrage für Artikel eines bestimmten Autors
    const query = `
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        SELECT ?article ?title ?year ?subject ?creator
        WHERE {
            ?article dc:creator "${author}" ;
                     dc:title ?title ;
                     dc:date ?year ;
                     dc:subject ?subject ;
                     dc:creator ?creator .
        }
    `;

    // Anfrage an den SPARQL-Endpunkt senden
    const url = endpoint + "?query=" + encodeURIComponent(query);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/sparql-results+json"
            }
        });
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok " + response.statusText);
        }
        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}

// Funktion zur Anzeige der Ergebnisse der Autorensuche
function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Vorherige Ergebnisse löschen

    // Ergebnisse anzeigen
    data.results.bindings.forEach(row => {
        const articleInfo = document.createElement("div");
        articleInfo.innerHTML = `
            <h3>${row.title ? row.title.value : "Titel nicht verfügbar"}</h3>
            <p><strong>Autor:</strong> ${row.creator ? row.creator.value : "Unbekannt"}</p>
            <p><strong>Jahr:</strong> ${row.year ? row.year.value : "Jahr nicht verfügbar"}</p>
            <p><strong>Thema:</strong> ${row.subject ? row.subject.value : "Thema nicht verfügbar"}</p>
        `;
        resultsDiv.appendChild(articleInfo);
    });
}

// Funktion zur Suche nach Artikeln zu einem bestimmten Thema
async function searchBySubject() {
    const subject = document.getElementById("subject").value;
    const endpoint = "http://localhost:3030/Forschungsartikeln/sparql"; // Endpunkt für dein Dataset

    // SPARQL-Abfrage für Artikel mit einem bestimmten Thema
    const query = `
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        SELECT ?article ?title ?year ?creator
        WHERE {
            ?article dc:subject "${subject}" ;
                     dc:title ?title ;
                     dc:date ?year ;
                     dc:creator ?creator .
        }
    `;

    // Anfrage an den SPARQL-Endpunkt senden
    const url = endpoint + "?query=" + encodeURIComponent(query);
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/sparql-results+json"
            }
        });
        if (!response.ok) {
            throw new Error("Netzwerkantwort war nicht ok " + response.statusText);
        }
        const data = await response.json();
        displayResultsBySubject(data);
    } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
    }
}

// Funktion zur Anzeige der Ergebnisse der Themensuche
function displayResultsBySubject(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Vorherige Ergebnisse löschen

    // Ergebnisse anzeigen für die Suche nach Thema
    data.results.bindings.forEach(row => {
        const articleInfo = document.createElement("div");
        articleInfo.innerHTML = `
            <h3>${row.title ? row.title.value : "Titel nicht verfügbar"}</h3>
            <p><strong>Autor:</strong> ${row.creator ? row.creator.value : "Unbekannt"}</p>
            <p><strong>Jahr:</strong> ${row.year ? row.year.value : "Jahr nicht verfügbar"}</p>
        `;
        resultsDiv.appendChild(articleInfo);
    });
}
