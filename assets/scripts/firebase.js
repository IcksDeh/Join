const BASE_URL = "https://join-f5da0-default-rtdb.europe-west1.firebasedatabase.app/";
let newUserID = 0;
let users = [];

function pushToUserData(newUserID, userName, userEmail, userPassword){
   let userData = {
        "id" : newUserID,
        "name" : userName,
        "eMail" : userEmail,
        "password" : userPassword,
        }
    console.log(userData);
    putToStorage("user", userData);
}

async function putToStorage(path, userData){
    let userStorage = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "content-type": "application/json"},
        body: JSON.stringify(userData),    
        }
    );
    let responseToJson = await userStorage.json();
    console.log(responseToJson);
}