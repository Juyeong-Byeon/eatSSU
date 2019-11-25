var express = require('express');
var router = express.Router();
const mysql=require('mysql');
router.use(express.static('public'));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'dbgmlehd',
  database : 'eatSSU',
  port :3306
});

connection.connect();



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.category);
  connection.query(
    "SELECT *FROM restaurant WHERE category='"+req.query.category+"'",(error,results,fields)=>{
      if(error) console.log(error);
      else{
      console.log(results);
      res.render('indexeatSSU', { title: 'eatSSU' ,tableShow:results});
      }
    }
    );
 
});

router.get('/storeName:',(req,res,next)=>{

  res.send('OK');


});

module.exports = router;
