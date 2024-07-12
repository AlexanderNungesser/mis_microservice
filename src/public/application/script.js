document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('get-history').addEventListener('click', () => {
        const personalNumber = document.getElementById('personal-number').value;
        fetch(`http://localhost:3000/history`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ personalNumber: Number(personalNumber) })
        })
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('result');
                if (data.error) {
                    resultDiv.textContent = data.error;
                } else {
                    resultDiv.innerHTML = data.history.map(entry => 
                        `<p>${entry.timestamp}: ${entry.status}</p>`).join('');
                }
            })
            .catch(error => console.error('Fehler:', error));
    });
});
