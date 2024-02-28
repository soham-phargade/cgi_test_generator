document.getElementById('uploadBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            fetch('/api/process-csv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: content,
            })
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "processed.csv";
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => console.error('Error:', error));
        };
        reader.readAsText(file);
    } else {
        alert("Please select a CSV file.");
    }
});
