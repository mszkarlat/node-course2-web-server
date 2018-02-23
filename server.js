const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');
//const exphbs = require('express-handlebars');

app.set('view engine','ejs');
// app.set('view engine', 'handlebars');
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// app.use((req, res, next) => {
//     res.render('maintenance',{
//         pageTitle: 'Currently in Maintenance'
//     });
    
// });

app.use(express.static(path.join(__dirname + '/public')));

app.use(function(req, res, next){
    res.locals.user = req.user || null;
    res.locals.test = "res.locals.test are with just test on each view";
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    // console.log(log);
    // fs.appendFile('server.log', log+'\n',(err) => {
    //     if (err) {
    //         console.log('Unable to append to server.log.');
    //     }
    // });
    next();
  });



app.get('/', (req, res) => {
    res.render('home',{
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my website'
    });
}); 

app.get('/about', (req, res) => {
    res.render('about',{
        pageTitle: 'About'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error handling request'
    });
});


app.listen(port, () => {
    console.log('App listening on port 3000!');
});