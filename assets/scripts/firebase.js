const BASE_URL = "https://join-f5da0-default-rtdb.europe-west1.firebasedatabase.app/";
let newUserID = 0;
let userData = {}
let users = [];

function pushToUserData(newUserID, userName, userEmail, userPassword, phoneNumber = ""){
    userData.push({
        "id" : newUserID,
        "name" : userName,
        "eMail" : userEmail,
        "password" : userPassword,
        "phoneNumber": phoneNumber,
        })
    console.log(userData);
}

async function putToStorage(path, id, data){
    let userStorage = await fetch(BASE_URL + path + id + ".json", {
        method: "PUT",
        header: {
            "content-type": "application/json"},
        body: JSON.stringify(data),    
        }
    )}