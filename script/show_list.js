/*var set_string =
    '{' +
        '"sets":[' +
            '{"name":"Problem Solvings", "dir":"problem-solvings"},' +
            '{"name":"Shares & Findings", "dir":"share-find"}' +
        '],' +
        '"count":2' +
    '}';
var setList = document.getElementById("sets-list");
setList.innerHTML = getListDiv();

function getListDiv() {
    var obj = JSON.parse(set_string);
    var sets = obj.sets;
    var count = obj.count;
    var stringHTML = "<ul>";
    for (var i = 0; i < count; i++) {
        stringHTML = stringHTML + "<li " + "id=" + "'" + sets[i].dir + "'"+ ">" + sets[i].name + "</li>";
    }
    stringHTML = stringHTML + "</ul>";
    return stringHTML;
}*/



const baseUrl = "https://bobbbbbbbbbby.github.io/";
const setsUrl = baseUrl + "blog_sets/";
const setsListJsonUrl = setsUrl + "sets.json"
const scriptUrl = baseUrl + "script/";

async function getListDiv()
{
    const obj = await readJsonFile(setsListJsonUrl);
    const sets = obj.sets;
    const count = obj.setsCount;
    let stringHTML = "<ul>";
    for (let i = 0; i < count; i++)
    {
        stringHTML += "<li>" + sets[i].name + "</li>";
    }
    stringHTML += "</ul>";
    return stringHTML;
}