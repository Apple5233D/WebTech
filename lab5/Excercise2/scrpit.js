let xmlDoc = null;

// Load XML Data
async function loadLibrary() {
    try {
        const response = await fetch('books.xml');
        const text = await response.text();
        const parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");
        displayBooks();
    } catch (err) {
        console.error("Error loading XML:", err);
    }
}

// Display/Read Data
function displayBooks() {
    const list = document.getElementById('bookList');
    list.innerHTML = "";
    const books = xmlDoc.getElementsByTagName("book");

    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;

        const row = `<tr>
            <td>${id}</td>
            <td>${title}</td>
            <td>${author}</td>
            <td><span class="status-badge ${status.toLowerCase()}">${status}</span></td>
            <td>
                <button class="action-btn btn-update" onclick="toggleStatus(${i})">Toggle Status</button>
                <button class="action-btn btn-delete" onclick="deleteBook(${i})">Delete</button>
            </td>
        </tr>`;
        list.innerHTML += row;
    }
}

// Create: Add new <book> node
function addBook() {
    const id = document.getElementById('bookId').value;
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;

    if (!id || !title || !author) return alert("Please fill all fields!");

    const newBook = xmlDoc.createElement("book");

    const idNode = xmlDoc.createElement("id");
    idNode.textContent = id;
    
    const titleNode = xmlDoc.createElement("title");
    titleNode.textContent = title;

    const authorNode = xmlDoc.createElement("author");
    authorNode.textContent = author;

    const statusNode = xmlDoc.createElement("status");
    statusNode.textContent = "Available";

    newBook.append(idNode, titleNode, authorNode, statusNode);
    xmlDoc.documentElement.appendChild(newBook);
    
    displayBooks();
    clearInputs();
}

// Update: Modify availability status
function toggleStatus(index) {
    const statusNode = xmlDoc.getElementsByTagName("status")[index];
    statusNode.textContent = (statusNode.textContent === "Available") ? "Borrowed" : "Available";
    displayBooks();
}

// Delete: Remove book node
function deleteBook(index) {
    const bookNode = xmlDoc.getElementsByTagName("book")[index];
    bookNode.parentNode.removeChild(bookNode);
    displayBooks();
}

function clearInputs() {
    document.getElementById('bookId').value = "";
    document.getElementById('bookTitle').value = "";
    document.getElementById('bookAuthor').value = "";
}

loadLibrary();