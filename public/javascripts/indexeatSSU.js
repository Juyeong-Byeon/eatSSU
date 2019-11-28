
function deleteReview(reviewID,nickname,password){
    console.log("review"+reviewID);

    let inputpassword=prompt('비밀번호:');
    if (inputpassword==password) {
        return true;
        
    }else{
        alert('비밀번호가 틀렸습니다.!');
        return false;
    }


}




window.addEventListener('load',()=>{

    console.log('hi');



});

