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
router.get('/kind/:name', function(req, res, next) {
 
  let category=req.params.name
  console.log(req.params.name);
  if(category!='all'&&category!='search'){//현재 단계에서 특수한 경우는 category가 all 이거나  search 인 경우 밖에 없음  두 경우면 fll off
    connection.query(//탭에 따른 쿼리
      "SELECT *FROM restaurant WHERE category='"+req.params.name+"'",(error,results,fields)=>{
        if(error) console.log(error);
        else{
        console.log(results);
        res.render('indexeatSSU', { title: 'eatSSU' ,tableShow:results, name: category});
        }
      }
      );  
  }else if(category=='search'){//search를 할 경우 쿼리문을 읽어와 like 문으로 처리해줌
    console.log("!!!!!"+req.query.searchKeyword);
    connection.query(
      "SELECT *FROM restaurant WHERE storeName LIKE '%"+req.query.searchKeyword+"%'",(error,results,fields)=>{
        if(error) console.log(error);
        else{
        console.log(results);
        res.render('indexeatSSU', { title: 'eatSSU' ,tableShow:results, name: category});
        }
      }
      );  
  }
  else{
      connection.query(//all path로 갈경우 모든 데이터를 불러온다.
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
        res.render('random', { title:'eatSSU' ,results: results[randomIndex]});
        console.log(results[randomIndex]);
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
          
          res.render('random', { title: 'eatSSU' ,results:results[randomIndex]});
          
          }
        }
        );
  }

});

module.exports = router;