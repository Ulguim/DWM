function handleTopnav() {
    var x = document.getElementById("topNav");

    if (x.className === "topNav") {
        console.log('é');
        x.className = "hideNav";
    } else {
        console.log('não é');
        x.className = "topNav";
    }
}