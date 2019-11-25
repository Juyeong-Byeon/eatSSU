var express = require('express');
var router = express.Router();
const mysql=require('mysql');
// router.use('/kind', express.static('/public'));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '654654',
  database : 'eatSSU',
  port :3307
});

connection.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
  let category=req.query.category
  console.log(category);

  if(category){
  connection.query(
    "SELECT *FROM restaurant WHERE category='"+req.query.category+"'",(error,results,fields)=>{
      if(error) console.log(error);
      else{
      console.log(results);
      res.render('indexeatSSU', { title: 'eatSSU' ,tableShow:results});
      }
    }
    );
  }else{
    connection.query(
    "SELECT *FROM restaurant",(error,results,fields)=>{
        if(error) console.log(error);
        else{
        console.log(results);
        res.render('indexeatSSU', { title: 'eatSSU' ,tableShow:results});
        }
      }
    );

  }
 
});

/* GET home page. */
router.get('/kind/:category', function(req, res, next) {
 
  let category=req.params.category
  console.log(req.params.name);
  if(category!='all'){
    connection.query(
      "SELECT *FROM restaurant WHERE category='"+req.params.category+"'",(error,results,fields)=>{
        if(error) console.log(error);
        else{
        console.log(results);
        res.render('indexeatSSU', { title: 'eatSSU' ,tableShow:results, name: category});
        }
      }
      );  
  }else{
      connection.query(
        "SELECT *FROM restaurant",(error,results,fields)=>{
          if(error) console.log(error);
          else{
          console.log(results);
          res.render('indexeatSSU', { title: 'eatSSU' ,tableShow:results });
          }
        }
        );
  }
 
});

router.get('/storeName:',(req,res,next)=>{
  res.send('OK');
});

router.get('/kind/:name/random', function(req, res, next) {
  console.log(req.params.name);
  connection.query(
    "SELECT *FROM restaurant WHERE category='"+req.params.name+"'",(error,results,fields)=>{
      if(error) console.log(error);
      else{
      console.log(results);
      const randomIndex = Math.floor(Math.random() *  results.length);
      console.log(randomIndex);
      res.render('random', { title: 'eatSSU' ,store:results[randomIndex]});
      }
    }
    );

});

module.exports = router;