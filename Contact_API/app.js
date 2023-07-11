import express from 'express'
import fs from 'node:fs'

const app = express()
const PORT = 3000

const contacts = [];
let id = 0;

const getID = (contact) => {
    id += 1;
    contact.id = id
}

//--Middleware
app.use(express.json())

//--Kontakte auslesen
app.get('/contacts', (req, res) => {
    res.json(contacts);
})

//--Kontakt erstellen
app.post('/contacts', (req, res) => {
    const contact = {name: 'Chris', age: 30};
    getID(contact)
    contacts.push(contact)
    res.json(contacts)
})

//--Kontakt mit bestimmter ID aufrufen
app.get('/contacts/:id', (req, res) => {
    const {id} = req.params;
    const contact = contacts.find((item) => item.id === parseInt(id));
        if (contact) {
            res.json(contact);
        }else {

            res.status(404).json({ error: 'Kontakt nicht gefunden'})
        }
    })

//--Kontakt aktualisieren
app.put('/contacts/:id', (req, res) => {
    const contactsId = req.params.id;
    const newContact = contacts.find((contact) => contact.id.toString() === contactsId);

    newContact.name = 'Paula'
    newContact.age = 22;    

    if(!newContact) {
        return res.status(404).json({ error: 'Kontakt nicht gefunden'})
    }
    res.json(newContact);
   
    });


//--Kontakt mit bestimmter ID löschen
app.delete('/contacts/:id', (req, res) => {
    const {id} = req.params;
    const index = contacts.findIndex((item) => item.id === parseInt(id))
    
        if (index !== -1) {
            contacts.splice(index, 1)
            res.json(contacts)
        } else {
            res.status(404).json({ error: 'Kontakt nicht gefunden'})
        }
    })


app.listen(PORT, () => console.log('Der Port läuft'))