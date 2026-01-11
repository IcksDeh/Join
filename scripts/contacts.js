window.addEventListener("resize", resizeHandler)

function setContactActive(email, element) {
    const isActive = element.classList.contains("active-contact");
    const cInfo = document.getElementById('contact-info')
    const contacts = document.getElementsByClassName("contact-person");
    const selectedContact = contact.find(entry => entry.email === email);

    for (let i = 0; i < contacts.length; i++) {
        contacts[i].classList.remove("active-contact");
    }
    if (isActive) {
        cInfo.innerHTML = contactHeadlineTemplate();
        return;
    }

    element.classList.add("active-contact");
    renderContactInfo(selectedContact)
    renderMobileClickedContact()
    slideContactInfo()
}

function renderContactInfo(selectedContact) {
    const cInfo = document.getElementById('contact-info')
    cInfo.innerHTML = contactHeadlineTemplate() + contactInitialsTemplate(selectedContact) + contactInfoTemplate(selectedContact)
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
    if (getViewportSize() <= 768) {
        contactList.style.display = "flex"
        contactInfo.style.display = "none"
        for (let i = 0; i < contacts.length; i++) {
            contacts[i].classList.remove("active-contact");
            const cInfo = document.getElementById('contact-info')
            cInfo.innerHTML = contactHeadlineTemplate()
        }
    } else if (getViewportSize() > 768) {
        contactList.style.display = "flex"
        contactInfo.style.display = "flex"
    }
}

function getViewportSize() {
    return window.innerWidth
}

function renderMobileClickedContact() {
    const contactList = document.getElementById('contact-list-container')
    const contactInfo = document.getElementById('contact-info')

    contactList.style.display = getViewportSize() <= 768 ? "none" : "flex"
    contactInfo.style.display = "flex"
}

function resizeHandler() {
    const contactList = document.getElementById('contact-list-container')
    const contactInfo = document.getElementById('contact-info')

    const hasActiveContact = !!document.querySelector(".active-contact")

    contactList.style.display = (hasActiveContact && (getViewportSize() <= 768)) ? "none" : "flex"
    contactInfo.style.display = (!hasActiveContact && (getViewportSize() <= 768)) ? "none" : "flex"
}

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