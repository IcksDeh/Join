document.getElementById('createContactBtn').addEventListener("click", async function(event){
    event.preventDefault();
    await getContactData();
    })

function getElementsContacts(){
   return { 
    name : document.getElementById('id_contact_name'),
    email: document.getElementById('id_contact_email'),
    phonenumber: document.getElementById('id_contact_phone'),
  };
}

async function getContactData(){
    const elements = getElementsContacts();
    let contactName = elements.name.value;
    let contactEmail = elements.email.value;
    let contactPhonenumber = elements.phonenumber.value;

    await switchContactsData(contactName, contactEmail, contactPhonenumber)
}

async function switchContactsData(contactName, contactEmail, contactPhonenumber) {
    let contactData = {
        "name" : contactName,
        "eMail" : contactEmail,
        "phoneNumber" : contactPhonenumber,
    }
    await putToStorage ("contacts", contactData)
}