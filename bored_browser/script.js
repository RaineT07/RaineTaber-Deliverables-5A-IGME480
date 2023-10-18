
const API_URL = "https://www.boredapi.com/api/activity?participants=1"


const distractionWidget = createDomElement(`
    <div id="myModal" class="modal">
            <div class="modal-content">
                <div class='modal-header'>
                    <P>getting bored? try this...</P>
                </div>
                <div class="modal-body">
                    <p id='activity'>activity placeholder</p>
                    <p id='accessibility-factor'>accessibility: 0</p>
                </div>
                <span class="close">&times; close prompt</span>
            </div>
        </div>
    `);

// const distractionButton = createDomElement(`<button id='myBtn'>open my modal</button>`);

function createDomElement(html) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    console.log(dom.body.firstElementChild);
    return dom.body.firstElementChild;
  }

document.body.prepend(distractionWidget);
// document.body.prepend(distractionButton)

// let btn = document.getElementById('myBtn');


let modal = document.getElementById("myModal");

let span = document.getElementsByClassName("close")[0];


// btn.onclick = function() {
//     modal.style.display='block';
//     console.log('button clicked');
// }

span.onclick = function(){
    console.log('closer clicked');
    modal.style.display = 'none';
    setTimeout(distract,12000);
}



let distract = function(){


    modal.style.display = 'block';
// 
    let maxAccessibility = 0.5;
    let minAccessibility = 0.0;
    let url = API_URL + `&minaccessibility=${minAccessibility}&maxaccessibility=${maxAccessibility}`;
    getData(url);

}

setTimeout(distract,8000);


function getData(url){
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}

function dataError(e){
    console.log("An error occured, sorry!");
}

function dataLoaded(e){
    let xhr = e.target;


    // console.log(xhr);
    let obj;
    try{
        obj = JSON.parse(xhr.responseText);
        console.log(obj);
    }
    catch{
        dataError(e);
    }

    let activityBlock = document.querySelector("#activity");
    let accessibilityBlock = document.querySelector("#accessibility-factor");

    activityBlock.innerHTML = obj['activity'];
    accessibilityBlock.innerHTML = "Accessibility: " + obj['accessibility'];
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = 'none';
        setTimeout(distract,8000);
    }
}

// window.onload = distract;