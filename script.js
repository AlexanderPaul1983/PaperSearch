
async function searchByAuthor() {
    const author = document.getElementById("author").value;
    const endpoint = "http://localhost:3030/Forschungsartikeln/sparql"; 

    // 
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


function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 

    
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


async function searchBySubject() {
    const subject = document.getElementById("subject").value;
    const endpoint = "http://localhost:3030/Forschungsartikeln/sparql"; 

    
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


function displayResultsBySubject(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; 

    
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
