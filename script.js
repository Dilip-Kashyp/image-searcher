const key = "lWNrneLr-asmubMwq-wrE-kJjuUVmZKpPVOV--jFtHM";
const form = document.querySelector("form");
const Search_query = document.getElementById("Search-box");
const searchResult = document.querySelector(".Search-result");
const ShowMore = document.getElementById("show-more");

let input_data = "";
let page = 1;

async function SearchImg(){
    input_data = Search_query.value; 
    const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${input_data}&client_id=${key}`;
    const response = await fetch(url);
    const data = await response.json();
 
    const results = data.results;
    if(page===1){
        searchResult.innerHTML = "";
    } 
    results.map((result)=>{
        const imagewreper = document.createElement("div");
        imagewreper.classList.add("Search-img");
        const image = document.createElement("img")
        image.src=result.urls.small;
        
        const imagelink = document.createElement("a");
        imagelink.href = result.links.html
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imagewreper.appendChild(image)
        imagewreper.appendChild(imagelink)

        searchResult.appendChild(imagewreper);     
    })
    page++;
    if(page > 1){
        ShowMore.style.display="block";
    }
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("submit")
    page = 1;
    SearchImg();

});

ShowMore.addEventListener("click",()=>{
    SearchImg();
})