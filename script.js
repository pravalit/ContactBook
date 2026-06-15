window.onload = loadContacts;

// Load contacts
async function loadContacts() {
    let res = await fetch("https://contactbook-47lo.onrender.com/contacts");
    let data = await res.json();
    displayContacts(data);
}

// Display contacts
function displayContacts(contacts) {
    let list = document.getElementById("contact-list");
    list.innerHTML = "";

    contacts.forEach(c => {
        list.innerHTML += `
        <div class="card">
            <h3>👤 ${c.name}</h3>
            <p>📞 ${c.phone}</p>
            <p>🏷️ ${c.category}</p>
            <button onclick="deleteContact(${c.id})">Delete</button>
        </div>`;
    });
}

// Add contact
async function addContact() {
    let name = prompt("Enter name");
    let phone = prompt("Enter phone");
    let category = prompt("Enter category (Family/Friends/Work)");

    if (!name || !phone) {
        alert("Name and phone required!");
        return;
    }

    await fetch("https://contactbook-47lo.onrender.com/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            phone,
            category: category.toLowerCase() // normalize
        })
    });

    loadContacts();
}

// Delete contact
async function deleteContact(id) {
    await fetch(`https://contactbook-47lo.onrender.com/contacts/${id}`, {
        method: "DELETE"
    });

    loadContacts();
}

// Search
document.getElementById("search").addEventListener("input", async (e) => {
    let res = await fetch("https://contactbook-47lo.onrender.com/contacts");
    let data = await res.json();

    let filtered = data.filter(c =>
        c.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    displayContacts(filtered);
});

// Category filter (FIXED)
async function filterCategory(cat) {
    let res = await fetch("https://contactbook-47lo.onrender.com/contacts");
    let data = await res.json();

    if (cat === "All") {
        displayContacts(data);
    } else {
        displayContacts(
            data.filter(c =>
                c.category.toLowerCase() === cat.toLowerCase()
            )
        );
    }
}