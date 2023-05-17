import express from "express";
import { readFile, writeFile } from "node:fs/promises";

// 
//             ==========  BASIS ==========

const app = express();
app.use(express.json())
const port = 3000;

app.get("/status", (req, res) => {
    res.status(200).send("OKAY");
});

app.listen(port, () => {
    console.log(`Hausnummer: ${port}`);
});



//             ==========  READ FILE & PARSE ==========

const readTheFile = async () => {
    let error;
    let data;

    try {
        data = await readFile('contacts.json', 'utf-8');
        data = JSON.parse(data);


    } catch (error) {
        console.log(error);
        error = "Schade, Schokolade! ";

    }

    return [error, data];

}


//             ==========  Get Data to file  ==========

app.get("/contacts", async (req, res) => {

    const [error, data] = await readTheFile();
    res.send(data);

    if (error) {
        return res.status(500).send("Failed to connect to Database, try later!");
    }
})



//             ==========  Get ID from JSON  ==========

app.get("/contacts/:id", async (req, res) => {

    const [error, data] = await readTheFile();
    const filterID = data.filter((elt) => {
        return elt.id === Number(req.params.id)
    })
    res.send(filterID);

    if (error) {
        return res.status(500).send("Failed to connect to Database, try later!");
    }

})



//             ==========  POST new data   ==========

app.post("/contacts", async (req, res) => {

    const [error, data] = await readTheFile();

    let newContact = req.body;
    // newContact.id = data[data.lenght - 1].id + 1 
    data.push(newContact)

    res.send({ message: "Thanks for your data", result: data });

    if (error) {
        return res.status(500).send("Failed to connect to Database, try later!");
    }
})

//             ==========  PUT (Replace) new data   ==========
// Happens in Postman!! 
// Write new data in postman and format into json


app.put("/contacts/:id", async (req, res) => {

    const [error, data] = await readTheFile();
    let addContact = req.body;
    let contactID = req.params.id;

    const index = data.findIndex((elt) => {
        return elt.id === Number(contactID)
    })
    data[index] = addContact

    res.send(data);

    if (error) {
        return res.status(500).send("Failed to connect to Database, try later!");
    }

})




//             ==========  Delete Data   ==========

app.delete("/contacts/:id", async (req, res) => {


})


