{
  'use strict';

  const select = {
    templateOf: {
      menuBooks: '#template-book',
    },
    containerOf: {
      listOfBooks:'.books-list',
      imageBooks: '.book__image'
    },
    filterOf: {
      filterBook: '.filters input'
    },
    ratingOf: {
      ratingBooks: '.book__rating__fill'
    }
  };
  
  const templates = {
    listBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML),
  };
  
 
  // const booksImage = document.querySelector(select.containerOf.imageBooks);
  class BooksList {
    constructor(id){
      const thisBook = this;
      thisBook.id = id;
      thisBook.favoriteBooks = [];
      thisBook.filters = [];


      thisBook.initData();
      thisBook.getElements();
      thisBook.initActions();
      thisBook.determineRatingBgc();
    }
    initData(){
      this.data = dataSource.books;
      const thisBook = this;
      for(let elem of this.data ){

        elem.ratingBgc = thisBook.determineRatingBgc(elem.rating);
        elem.ratingWidth = elem.rating * 10;

        const generatedHTML = templates.listBooks(elem);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const booksMenu = document.querySelector(select.containerOf.  listOfBooks);
        
        booksMenu.append(generatedDOM);
      } 
    }
    getElements(){
      const thisBook = this;
      thisBook.bookListProduct = document.querySelector(select.containerOf.listOfBooks);
      thisBook.filterInput = document.querySelectorAll(select.filterOf.filterBook);
    }
    initActions(){
      const thisBook = this;
      thisBook.bookListProduct.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clicked = event.target;
        const bookId = clicked.offsetParent.getAttribute('data-id'); 
        if(clicked.offsetParent.classList.contains('book__image')) {
          if(!clicked.offsetParent.classList.contains('favorite')) {
            clicked.offsetParent.classList.add('favorite');
            thisBook.favoriteBooks.push(bookId);
          }else{
            clicked.offsetParent.classList.remove('favorite');
            const toRemove = thisBook.favoriteBooks.indexOf(bookId);
            thisBook.favoriteBooks.splice(toRemove, 1);
          }
        }
      });
      for(let i = 0; i < thisBook.filterInput.length; i++ ){
        thisBook.filterInput[i].addEventListener('click', function(event){
          const clicked = event.target;
          if(clicked.type == 'checkbox' && clicked.tagName == 'INPUT' && clicked.name == 'filter'){
            if(clicked.checked){
              thisBook.filters.push(clicked.value);
            }else{
              const toRemove = thisBook.filters.indexOf(clicked.value);
              thisBook.filters.splice(toRemove, 1);
            }
          }
          filterBooks();
          for(let input of thisBook.filterInput){
            input.addEventListener('change', thisBook.filterInput);
          }
        });
      }
    
      const filterBooks = () =>{
        for(const elem of dataSource.books) {
          let shouldBeHidden = false;
          for(const filter of thisBook.filters){
            if(!elem.details[filter]) {
              shouldBeHidden = true;
              break;
            }
          }
          if(shouldBeHidden){
            document.querySelector(`[data-id="${elem.id}"]`).classList.add  ('hidden');
          } else {
            document.querySelector(`[data-id="${elem.id}"]`).classList.remove('hidden');
          }
        }   
      };
    }
    determineRatingBgc(rating){

      if(rating < 6 ) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      } else if(rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if(rating > 9  ) {
        return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
      }
    } 
  }


  const app = new BooksList();

  console.log(app);
}