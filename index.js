import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;
const elephantsql = process.env.elephantsql;


app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

// Create connecting with database
const db = new pg.Client(elephantsql);
db.connect();

// Home page render - show all books from the database
app.get('/', async(req, res) => {
    const result = await db.query('SELECT * FROM books');
    const bookDb = result.rows;
    let books=[]
    bookDb.forEach((book) => {
        books.push(book);
    })
    res.render("index.ejs", {books : books})
});


// Sort function - allow to sort by different options
app.post("/sort", async(req, res) => {
    const sort = req.body.sort;
    switch(sort) {
        case 'ratingAsc':
            var result = await db.query('SELECT * FROM books ORDER BY rating DESC');
            var bookDb = result.rows;
            var books=[]
            bookDb.forEach((book) => {
                books.push(book);})
            break;
        case 'ratingDesc':
            var result = await db.query('SELECT * FROM books ORDER BY rating ASC');
            var bookDb = result.rows;
            var books=[]
            bookDb.forEach((book) => {
                books.push(book);})
            break;
        case 'alphabet':
            var result = await db.query('SELECT * FROM books ORDER BY title');
            var bookDb = result.rows;
            var books=[]
            bookDb.forEach((book) => {
                books.push(book);})
            break;
        case 'date_old':
            var result = await db.query('SELECT * FROM books ORDER BY added_date');
            var bookDb = result.rows;
            var books=[]
            bookDb.forEach((book) => {
                books.push(book);})
            break;
        case 'date_new':
            var result = await db.query('SELECT * FROM books ORDER BY added_date DESC');
            var bookDb = result.rows;
            var books=[]
            bookDb.forEach((book) => {
                books.push(book);})
            break;
    };
    res.render("index.ejs", {books : books});
})

// About page render - show all books from the database
app.get("/about", (req, res) => {
    res.render('about.ejs');
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
