window.addEventListener("resize", resizeHandler)

const contactsArray = [];
const usersArray = [];

function setContactActive(id, element) {
    const isActive = element.classList.contains("active-contact");
    const cInfo = document.getElementById('contact-info')
    const contacts = document.getElementsByClassName("contact-person");
    const selectedContact = contactsArray.find(entry => entry.id == id);
    console.log(contactsArray);
    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove("active-contact");
    }
    if (isActive) {
        cInfo.innerHTML = contactHeadlineTemplate();
        minimizeContactListon950px(element)
        return;
    }

    element.classList.add("active-contact");
    minimizeContactListon950px()
    renderContactInfo(selectedContact)
    renderMobileClickedContact()
    slideContactInfo()
}

function minimizeContactListon950px() {
    const contactList = document.getElementById('contact-list-container')
    const hasActiveContact = !!document.querySelector('.active-contact')
    if (getViewportSize() <= 950 && hasActiveContact) {
        contactList.classList.add('minimized-contact-list')
    } else if (getViewportSize() > 950 || !hasActiveContact) {
        contactList.classList.remove('minimized-contact-list')
    }
}

function renderContactInfo(selectedContact) {
    const cInfo = document.getElementById('contact-info')
    cInfo.innerHTML = ""
    cInfo.innerHTML = contactHeadlineTemplate() + contactInitialsTemplate(selectedContact) + contactInfoTemplate(selectedContact)
}

function renderLocalContactInfo(id) {
    const selectedContact = contactsArray.find(entry => entry.id == id);
    renderContactInfo(selectedContact)
    slideContactInfo()
}

function slideContactInfo() {
    /**
     * Wait for dom element to be ready
     * otherwise the transition wont be
     * played.
     */
    requestAnimationFrame(() => {
        const bigContact = document.getElementById('contact-big')
        const bigContactInfo = document.getElementById('contact-big-information')

        bigContact.classList.toggle('slideactive')
        bigContactInfo.classList.toggle('slideactive')
    })
}

function checkForBackBtn() {
    const contactList = document.getElementById('contact-list-container')
    const contactInfo = document.getElementById('contact-info')
    const contacts = document.getElementsByClassName("contact-person")
    if (getViewportSize() <= 800) {
        contactList.classList.remove('minimized-contact-list')
        contactList.style.display = "flex"
        contactInfo.style.display = "none"
        for (let i = 0; i < contacts.length; i++) {
            contacts[i].classList.remove("active-contact");
            const cInfo = document.getElementById('contact-info')
            cInfo.innerHTML = contactHeadlineTemplate()
        }
    } else if (getViewportSize() > 800) {
        contactList.style.display = "flex"
        contactInfo.style.display = "flex"
    }
}

function changeBtnsPopover() {
    let changeContactBtns = document.getElementById('changeContactBtns')
    changeContactBtns.addEventListener('click', () => {
        changeContactBtns.classList.toggle('active-popover');
    })

    document.addEventListener('mouseup', function (e) {
        if (!changeContactBtns.contains(e.target)) {
            changeContactBtns.classList.remove('active-popover');
        }
    })
}

function getViewportSize() {
    return window.innerWidth
}

function renderMobileClickedContact() {
    const contactList = document.getElementById('contact-list-container')
    const contactInfo = document.getElementById('contact-info')
    const button = document.getElementById('addNewContactBtn')
    contactList.style.display = getViewportSize() <= 800 ? "none" : "flex"
    contactInfo.style.display = "flex"
    changeBtnsPopover()
}

document.body.classList.toggle(
    'has-active-contact',
    !!document.querySelector('.active-contact')
);

function resizeHandler() {
    const contactList = document.getElementById('contact-list-container')
    const contactInfo = document.getElementById('contact-info')

    const hasActiveContact = !!document.querySelector(".active-contact")

    contactList.style.display = (hasActiveContact && (getViewportSize() <= 800)) ? "none" : "flex"
    contactInfo.style.display = (!hasActiveContact && (getViewportSize() <= 800)) ? "none" : "flex"
    minimizeContactListon950px()
}

function sortContactsByFirstName(element) {
    return [...element].sort((a, b) => {
        const firstNameA = a.name.split(" ")[0].toUpperCase();
        const firstNameB = b.name.split(" ")[0].toUpperCase();
        return firstNameA.localeCompare(firstNameB);
    });
}

