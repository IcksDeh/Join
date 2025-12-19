function getElementsContacts() {
    return {
        name: document.getElementById('id_contact_name'),
        email: document.getElementById('id_contact_email'),
        phonenumber: document.getElementById('id_contact_phone'),
    };
}

async function getContactData() {
    const elements = getElementsContacts();
    let contactName = elements.name.value;
    let contactEmail = elements.email.value;
    let contactPhonenumber = elements.phonenumber.value;
    let contactColor = getRandomColor();

    await switchContactsData(contactName, contactEmail, contactColor, elements, contactPhonenumber)
}

async function switchContactsData(contactName, contactEmail, contactColor, elements = "", contactPhonenumber = "") {
    let contactData = {
        "name": contactName,
        "eMail": contactEmail,
        "phoneNumber": contactPhonenumber,
        "color": contactColor,
    }
    await putToStorage("contacts", contactData, elements)
}

function contactActive(element) {
    const isActive = element.classList.contains("active-contact");
    const cInfo = document.getElementById('contact-info')
    const contacts = document.getElementsByClassName("contact-person");
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove("active-contact");
    }
    if (isActive) {
        cInfo.innerHTML = contactHeadline();
        return;
    }
    element.classList.add("active-contact");

    const index = Number(element.id.replace("contact-", ""));
    const selectedContact = contact[index];
    cInfo.innerHTML = contactHeadline() + contactInfo(selectedContact) + moreContactInfo(selectedContact)
}

function sortContactsByFirstName(contacts) {
    return [...contacts].sort((a, b) => {
        const firstNameA = a.name.split(" ")[0].toUpperCase();
        const firstNameB = b.name.split(" ")[0].toUpperCase();
        return firstNameA.localeCompare(firstNameB);
    });
}

function renderContactList(contacts) {
    const container = document.getElementById('contact-list');
    container.innerHTML = addContactButtonTemplate();
    let currentLetter = "";
    contacts.forEach((contact, index) => {
        const firstName = contact.name.split(" ")[0];
        const firstLetter = firstName[0].toUpperCase();
        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            container.innerHTML += contactSeperator(currentLetter);
        }
        container.innerHTML += loadContactList(contact, index);
    });
}

function cList() {
    const sortedContacts = sortContactsByFirstName(contact);
    renderContactList(sortedContacts);
}