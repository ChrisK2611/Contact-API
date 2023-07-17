import express from "express";
import axios from "axios"

import { getPosts, getPostById } from "./postService.js"

// "Zimmer" wo unser Programm laufen soll
const PORT = 3001;

// Express-Instanz
const app = express();

//*1
// Standard Status-Code um zu checken ob der Server läuft 
//(alles bis 399 ist ok, ab 400 Server-Error, ab 500 Internal-Error)
app.get('/status', (req, res) => {
    // kann auch ohne eine Meldung gesetzt werden
    res.status(200).send('Everything OK!')
});

//*2
//-- normale fetch-Variante --//
app.get('/post', (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log(data);
    })
    res.send('Everything looks fine!')

    // Alle Posts werden aus der getPosts()-Function von der postService.js geholt und als .json gespeichert
    getPosts().then((posts) => {
        console.log(posts);
        res.json(posts);
    })
})

//-- async-Variante --//
// aus der Funktion wird ein Promise (async)
app.get('/post-async', async (req, res) => {
    // Wartet auf alle Posts, stoppt den Promise (der restliche Code läuft weiter)
    const posts = await getPosts();
    console.log(posts);
    // nimmt die Posts und speichert diese als .json
    res.json(posts);
})

//-- axios --//
// muss installiert und anschließend importiert werden
app.get('/post', (req, res) => {
    axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((placeholderResponse) => {
        // .data mit angeben, sonst wird der Head mit ausgegeben
        console.log(placeholderResponse.data);
        res.send(placeholderResponse.data)
    })
})

//*3
//-- id route params --//
app.get('/post/:id', async (req, res) => {
    const id = Number(req.params.id);
    const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    res.send(data);
})

//*4
app.get('/post/requestID', async (req, res) => {
    const requestID_AsNumber = Number (req.params.requestID);
    console.log(data);
    res.send(data);
})


app.listen(PORT, () => {
    console.log(`Server is running on Port:${PORT}`);
});

