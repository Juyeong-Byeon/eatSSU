var express = require('express');
var router = express.Router();
const mysql=require('mysql');
// router.use('/kind', express.static('/public'));

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
router.get('/kind/:name', function(req, res, next) {
 
  let category=req.params.name
  console.log(req.params.name);
  if(category!='all'){
    connection.query(
      "SELECT *FROM restaurant WHERE category='"+req.params.name+"'",(error,results,fields)=>{
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

// get random page
router.get('/kind/:name/random', function(req, res, next) {
  let category=req.params.name
  console.log(category);
  if(category!="all"){
    connection.query(
      "SELECT *FROM restaurant WHERE category='"+category+"'",(error,results,fields)=>{
        if(error) console.log(error);
        else{
        console.log(results);
        const randomIndex = Math.floor(Math.random() *  results.length);
        console.log(randomIndex);
        res.render('random', { title: 'eatSSU' ,store:results[randomIndex]});
        }
      }
      );
  }
  else{
      connection.query(
        "SELECT *FROM restaurant",(error,results,fields)=>{
          if(error) console.log(error);
          else{
          console.log(results);
          const randomIndex = Math.floor(Math.random() *  results.length);
          console.log(randomIndex);
          res.render('random', { title: 'eatSSU' ,store:results[randomIndex]});
          }
        }
        );
  }
});

// get store page
router.get('/kind/:name/:storeName', function(req, res, next) {
  let category=req.params.name
  let storeName=req.params.storeName
  console.log(req.params);
  connection.query(
    `SELECT *FROM restaurant WHERE category='${category}' and storeName='${storeName}'`,(error,results,fields)=>{
      if(error) console.log(error);
      else{
      console.log('hi');
      console.log(results);
      res.render('review', { title: 'eatSSU' ,storeName:results.storeName});
      }
    }
  );
});

module.exports = router;