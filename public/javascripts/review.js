function checkNull(){
    const nicknameInput=document.querySelector('#nickname');
   const reviewDescInput=document.querySelector('#content');
    if(nicknameInput.value==""||reviewDescInput.value==""){

        alert('입력 폼을 채우십시오!');

        return false;

    }else{

        return true;

    }


}


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
