export default function counter(){
    let obj = document.createElement('div');
    obj.setAttribute('id', 'counter');
    document.body.appendChild(obj);
    let number = 1;
    obj.innerHTML = number;
    obj.onclick = function(){
        obj.innerHTML = ++number;
    }
}