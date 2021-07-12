const scrollingSongTitle = (el) => {
    let getScrollLength = (el) =>{ return el.scrollWidth};
    let getClientlLength = (el) =>{ return el.clientWidth};

    if (getScrollLength("#songTitle") > getClientlLength("#player figcaption")) {
        el.classList.add('long')
    };
}

export default scrollingSongTitle;