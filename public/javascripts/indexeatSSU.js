import { sequenceExpression } from "babel-types";

function deleteReview(reviewID,nickname,password){
    console.log("review"+reviewID);

    
    document.querySelector("#review"+reviewID).remove();


}




window.addEventListener('load',()=>{

    console.log('hi');



});

