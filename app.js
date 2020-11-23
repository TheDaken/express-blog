const express = require('express')
const app = express();
require('./db/mongoose')
const pregun = require('./models/post')
const preguntasRouter = require('./routers/post')


const port = process.env.PORT || 3000
//const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PSSWRD}@cluster0.s4gvp.mongodb.net/${MONGODB_DB}?retryWrites=true&w=majority`
// express app


// listen for requests
app.listen(port, () => {
  console.log(`Server listening to port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});


app.get('/', async (req, res) => {
  try {
    const preguntass = await pregun.find({})
    res.render('index', { preguntas: preguntass, titulo: 'Índice' });
  } catch (e) {

    res.render('index', { preguntass: [], titulo: 'Índice' });
  }
});

app.get('/', async (req, res) => {
  await pregun.find({}).then((data) => {
    res.render('index', { data })
  });

});
app.get('/formul', (req, res) => {
  res.render('formul', { titulo: 'Formulario' });
});



app.get('/ranquin', async (req, res) => {
  try {
    const respuestaas = await resp.find({})
    res.render('ranquin', { respuestas: respuestaas, titulo: 'Índice' });
  } catch (e) {

    res.render('ranquin', { respuestaas: [], titulo: 'Índice' });
  }
});
app.use(express.json())
app.use('/api', preguntasRouter)
app.use('/api', respuestasRouter)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

