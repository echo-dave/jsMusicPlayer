const scrollingSongTitle = (el1, el2) => {
    el1.classList.remove('long');
    let getScrollLength =  el1.scrollWidth;
    let getClientlLength = el2.clientWidth;
    if (getScrollLength > getClientlLength) {
        setTimeout(() => {
            el1.classList.add('long');
            el1.style.visibility = null;
            console.log('long title');
        }, 50);
       
    }  
}

export {scrollingSongTitle as scroll} ;