
const counters = {
    flower: { current: 1, max: 5 },
    stem: { current: 1, max: 5 },
    decor: { current: 1, max: 4 }
}

function change_img(id, direction){
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
    if(direction == "inc"){ increase_counter(counter);} 
    else if(direction == "dec"){decrease_counter(counter);}   
    console.log("img/" + id + "/" + counter + ".PNG");
    document.getElementById(id).src = "img/" + id + "/" + counter.current + ".PNG";
}