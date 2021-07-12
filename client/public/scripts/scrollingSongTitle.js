const scrollingSongTitle = (el1, el2) => {
    el1.classList.remove('long');
    let getScrollLength =  el1.scrollWidth;
    let getClientlLength = el2.clientWidth;
    if (getScrollLength > getClientlLength) {
        console.log('long title');
        el1.classList.add('long');
    } 
}

export {scrollingSongTitle as scroll} ;