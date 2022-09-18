{
  'use strict';

  const select = {
    templateOf: {
      menuBooks: '#template-book',
    },
    containerOf: {
      listOfBooks:'.books-list',
      imageBooks: '.book__image'
    }
  };
  const templates = {
    listBooks: Handlebars.compile(document.querySelector(select.templateOf.menuBooks).innerHTML),
  };


  const render = () => {
    for(let elem of dataSource.books ){
      const generatedHTML = templates.listBooks(elem);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const booksMenu = document.querySelector(select.containerOf.listOfBooks);

      booksMenu.append(generatedDOM);
    } 
  };
  render();


  const favoriteBooks = [];
  const initActions = () => {
    const bookListProduct = document.querySelector(select.containerOf.listOfBooks);
    
    
      
    bookListProduct.addEventListener('dblclick', function(event){
      console.log('click');
      event.preventDefault();
      const clicked = event.target;
      console.log(clicked.offsetParent);
      const bookId = clicked.offsetParent.getAttribute('data-id');
      if(clicked.offsetParent.classList.contains('book__image')) {
        
        if(!clicked.offsetParent.classList.contains('favorite')) {
          clicked.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookId);
          console.log(favoriteBooks);
        } else {
          clicked.offsetParent.classList.remove('favorite');
          const toRemove = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(toRemove, 1);
          console.log(favoriteBooks);

        }
      }
    });
         
  };
     
  
  initActions();
  

}



