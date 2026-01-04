console.dirxml(document.getElementById('addNewContactBtn'))



function setContactActive(email, element) {
    const isActive = element.classList.contains("active-contact");
    const cInfo = document.getElementById('contact-info')
    const contacts = document.getElementsByClassName("contact-person");

    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove("active-contact");
    }
    if (isActive) {
        cInfo.innerHTML = contactHeadlineTemplate();
        return;
    }

    element.classList.add("active-contact");
    // showMobileContact()
    const selectedContact = contact.find(entry => entry.email === email);
    cInfo.innerHTML = contactHeadlineTemplate() + contactInitialsTemplate(selectedContact) + contactInfoTemplate(selectedContact)

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
function detectMobile() {
    return window.innerWidth <= 600
}

// function showMobileContact() {
//     const contactList = document.getElementById('contact-list')
//     const bigContact = document.getElementById('contact-big')
//     const bigContactInfo = document.getElementById('contact-big-information')
//     if (detectMobile() == true) {
//         contactList.classList.toggle('d_none')

//     }
// }

function sortContactsByFirstName(contacts) {
    return [...contacts].sort((a, b) => {
        const firstNameA = a.name.split(" ")[0].toUpperCase();
        const firstNameB = b.name.split(" ")[0].toUpperCase();
        return firstNameA.localeCompare(firstNameB);
    });
}

function renderContactList() {
    const contacts = sortContactsByFirstName(contact);
    const container = document.getElementById('contact-list');

    // container.innerHTML = addContactButtonTemplate();
    let currentLetter = "";

    contacts.forEach((contact) => {
        const firstName = contact.name.split(" ")[0];
        const firstLetter = firstName[0].toUpperCase();

        if (firstLetter !== currentLetter) {
            currentLetter = firstLetter;
            container.innerHTML += contactSeperatorTemplate(currentLetter);
        }

        container.innerHTML += loadContactListItem(contact);
    });
}