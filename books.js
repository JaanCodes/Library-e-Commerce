let books

async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books')

  booksWrapper.classList += ' books__loading'

  if(!books){
    books = await getBooks()
  }
  booksWrapper.classList.remove('books__loading')


  if(filter === "LOW_TO_HIGH"){
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice))
  }
  else if(filter === "HIGH_TO_LOW"){
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice))
  }
  else if(filter === "RATING"){
    books.sort((a, b) => b.rating - a.rating)
  }


  const booksHTML = books.map((book) => {
    return `<div class="book">
    <figure class="book__img--wrapper">
      <img class="book__img" src="${book.url}" alt="">
    </figure>
    <div class="book__title">
      ${book.title}
    </div>
    <div class="book__ratings">
      ${ratingsHTML(book.rating)}
    </div>
    <div class="book__price">
      ${priceHTML(book.originalPrice, book.salePrice)}
    </div>
  </div>`
  }).join("")

  booksWrapper.innerHTML = booksHTML
}



function priceHTML(originalPrice, salePrice) {
  if(!salePrice){
    return `${originalPrice.toFixed(2)}€`
  }
  return `<span class="book__price--normal">${originalPrice.toFixed(2)}€</span> ${salePrice.toFixed(2)}€`
}



function ratingsHTML(rating){
  let ratingHTML = ""
  for(let i = 0 ; i < Math.floor(rating) ; i++){
    ratingHTML += '<i class="fas fa-star"></i> \n'
  }
  if(!Number.isInteger(rating)){
    ratingHTML += '<i class="fas fa-star-half-alt"></i> \n'
  }
  return ratingHTML
}




function filterBooks(event) {
  renderBooks(event.target.value)
}


setTimeout(() => {
  renderBooks()
});




/* BOOKS FAKE INFO */
function getBooks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 23.95,
          rating: 5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 19.95,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 22.95,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 17.95,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 39.95,
          salePrice: 21.95,
          rating: 5,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 32.50,
          salePrice: 20.95,
          rating: 5,
        },
        {
          id: 7,
          title: "The Millionaire Booklet",
          url: "assets/book-10.jpg",
          originalPrice: 19.50,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 8,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 14.95,
          salePrice: null,
          rating: 4,
        },
        {
          id: 9,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 29.95,
          salePrice: 22.95,
          rating: 4.5,
        },
        {
          id: 10,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 12.95,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 16.30,
          salePrice: null,
          rating: 4.5,
        },
        {
          id: 12,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 13.95,
          salePrice: null,
          rating: 4,
        },
        {
          id: 13,
          title: "Can't Hurt Me",
          url: "assets/david goggins.jpeg",
          originalPrice: 14.95,
          salePrice: null,
          rating: 4,
        }
      ]);
    }, 1000);
  });
}