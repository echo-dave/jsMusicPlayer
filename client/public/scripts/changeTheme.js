function changeTheme() {
    let styles = document.getElementById("theme")
    let currentTheme = styles.href;
    console.log(`theme ${currentTheme}`);
    currentTheme.indexOf("css/varsPink.css") > -1 ? setBlue(styles) : setPink(styles);
}

function setPink(styles) {
    styles.href = "./css/varsPink.css";
    console.log("set pink");
}
function setBlue(styles) {
styles.href = "./css/varsBlue.css";
console.log("set blue");
}