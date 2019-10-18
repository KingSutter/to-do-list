const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

router.get('/', (req,res)=>{
    let queryText = `SELECT * FROM "to_dos";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error =>{
        console.log('Error on get:',error);
        res.sendStatus(500);
    });
});

module.exports = router;