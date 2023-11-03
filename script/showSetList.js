const baseUrl = "https://bobbbbbbbbbby.github.io/";
const setsUrl = baseUrl + "blog_sets/";
const setsListJsonUrl = setsUrl + "sets.json"

let obj = null;
let sets = null;
let count = null;
let articleMainOrigin = null;

async function getListDiv()
{
    obj = await readJsonFile(setsListJsonUrl);
    sets = obj.sets;
    count = obj.setsCount;
    let stringHTML = "<ul>";
    for (let i = 0; i < sets.length; i++)
    {
        stringHTML += `<li><a href="./${sets[i].mainPage}">${sets[i].name}</a></li>`;
    }
    stringHTML += "</ul>";
    return stringHTML;
}