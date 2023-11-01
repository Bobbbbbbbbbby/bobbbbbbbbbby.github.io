var set_string =
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
        stringHTML = stringHTML + "<li>" + sets[i].name + "</li>";
    }
    stringHTML = stringHTML + "</ul>";
    return stringHTML;
}