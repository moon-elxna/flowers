//main
const ctx = document.getElementById("canvas").getContext("2d");
const counters = {
    flower: { current: 0, max: 5 },
    stem: { current: 0 , max: 5 },
    decor: { current:0 , max: 4 }
}

read_url();
//functions
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
    redraw_img(id);
   // document.getElementById(id).src = "img/" + id + "/" + counter.current + ".PNG";
}

function download_img(){
   /* //neue canvas erstellen
    const canvas = document.createElement("canvas");
    canvas.width = 350;
    canvas.height = 700;
    // Zeichenwerzeug holen, ctx = context, 2d = 2d grafik
    const ctx = canvas.getContext("2d");
    //Bilder aus HTML holen
    const flower_img = document.getElementById("flower");
    const stem_img = document.getElementById("stem");
    const decor_img = document.getElementById("decor");
    //Bilder übereinader zeichen, 0,0 = oben-links Position
    ctx.drawImage(stem_img,0,0);
    ctx.drawImage(decor_img,0,0);
    ctx.drawImage(flower_img,0,0);
    //download link erstellen
    const link = document.createElement("a"); */
    // canvas zu png, toDataURL() = "Konvertiere Canvas zu PNG-Daten"
    link.href = canvas.toDataURL("image/png");
    //Dateiname setzen, 
    link.download = "ur_flower.png"
    //download starten
    link.click();
}

function share_url(){
    //add parameters to link, "?parameter=value&parameter=value ..."
    let url = "https://moon-elxna.github.io/build-ur-flower/?flower="+ counters.flower.current +"&stem=" + 
        counters.stem.current + "&decor=" + counters.decor.current;
    let text = "Check out my flower creation and build yours next!"
    //write the string to the clipboard
    navigator.clipboard.writeText(text + " " + url);
    navigator.clipboard.writeText(url);
}

function read_url(){
    //get params, params.get('') = grab the paramter from url, parseInt() = converts String to Integer
    function get_params(id, params){
        const counter = counters[id];
        if (params.has(id)){
            let val = parseInt(params.get(id)); 
            //check if valid
            if(val > counter.max || val <= 0){
                counter.current = 1;
            }
            else{
                counter.current = val
            }   
        }
        else  {
            counter.current = 1;
        }
    }
    //grab parameters from the url, URLSearchParams = helper object for query parameters, windows = browser window, location = current page url, search = url after "?" 
    const params = new URLSearchParams(window.location.search);
    get_params("stem", params);
    get_params("decor", params);
    get_params("flower",params);
    redraw_img();
    
}

//asynch function to redraw img
async function redraw_img(){
    //function to draw part of the img
    function draw_img(id){
        const counter = counters[id];
        return new Promise(resolve => { //starts the Promise, waits until the resolved to finish function
            let img  = new Image();
            img.src = "img/" + id + "/" + counter.current + ".PNG";
            img.onload = () => {
                ctx.drawImage(img,0,0);
                resolve(); //returns, that Prommise is resolved ,"layer is finished"
            };
        });
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //await = waits until the fuction is finished, before excuting the next one
    await draw_img("stem");
    await draw_img("decor");
    await draw_img("flower");
}