fetch('http://localhost:5678/api/works')
    .then(r => r.text())
    .then(body => console.log(body))