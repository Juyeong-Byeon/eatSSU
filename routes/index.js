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
<<<<<<< Updated upstream
=======
          );
    }
  }
  else{//랜덤쿼리가 아닐경우.
    connection.query(//탭에 따른 쿼리
      `SELECT *FROM restaurant WHERE storeName='${req.params.storeName}';SELECT *FROM review WHERE storeName='${req.params.storeName}'`,(error,results,fields)=>{
        if(error) console.log(error);
        else{
        console.log(results[0],results[1]);
        res.render('review',{storeInfo:results[0],reviews:results[1]});
>>>>>>> Stashed changes
        }
        );
  }
<<<<<<< Updated upstream
=======
});

let reviewID=0;//database에서 제일 높은 인덱스 받아와서 넣어줘야 됨. 
router.post('/kind/:category/:storeName',(req,res,next)=>{//리뷰를 작성했을 때 post로 받음. 
  let sqls=[]; //C/R/U/D 기능을 위한 쿼리문들.
  sqls[0]=`INSERT INTO review VALUES(${reviewID++},'${req.params.storeName}','${req.body.nickname}','${req.body.password}','${req.body.reviewDesc}',now());`;//C기능
  sqls[1]=`UPDATE review SET reviewDesc='${req.body.reviewDesc}' where reviewID=(SELECT reviewID FROM review WHERE nickname='${req.body.nickname}' AND password='${req.body.password}')`;//U
  sqls[2]=`DELETE From review where reviewID=(SELECT reviewID FROM review WHERE nickname='${req.body.nickname}' AND password='${req.body.password}');`;//D
  //위 코드상에서 바로 닉네임과 패스워드를 선택해서 삭제해도 되지만 review 릴레이션의 key는 reviewID 와 storeName 이기 때문에 이렇게 쿼리를 작성하였다.
  sqls[3]=`SELECT *FROM restaurant WHERE storeName='${req.params.storeName}'; `;//R기능
  sqls[4]=`SELECT *FROM review WHERE storeName='${req.params.storeName}';`;//R기능
  console.log(`${reviewID}','${req.params.storeName}','${req.body.nickname}','${req.body.password}','${req.body.reviewDesc}`);
  /*
  DELETE From review where reviewID='리뷰아이디';
UPDATE review SET discription='수정 내용' where reviewID=(select reviewID FROM review where nickname=''AND password='');
  들어가야 하는 정보들
  req.params.storeName

  req.body.nickname
  req.body.password
  req.body.reviewDesc
  req.body.date<=이친구는 그냥 now()로 대체 
  */

if(req.body.buttons=='insert'){
 connection.query(//탭에 따른 쿼리
  sqls[0]+sqls[3]+sqls[4],(error,results,fields)=>{
    
    if(error) console.log(error);
    else{
    console.log(results[0],"++++++++++++++");
    res.render('review',{storeInfo:results[1],reviews:results[2]});
    }
  });
}
  
}
);

>>>>>>> Stashed changes

});

module.exports = router;