function generator() {
    var planetID = "circle";
    var nameID = "color";
    var text = document.getElementById(nameID).innerHTML;
    color(text, planetID);
    //size(text, planetID);
    glow(text, planetID)
}

/*
color:
returns a string in the format rgb(#, #, #) to set css color

input:
text - string
*/
function color(text, planetID) {
    //get number ascii sum
    sum = 0;
    for (i = 0; i < text.length; i++) {
        sum += text.charCodeAt(i);
    }
    //3 prime numbers, mod each to 255 from ascii value
    red = ((sum * 331) % 255).toString();
    green = ((sum * 911) % 255).toString();
    blue = ((sum * 509) % 255).toString();

    rgb = "rgb(" + red + " , " + green + " , " + blue + ")"
    document.getElementById(planetID).style.backgroundColor = rgb;

}

function size(text, planetID) {
    //base size on first character
    //33 - 126 about
    size = (text.charCodeAt(0)) * 5;

    planet = document.getElementById(planetID);

    // if (text.charCodeAt(0) > 80) {
    //     horz = ((size * charCodeAt(1)) / 900).toString();
    //     vert = ((size * charCodeAt(2)) / 900).toString();
    //     planet.style.transform = "scale(" + horz + ", " + vert + ")";
    //     console.log(horz);
    //     console.log(vert);
    // } else {
    planet.style.height = size.toString() + "px";
    planet.style.width = size.toString() + "px"; planet.style.transform = "scale(" + size.toString() + ")";

    console.log(size);

}

function glow(text, planetID) {
    planet = document.getElementById(planetID);
    inner = (50).toString()//(text.charCodeAt(1) - 65).toString();
    outer = (text.charCodeAt(0)).toString();
    refernce = "abcdef"
    index = "aaf"
    color_glow = refernce[index] + refernce[index] + refernce[index];
    console.log(color_glow);
    box = "inset 0 0 " + inner + "px #" + "f" + "ff, 0 0 " + outer + "px #" + "fff";
    planet.style.boxShadow = box;
}



