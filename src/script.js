const progress_cat = document.querySelector(".progress-cat")
const progress_dog = document.querySelector(".progress-dog")
const progress_parrot = document.querySelector(".progress-parrot")
const url = new URL("https://sf-pyw.mosyag.in/")

function sendVote(){
    const xmlhttp = new XMLHttpRequest()
    if (event.target.classList.contains("vote-cat")){
        xmlhttp.open("POST", url + "sse/vote/cats", true)
    }else if (event.target.classList.contains("vote-dog")){
        xmlhttp.open("POST", url + "sse/vote/dogs", true)
    }else if (event.target.classList.contains("vote-parrot")){
        xmlhttp.open("POST", url + "sse/vote/parrots", true)
    };
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xmlhttp.send("")
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4){
            //console.log(JSON.parse(xmlhttp.responseText).message)
            showResult()
        };
    };
};

function showResult(){
    document.querySelector(".voting-form").classList.add("hide")
    document.querySelector(".score").classList.remove("hide")
    const header = new Headers({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': '*'
    })
    const backend = new EventSource(url + "sse/vote/stats", header)
    backend.onmessage = ({data}) => {
        var stats = JSON.parse(data)
        document.querySelector(".number-cat").textContent = stats.cats
        document.querySelector(".number-dog").textContent = stats.dogs
        document.querySelector(".number-parrot").textContent = stats.parrots
        const max_value = Math.max(stats.cats, stats.dogs, stats.parrots)
        progress_cat.max = max_value + Math.floor(max_value / 4)
        progress_dog.max = max_value + Math.floor(max_value / 4)
        progress_parrot.max = max_value + Math.floor(max_value / 4)
        progress_cat.value = stats.cats
        progress_dog.value = stats.dogs
        progress_parrot.value = stats.parrots
    }
};

function init(){
    document.querySelector(".vote-cat").addEventListener("click", sendVote);
    document.querySelector(".vote-dog").addEventListener("click", sendVote);
    document.querySelector(".vote-parrot").addEventListener("click", sendVote);
};

document.addEventListener("DOMContentLoaded", function(event){
    init();
});