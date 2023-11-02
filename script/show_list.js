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



var baseUrl = "https://bobbbbbbbbbby.github.io/";
var setsUrl = baseUrl + "blog_sets/";
var setsListJsonUrl = setsUrl + "sets.json/"
var scriptUrl = baseUrl + "script/";

async function getListDiv()
{
    var obj = await readJsonFile(setsListJsonUrl);
    var sets = obj.sets;
    var count = obj.count;
    var stringHTML = "<ul>";
    for (var i = 0; i < count; i++)
    {
        stringHTML += "<li>" + sets[i].name + "</li>";
    }
    stringHTML += "</ul>";
    return stringHTML;
}

async function readTextFile(file) {
    var response = await fetch(file);
    var markdown = await response.text();
    return markdown;
}

async function readJsonFile(file) {
    var response = await fetch(file);
    var objFile = await response.json();
    return objFile;
}