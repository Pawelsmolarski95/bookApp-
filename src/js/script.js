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

    }
  };
  const templates = {
    listBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML),
  };
  const favoriteBooks = [];
  const filters = [];
  const bookListProduct = document.querySelector(select.containerOf.listOfBooks);
  const filterInput = document.querySelectorAll(select.filterOf.filterBook);
  // const booksImage = document.querySelector(select.containerOf.imageBooks);

  const render = () => {
    for(let elem of dataSource.books ){
      const generatedHTML = templates.listBooks(elem);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const booksMenu = document.querySelector(select.containerOf.listOfBooks);

      booksMenu.append(generatedDOM);
    } 
  };
  
  const initActions = () => {
    bookListProduct.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clicked = event.target;
      const bookId = clicked.offsetParent.getAttribute('data-id'); 
      if(clicked.offsetParent.classList.contains('book__image')) {
        if(!clicked.offsetParent.classList.contains('favorite')) {
          clicked.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookId);
        }else{
          clicked.offsetParent.classList.remove('favorite');
          const toRemove = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(toRemove, 1);
        }
      }
    });
    for(let i = 0; i < filterInput.length; i++ ){
      filterInput[i].addEventListener('click', function(event){
        const clicked = event.target;
        if(clicked.type == 'checkbox' && clicked.tagName == 'INPUT' && clicked.name == 'filter'){
          if(clicked.checked){
            filters.push(clicked.value);
            
          }else{
            const toRemove = filters.indexOf(clicked.value);
            filters.splice(toRemove, 1);
            
          }
        }
        filterBooks();
        for(let input of filterInput){
          input.addEventListener('change', filterBooks);
        }
      });
    }
  }; 
  const filterBooks = () => {
    for(const elem of dataSource.books) {
      let shouldBeHidden = false;
      for(const filter of filters){
        if(!elem.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        document.querySelector(`[data-id="${elem.id}"]`).classList.add('hidden');
      } else {
        document.querySelector(`[data-id="${elem.id}"]`).classList.remove('hidden');
      }
      
    }  
  };
  render();
  initActions();     
}





