// const element=document.getElementById("homepagebody");
// setInterval(() => {
//         if(element.className=='homepag'){
//             element.className='homepag1';
//         }
//         else if(element.className=='homepag1'){
//             element.className='homepag2';
//         }
//         else if(element.className=='homepag2'){
//             element.className='homepag3';
//         }
//         else if(element.className=='homepag3'){
//             element.className='homepag';
//         }
// }, 2000);
let ind=0;
var content='Welcome To Our Website';
var arr=Array.from(content);
setInterval(()=>{
    document.getElementById('dynamic').innerHTML='';
    let ind=0;
    let id=setInterval(()=>{
        document.getElementById('dynamic').innerHTML+=arr[ind]; 
        ind++;
        if(ind>21) clearInterval(id);
    }, 80)
}, 2500);
