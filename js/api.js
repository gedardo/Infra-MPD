var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
var jwt = "";
const urlApi = "http://localhost:3000/";

const loginApi = async (username, password) => {
    const raw = JSON.stringify({
        "user": username,
        "password": password
      });
      
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
      
    await fetch(`${urlApi}auth/login`, requestOptions)
    .then(response => response.json())
    .then(result => {
        jwt = result.status ? result.jwt : "";
        localStorage.setItem("jwt", jwt);
        myHeaders.append("Authorization", `Bearer ${result.jwt}`);
    })
    .catch(error => console.log('error', error));
    
    return jwt !== "";
}

const getCurrentUser = async () => {
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch(`${urlApi}auth/user/`, requestOptions)
    .then(response => response.json())
    .then(result => result)
    .catch(error => console.log('error', error));

}