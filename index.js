var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

let taskList = [];

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/api/v1/task-management', function (req, res) {
    console.log(req.body);
    let id = req.body.id,
        description = req.body.description;
    let newTask = {
        "id": id,
        "description": description
    };
    taskList.push(newTask);
    res.send("Task Added");
});

app.get('/api/v1/task-management', function (req, res) {
    let allTasks = 'All Tasks:\n';
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id != -1)
            allTasks += `${taskList[i].id}\t\t\t${taskList[i].description}\n`;
    }
    res.send(allTasks);
});

app.put('/api/v1/task-management', function (req, res) {
    let id = req.body.id,
        description = req.body.description;
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].description = description;
        }
    }
    res.send("Task Updated");
});

app.delete('/api/v1/task-management', function (req, res) {
    let id = req.body.id;
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].id = -1;
        }
    }
    res.send("Task Deleted");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
