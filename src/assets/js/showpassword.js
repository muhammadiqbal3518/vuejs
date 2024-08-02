function myFunction() {
    var x = document.getElementById("password");
    var visiOn = document.getElementById("VisiOn");
    var visiOff = document.getElementById("VisiOff");
    if (x.type === "password") {
        x.type = "text";
        visiOn.style.display = "none";
        visiOff.style.display = "block";
    } else {
        x.type = "password";
        visiOn.style.display = "block";
        visiOff.style.display = "none";
    }
}