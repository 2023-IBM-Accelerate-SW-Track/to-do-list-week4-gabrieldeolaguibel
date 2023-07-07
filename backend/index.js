const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/add/item", addItem);
app.put("/edit/item/:id", editItem);
app.get("/todos", fetchItems);

async function addItem(request, response) {
    const ID = request.body.jsonObject.ID;
    const Task = request.body.jsonObject.Task;
    const Due_date = request.body.jsonObject.Due_date;

    try {
        const data = await fs.readFile("database.json");
        const json = JSON.parse(data);
        json.push({ ID, Task, Due_date });
        await fs.writeFile("database.json", JSON.stringify(json));
        console.log('Successfully added the item');
        response.sendStatus(200);
    } catch (err) {
        console.log("error: ", err);
        response.sendStatus(500);
    }
}

async function editItem (request, response) {
    const id = request.params.id;
    const task = request.body.jsonObject.task;
    const dueDate = request.body.jsonObject.dueDate;

    try {
        const data = await fs.readFile("database.json");
        const json = JSON.parse(data);
        const index = json.findIndex(item => item.ID == id);

        if (index !== -1) {
            json[index].Task = task;
            json[index].Due_date = dueDate;
            await fs.writeFile("database.json", JSON.stringify(json));
            console.log('Successfully updated the item');
            response.sendStatus(200);
        } else {
            response.sendStatus(404);
        }
    } catch (err) {
        console.log("error: ", err);
        response.sendStatus(500);
    }
}

async function fetchItems (request, response) {
    try {
        const data = await fs.readFile("database.json");
        const json = JSON.parse(data);
        response.status(200).send(json);
    } catch (err) {
        console.log("error: ", err);
        response.sendStatus(500);
    }
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
