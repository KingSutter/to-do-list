const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req,res)=>{
    let queryText = `SELECT * FROM "to_dos";`;
    pool.query(queryText).then(result => {
        console.log('sending todos to client');
        res.send(result.rows);
    }).catch(error =>{
        console.log('Error on get:',error);
        res.sendStatus(500);
    });
});

router.put('/:id', (req,res)=>{
    let queryText = `
    UPDATE "to_dos"
    SET completed = ${req.body.completed}
    WHERE "id" = $1;
    `;
    pool.query(queryText, [req.params.id])
    .then(()=>{
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error in put on router:',error);
        res.sendStatus(500);
    });
})
module.exports = router;