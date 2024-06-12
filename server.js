/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: __________Nyan Lin Htet____________ Student ID: _____131308223_________ Date: ______12 June 2024________
*
********************************************************************************/

//Import the required modules
const express = require('express');
const path = require('path');
const legoData = require('./modules/legoSets.js');

//Create the server
const app = express();
const PORT = process.env.PORT || 3000;

legoData.Initialize()
    .then(() => {
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error(`Failed to initialize lego sets: ${error}`);
    });

//GET "/"
// app.get('/', (req, res) => {
//     res.send('Assignment 2: Nyan Lin Htet - 131308223');
// });

// GET "/"
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
    
});

// GET "/about"
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});


// Serve static files
//app.use(express.static('public'));

app.use(express.static(__dirname, 'public'));

//GET "/lego/sets"
app.get('/lego/sets', (req, res) => {
    legoData.getAllSets()
        .then(sets => res.json(sets))
        .catch(error => res.status(500).send(error));
});

//GET "/lego/sets/num-demo"
app.get('/lego/sets/num-demo', (req, res) => {
    const setNum = '001-1'; 
    legoData.getSetByNum(theme_id)
        .then(set => res.json(set))
        .catch(error => res.status(404).send(error));
});

app.get('/lego/sets/:set_num', (req, res) => {
    const setNum = req.params.set_num;
    legoData.getSetByNum(setNum)
        .then(set => res.json(set))
        .catch(error => res.status(404).send(error));
});

//GET "/lego/sets/theme-demo"
app.get('/lego/sets/theme-demo', (req, res) => {
    const theme = 'tech';
    legoData.getSetsByTheme(req.theme_name)
        .then(sets => res.json(sets))
        .catch(error => res.status(404).send(error));
});



// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});