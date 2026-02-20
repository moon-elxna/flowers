//---main---
const parts = ["stem", "decor","flower"]
const counters = {
    stem: { current: 1, max: 5},
    decor: { current: 1, max: 5},
    flower: { current: 1 , max: 4}
}
read_url();

//---addEventListeners---
arr_btn("l", false); //left btns
arr_btn("r", true); //right btns
document.getElementById("btn_dwn").addEventListener("click", function(){download_img()}); //tool btns
document.getElementById("btn_share").addEventListener("click", function(){share_url()}) //tool btns

//---functions---
function arr_btn(dir, flag){
    for(let i = 0; i<parts.length; i++){
    document.getElementById(dir +"_btn_" + parts[i]).addEventListener("click", function(){change_img(parts[i], flag)})
    }
}

function read_local_storage(){
    for(let i = 0; i < parts.length; i++){
        get_item(parts[i])
    }

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
}

function write_local_storage(){
    for(let i = 0; i < parts.length; i++){
        set_item(parts[i])
    }

    function set_item(id){
        const counter = counters[id];
        localStorage.setItem(id, counter.current);
    }
}

function share_url(){
    let url = "https://moon-elxna.github.io/build-ur-flower/?flower="
        + counters.flower.current +"&stem=" + counters.stem.current + "&decor=" 
        + counters.decor.current; //add parameters to link, "?parameter=value&parameter=value ..."
    navigator.clipboard.writeText("Check out my flower creation and build yours next!\n" + url); //write string to clipboard
    alert("Link to your flower was copied to your clipboard!");
}

function download_img(){
    const canvas = document.createElement("canvas"); //create canvas
    canvas.width = 350; canvas.height = 700;
    const ctx = canvas.getContext("2d"); // get drawing tools in 2d

    ctx.fillStyle = "#fffafb"; //add solid bg
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const img_name = document.getElementById("name"); //get img from html
    ctx.drawImage(img_name, 0, 0); // draw img in postion 0,0 (top-left),btw order like in code
    for(let i = 0; i < parts.length; i++){
        const img = document.getElementById(parts[i]);
        ctx.drawImage(img, 0, 0);
    }
    
    const link = document.createElement("a"); //create dwn link
    link.href = canvas.toDataURL("image/png"); // canvas to png w toDataURL() 
    link.download = "ur_flower.png" //filename
    link.click(); //start dwn
}

function read_url(){
    const params = new URLSearchParams(window.location.search); //grab parameters from the url, URLSearchParams = helper object for query parameters, windows = browser window, location = current page url, search = url after "?" 
    for(let i = 0; i < parts.length; i++){
        get_params(parts[i],params);
    }
    write_local_storage();

    function get_params(id, params){
        const counter = counters[id];
        flag = false;
        if (params.has(id)){
            let val = parseInt(params.get(id)); //params.get('') = grab the paramter from url, parseInt() = converts String to Integer
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
}

function change_img(id, flag){
    const counter = counters[id];
    if(flag == true){ 
        increase_counter(counter);
    } 
    else if(flag == false){
        decrease_counter(counter);
    }   
    document.getElementById(id).src = "assets/" + id + "/" + counter.current + ".PNG";
    write_local_storage();

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
}