const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req,res)=>{
    let queryText = `
        SELECT * FROM "to_dos"
        ORDER BY "id";`;
    pool.query(queryText).then(result => {
        console.log('sending todos to client');
        res.send(result.rows);
    }).catch(error =>{
        console.log('Error on get:',error);
        res.sendStatus(500);
    });
});

router.post('/',  (req, res) => {
    let newTask = req.body;
    console.log(`Adding task`, newTask);
    let queryText = `INSERT INTO "to_dos" ("task","completed")
                     VALUES ($1,'false');`;
    pool.query(queryText, [newTask.task])
      .then(result => {
        console.log("add task success");
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new book`, error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req,res)=>{
    let id = req.params.id;
    console.log("changing status of id:",id);
    let queryText = `
    UPDATE "to_dos"
    SET completed = ${req.body.completed}
    WHERE "id" = $1;
    `;
    pool.query(queryText, [id])
    .then(()=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error in put on router:',error);
        res.sendStatus(500);
    });
})

router.delete('/:id',(req,res)=>{
    let queryText = `
    DELETE FROM "to_dos"
    WHERE "id" = $1;
    `
    pool.query(queryText, [req.params.id])
    .then(()=>{
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log('error in delete on router:',error);
        res.sendStatus(500);
    });
});

module.exports = router;