window.addEventListener("resize", resizeHandler)

const contactsArray = [];

function setContactActive(email, element) {
    const isActive = element.classList.contains("active-contact");
    const cInfo = document.getElementById('contact-info')
    const contacts = document.getElementsByClassName("contact-person");
    const selectedContact = contactsArray.find(entry => entry.eMail === email);
    console.log(contactsArray);
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
    if (getViewportSize() <= 700) {
        contactList.style.display = "flex"
        contactInfo.style.display = "none"
        for (let i = 0; i < contacts.length; i++) {
            contacts[i].classList.remove("active-contact");
            const cInfo = document.getElementById('contact-info')
            cInfo.innerHTML = contactHeadlineTemplate()
        }
    } else if (getViewportSize() > 700) {
        contactList.style.display = "flex"
        contactInfo.style.display = "flex"
    }
}

function changeBtnsPopover() {
    const changeContactBtns = document.getElementById('changeContactBtns')
    const popover = document.getElementById('changebtnsPopover')
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
    contactList.style.display = getViewportSize() <= 700 ? "none" : "flex"
    contactInfo.style.display = "flex"
    changeBtnsPopover()

}

function resizeHandler() {
    const contactList = document.getElementById('contact-list-container')
    const contactInfo = document.getElementById('contact-info')

    const hasActiveContact = !!document.querySelector(".active-contact")

    contactList.style.display = (hasActiveContact && (getViewportSize() <= 700)) ? "none" : "flex"
    contactInfo.style.display = (!hasActiveContact && (getViewportSize() <= 700)) ? "none" : "flex"
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

async function renderContactList() {
    await getContactListData()
    const container = document.getElementById('contact-list');


    let currentLetter = "";

    contactsList.forEach(element => {
        contactsArray.push(element.contact);
    });
    console.log(contactsArray);
    contactsArray.sort((a, b) => a.name.localeCompare(b.name))
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