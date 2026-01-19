import express from 'express';
import { eq } from 'drizzle-orm';
import { db } from './db.js';
import { movies } from './schema.js';

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
// app.get('/', (req, res) => {
//     res.send('Hello from the API');
// });

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

//we do this instead of the above code to make it more readable and maintainable:
app.use('/api/v1/movies', router);

router.get('/', async(req, res) => {
    // res.send('List of movies');
    const movieList = await db.select().from(movies);
    res.json(movieList);
});

router.get('/:id', async(req, res) => {
    // res.send('Movie details');
    const id = Number(req.params.id);
    const movie = await db.select().from(movies).where(eq(movies.id, id));
    if (movie.length === 0) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie[0]);
});

router.post('/', async(req, res) => {
    //res.send('Movie created');
    //creating the array of requested body
    const { make, name, year, price } = req.body;
    //checking if anything is missing
    if (!make || !name || !year || !price) {
        return res.status(400).json({ message: 'Make/name/price are required' });
    }
    //adding the movie to the array
    const [newMovie] = await db.insert(movies).values({ make, name, year, price }).returning();

    res.status(201).json(newMovie);
});

router.put('/:id', async(req, res) => {
    //res.send('Movie updated');
    const id = Number(req.params.id);
    const { make, name, year, price } = req.body;
    if (!make || !name || !year || !price) {
        return res.status(400).json({ message: 'Make/name/price are required' });
    }
    const [updatedMovie] = await db.update(movies).set({ make, name, year, price }).where(eq(movies.id, id)).returning();
    if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
});

router.delete('/:id', async(req, res) => {
    //res.send('Movie deleted');
    const id = Number(req.params.id);
    const [deletedMovie] = await db.delete(movies).where(eq(movies.id, id)).returning();
    if (!deletedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(204).send();
}); 

app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));