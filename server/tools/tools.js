const randomString = () => Math.round(Math.random() * 100000).toString(4)

fetch("http://localhost:5000/api/auth/register", {
  method: "POST", headers: {
    "Content-Type": "application/json",
  }, body: JSON.stringify({
    username: randomString(), email: randomString() + "@gmail.com", password: randomString(), isAdmin: false
  }),
}).then(response => {
  if (response.ok) {
    console.log("Success!")
  } else {
    console.log("Error! Code:", response.status)
    return response.text()
  }
})?.then((responseBody) => console.log("Response text:", responseBody))
