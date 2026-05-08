// Problem Statement: Library Book Management System
// -------------------------------------------------
// Objective : Create a Book class and use it to manage a collection of books in a library.

// Requirements:
//   Create a Book class with the following:

//   Properties:
//       title (string)
//       author (string)
//       pages (number)
//       isAvailable (boolean, default: true)


//   Methods:
//       borrow() - Marks the book as not available
//       returnBook() - Marks the book as available
//       getInfo() - Returns a string with book details (e.g., "The Hobbit by J.R.R. Tolkien (310 pages)")
//       isLongBook() - Returns true if pages > 300, false otherwise




//   1. Create at least 5 book objects using the class:
//       Example: "Harry Potter", "1984", "The Hobbit", etc.


//   2. Perform the following operations:

//       i. Display info of all books
//       ii. Borrow 2 books and show their availability status
//       iii. Return 1 book and show updated status
//       iv. Count how many books are "long books" (more than 300 pages)
//       v. List all available books
class Book{
      title;
      author;
      pages ;
      isAvailable=true ;

      constructor(title,author,pages,isAvailable){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.isAvailable=isAvailable;
      }

        borrow(){
         
        return this.isAvailable=false;
        console.log("\n",this.title,"is unavailable")
        }
    
        returnBook(){
    
            return this.isAvailable=true;
            console.log(this.title,"is available")
        }
        getInfo(){
            console.log("the ",this.title," by ",this.author, this.pages)
        }
        isLongBook(){
            
            return this.pages>300
        }

      }
      let book1=new Book("HarryPotter","ganesh",301,"True")
      let book2=new Book("1984","henryCavil",400,1)
      let book3=new Book("the one","ram",201,1)
      let book4=new Book("the second","balbir singh",301,1)
      const library=[book1,book2,book3,book4]
      console.log(book1)//1
      console.log(book2)//2
      console.log(book3)//3
      console.log(book4)//displaying info of book 
      console.log("all Books in library :")
      // library.forEach(book=>book.getInfo())
      //borrow 2 books and show availablity
    
      book1.borrow()
      book2.borrow()
      console.log("Available books after borrowing  ")
      console.log(book1.title,"available:",book1.isAvailable)
      console.log(book2.title,"available",book2.isAvailable)
      //return 1 book and show updated status
      book1.returnBook()
      console.log("Updated availbilty... ")
      console.log(book1.title,"available:",book1.isAvailable)
      //count howmany books are long books (>300 pages)

      let longbookCount=library.filter(book=>book1.isLongBook()).length
      console.log("Number of long books",longbookCount)
      //list the available books
      console.log("available books")
      let availableBooks=library.filter(book=>book.isAvailable)
      availableBooks.forEach(book=>{
        console.log(book.title)
      })
      

      
