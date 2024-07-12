document.getElementById('get-timestamp').addEventListener('click', () => {
    fetch('http://localhost:3000/timestamp', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = `Zeitstempel: ${data.timestamp}, Angestellter: Name: ${data.employee.name}, Personalnummer: ${data.employee.personalNumber}, Chipnummer: ${data.employee.chipNumber}, Status: ${data.employee.status};`;
        })
        .catch(error => console.error('Fehler:', error));
});