async function getContactListData() {
    return await loadFirebaseData('contacts');
}

function renderLocalContactList() {
    const container = document.getElementById('contact-list');
    container.innerHTML = "";
    let currentLetter = "";
    for (let i = 0; i < contactsArray.length; i++) {
        const firstName = contactsArray[i].name.split(" ")[0];
        const firstLetter = firstName[0].toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            container.innerHTML += contactSeperatorTemplate(currentLetter);
        }

        container.innerHTML += loadContactListItem(contactsArray[i]);
    }

}

async function updateUserFromContact(id, userData) {
    singleContact = fetch(BASE_URL + "user/" + id + ".json", {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    singleContact.then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        return response.json();
    })
        .then(data => {
            console.log("Erfolgreich geupdatet:", data);
        })
        .catch(error => {
            console.error("Fehler beim PATCH:", error);
        });
}


async function checkContactInUser(oldName, oldMail, newName, newMail) {
    await getUsersData()
    console.log(userList);
    let userInContact = userList.find(entry => entry.user.eMail == oldMail || entry.user.name == oldName)
    let userId = userInContact.id
    const userData = {
        eMail: contactsArray.find(entry => entry.eMail === newMail).eMail,
        name: contactsArray.find(entry => entry.name === newName).name,
        initial: getContactInitials(contactsArray.find(entry => entry.name === newName).name)
    }
    console.log(userData);

    await updateUserFromContact(userId, userData)
}


function updateLocalStorage(newName, newMail) {
    let updatedData = { "name": newName, "email": newMail, "initials": getContactInitials(newName) }
    localStorage.setItem("activeUser", JSON.stringify(updatedData));
    loadNavbar()
}


function checkActiveUser() {
    let user = JSON.parse(localStorage.getItem('activeUser'));
    let contact = contactsArray.find(entry => entry.eMail == user.email)

    if (user.name == contact.name) {
        let contactListItem = document.getElementById("name-" + contact.id)
        contactListItem.innerText += " (Ich)"
        contactListItem.style.fontStyle = "italic"
    }
}


async function renderContactList() {
    contactsArray.length = 0;
    await getContactListData();
    const container = document.getElementById('contact-list');
    container.innerHTML = "";

    let currentLetter = "";

    pushToLocalContacts();

    for (let i = 0; i < contactsArray.length; i++) {
        const firstName = contactsArray[i].name.split(" ")[0];
        const firstLetter = firstName[0].toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            container.innerHTML += contactSeperatorTemplate(currentLetter);
        }

        container.innerHTML += loadContactListItem(contactsArray[i]);
    }
    checkActiveUser()
}

function pushToLocalContacts() {
    contactsList.forEach(element => {
        let obj = {
            id: element.id,
            name: element.contact.name,
            eMail: element.contact.eMail,
            phoneNumber: element.contact.phoneNumber,
            color: element.contact.color
        }
        contactsArray.push(obj);
    })
    // Sort Contacts by first name

    contactsArray.sort((a, b) => a.name.localeCompare(b.name));

    console.log(contactsArray);
}

async function deleteContact(ident) {
    const idContactStorage = contactsArray.find(entry => entry.id == ident);
    const contactsListStorage = contactsList.find(entry => entry.id == idContactStorage.id);
    const indexInContactsArray = contactsArray.findIndex(entry => entry.id == ident);

    if (idContactStorage.id === contactsListStorage.id) {
        contactsArray.splice(indexInContactsArray, 1);
        deleteContactFromFirebase(contactsListStorage.id)
        await renderLocalContactList()

        const cInfo = document.getElementById('contact-info')
        cInfo.innerHTML = contactHeadlineTemplate()
    } else {
        console.log(idContactStorage);
        console.log(contactsListStorage);


    }
}


async function deleteContactFromFirebase(contactID) {
    let userStorage = await fetch(BASE_URL + "contacts/" + contactID + ".json", {
        method: "DELETE",
    });

}


async function getUsersData() {
    return await loadFirebaseData('user');
}


async function getTasksData() {
    return await loadFirebaseData('tasks');
}


function findContactInTask(contact) {
    let task = task.filter(task => task.assignees.includes(contact.id))
    let taskId = task.map(t => t.id);
    return taskId
}

