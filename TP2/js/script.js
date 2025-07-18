
// Création du tableau
let library = [];

function addBook(book) {
    library.push(book);
}

// affcihage des livre non emprunté
function getAvailableBooks() {
    for (let i = 0; i < library.length; i++) {
        const book = library[i];
        if (book.emprunte === false) {
            console.log(book);
        }
    };
}

//recherches par titre

function searchBookByTitle(title) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].title.toLowerCase().trim() === title.toLowerCase().trim()) {
            return library[i];
        }
    }
}

//les livres
addBook({
    title: 'hearstone',
    author: 'eray',
    publicationYear: '2002',
    emprunte: false,
 });

 addBook({
     title: 'jsnkejnf',
     author: 'jhfnhrif',
     publicationYear: '2002',
     emprunte: false,
  });

  addBook({
     title: 'jsnkejnf',
     author: 'jhfnhrif',
     publicationYear: '2002',
     emprunte: true,
  });

  //affichage dans la console
console.table(getAvailableBooks());
const searchedBook = searchBookByTitle('hearstone');

console.log(`Le livre que vous cherchez est ${searchedBook.title} de ${searchedBook.author}, écrit en ${searchedBook.publicationYear}.`);
    // Afficher les informations du livre
    // displayInfo() {
    //     return `Titre: ${this.title}\nAuteur: ${this.author}\nAnnée: ${this.publicationYear}\nStatut: ${this.emprunte ? 'Emprunté' : 'Disponible'}`;
    // }

    // }

    // // Création d'un livre
    // const titleBook = document.querySelector('.titleBook');
    // const authorBook = document.querySelector('.authorBook');
    // const yearBook = document.querySelector('.yearBook');   
    
    // const formBook = document.querySelector('#bookForm');
    // formBook.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     const title = document.querySelector('#title').value;
    //     const author = document.querySelector('#author').value;
    //     const year = document.querySelector('#year').value;
    //     
    //     const newBook = new Book(title, author, year);
    //     const booksList = document.getElementById('booksList');
    //     booksList.innerHTML += `
    //         <div class="book">
    //             <h3 class="titleBook">${newBook.title}</h3>
    //             <p class="authorBook">${newBook.author}</p>
    //             <p class="yearBook">${newBook.publicationYear}</p>
    //             <button class="emprunt-btn">Emprunter</button>
    //             <p class="availableBook">Disponible</p>
    //         </div>
    //     `;
    //     formBook.reset();
    // });
    
    
    // // Gérer l'emprunt/retour
    // const empruntBtn = document.querySelector('.emprunt-btn');
    // const statutBook = document.querySelector('.availableBook');
    //         
    // empruntBtn.addEventListener('click', () => {
    //     if (statutBook.textContent === 'Disponible') {
    //         newBook.emprunte = true;
    //         statutBook.textContent = 'Emprunté';
    //         empruntBtn.textContent = 'Rendre';
    //         } else {
    //         newBook.emprunte = false;
    //         statutBook.textContent = 'Disponible';
    //         empruntBtn.textContent = 'Emprunter';
    //     }
    // });