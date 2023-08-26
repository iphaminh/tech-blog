const express = require('express');
const exphbs = require('express-handlebars').engine;


const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
