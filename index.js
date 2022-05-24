const defbtn = document.getElementById("define")
const wordloc = document.getElementById("word")
const others = document.getElementById("others")
const defloc = document.getElementById("definition")
const changebtn = document.getElementById("change")

let word
let data
let defin

let index = 0
others.hidden=true


defbtn.addEventListener("click", async function(){
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  let result
  try {
    [{result}] = await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: () => getSelection().toString(),
    });
  } catch (e) {
    return; 
  }
    if(result ==""){
        others.hidden = true
        return
        
    }
    word = result
    lookUp()
    others.hidden = false
})

changebtn.addEventListener("click", function(){
    index++
    if (index==data[0].meanings.length){
        index = 0
    }
    defin = data[0].meanings[index].definitions[0].definition
    defloc.innerText = defin
})


async function lookUp(){
let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  let response = await fetch(url);
  data = await response.json();
  defin = data[0].meanings[index].definitions[0].definition
  wordloc.innerText = word.charAt(0).toUpperCase() + word.slice(1)
  defloc.innerText = defin
  console.log(data)
  console.log(data[0].meanings.length)
}




