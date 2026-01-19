import express from 'express';

//Rest API:
//GET: to get a resource
//POST: to create a resource
//PUT: to update a resource
//DELETE: to delete a resource
//PATCH: to update a resource partially
//HEAD: to get the headers of a resource
//OPTIONS: to get the supported methods of a resource

const app = express();
const port = 3000;

//group routers:
const router = express.Router();

//in case of nor using routers we would have to do this which becomes messi:
app.get('/', (req, res) => {
    res.send('Hello from the API');
});

// app.get('/api/v1/movies', (req, res) => {
//     res.send('List of movies');
// });

// app.post('/api/v1/movies', (req, res) => {
//     res.send('Movie created');
// });

// app.put('/api/v1/movies/:id', (req, res) => {
//     res.send('Movie updated');
// });

// app.delete('/api/v1/movies/:id', (req, res) => {
//     res.send('Movie deleted');
// });

// app.get('/api/v1/movies/:id', (req, res) => {
//     res.send('Movie details');
// });

//middleware to parse the body of the request
app.use(express.json()); 

//middleware to log out the timestamp of the request
app.use((req, res, next) => {
    //logs out(prints) the timestamp of the request
    const timestamp = new Date().toISOString();

    console.log('[${timestamp}] ${req.method} ${req.url}');

    next(); //to move to the next middleware or the route handler
})

let movies = [
    { id: 1, name: 'Dil To Pagal Hai', year: 1997 },
    { id: 2, name: 'Kabhi Khushi Kabhie Gham', year: 2001 },
    { id: 3, name: 'Dilwale Dulhania Le Jayenge', year: 1995 },
];

//we do this instead of the above code to make it more readable and maintainable:
app.use('/api/v1/movies', router);

router.get('/', (req, res) => {
    // res.send('List of movies');
    res.json(movies);
});

router.get('/:id', (req, res) => {
    // res.send('Movie details');
    const id = Number(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
});

router.post('/', (req, res) => {
    //res.send('Movie created');
    //creating the array of requested body
    const movie = { id: movies.length + 1, name: req.body.name, year: req.body.year };
    //checking if anything is missing
    if (!movie.name || !movie.year) {
        return res.status(400).json({ message: 'Name/year are required' });
    }
    //adding the movie to the array
    movies.push(movie);
    res.status(201).json(movie);
});

router.put('/:id', (req, res) => {
    //res.send('Movie updated');
    const id = Number(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    movie.name = req.body.name;
    movie.year = req.body.year;
    res.json(movie);
});

router.delete('/:id', (req, res) => {
    //res.send('Movie deleted');
    const id = Number(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    movies = movies.filter(movie => movie.id !== id);
    res.status(204).send();
}); 

app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));