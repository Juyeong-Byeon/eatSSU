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