function submitData(name, email) {
  return fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email
    })
  })
    .then(response => response.json())
    .then(object => {
      document.body.innerHTML += `<p>${object.id}</p>`;
    })
    .catch(error => {
      document.body.innerHTML += `<p>${error.message}</p>`;
    });
}