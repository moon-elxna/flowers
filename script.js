//main
const counters = {
    flower: { current: 1, max: 5},
    stem: { current: 1, max: 5},
    decor: { current: 1 , max: 4}
}
read_url();

//functions
function read_local_storage(){
    function get_item(id){
        const counter = counters[id];
        let test = localStorage.getItem(id);
        if(test != null){
            test = parseInt(test);
            if(test <= counter.max && test > 0){
            counter.current = test; 
        }
        }  
    }
    get_item("flower"); 
    get_item("stem"); 
    get_item("decor");
}

function write_local_storage(){
    function set_item(id){
        const counter = counters[id];
        localStorage.setItem(id, counter.current);
    }
    set_item("flower"); 
    set_item("stem"); 
    set_item("decor");
}

function share_url(){
    //add parameters to link, "?parameter=value&parameter=value ..."
    let url = "https://moon-elxna.github.io/build-ur-flower/?flower="+ counters.flower.current +"&stem=" + 
        counters.stem.current + "&decor=" + counters.decor.current;
    let text = "Check out my flower creation and build yours next!"
    //write the string to the clipboard
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
}

function download_img(){
    //neue canvas erstellen
    const canvas = document.createElement("canvas");
    canvas.width = 350;
    canvas.height = 700;
    // Zeichenwerzeug holen, ctx = context, 2d = 2d grafik
    const ctx = canvas.getContext("2d");
    //add solid bg
    ctx.fillStyle = "#fffafb";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    //Bilder aus HTML holen
    const img_stem = document.getElementById("stem");
    const img_decor = document.getElementById("decor");
    const img_flower = document.getElementById("flower");
    const img_name = document.getElementById("name");
    //Bilder übereinader zeichen, 0,0 = oben-links Position
    ctx.drawImage(img_stem, 0, 0);
    ctx.drawImage(img_decor, 0, 0);
    ctx.drawImage(img_flower, 0, 0);
    ctx.drawImage(img_name, 0, 0);
    //download link erstellen
    const link = document.createElement("a"); 
    // canvas zu png, toDataURL() = "Konvertiere Canvas zu PNG-Daten"
    link.href = canvas.toDataURL("image/png");
    //Dateiname setzen, 
    link.download = "ur_flower.png"
    //download starten
    link.click();
    //alert("Downloaded as PNG!"); 
}

function read_url(){
   //get params, params.get('') = grab the paramter from url, parseInt() = converts String to Integer
    function get_params(id, params){
        const counter = counters[id];
        flag = false;
        if (params.has(id)){
            let val = parseInt(params.get(id)); 
            //check if valid
            if(val > counter.max || val <= 0){
                counter.current = 1;
            }
            else{
                counter.current = val
            }
            document.getElementById(id).src = "assets/" + id + "/" + counter.current + ".PNG";
            flag = true
        }
        else if(flag == false) {
            read_local_storage();
        }
    }
    //grab parameters from the url, URLSearchParams = helper object for query parameters, windows = browser window, location = current page url, search = url after "?" 
    const params = new URLSearchParams(window.location.search);
    get_params("flower",params);
    get_params("stem", params);
    get_params("decor", params);
    write_local_storage();
}

function change_img(id, flag){
    function decrease_counter(counter){
        if(counter.current == 1){
                counter.current = counter.max;
            } else {
                counter.current = counter.current - 1;
            }
    }
    function increase_counter(counter){
        if(counter.current == counter.max){
                counter.current = 1;
            } else {
                counter.current = counter.current + 1;
            }
    }
    const counter = counters[id];
    if(flag == true){ 
        increase_counter(counter);
    } 
    else if(flag == false){
        decrease_counter(counter);
    }   
    document.getElementById(id).src = "assets/" + id + "/" + counter.current + ".PNG";
    write_local_storage();
}