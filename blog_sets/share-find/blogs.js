var blogHello = '{"name":"hello", "dir":"hello.md"}';

var blogString = 
'{' +
    '"blogs":['+
        blogHello +
    '],' +
    '"count":1' + ',' +
    '"name":"share-find"' +
'}';

var obj = JSON.parse(blogString);
var sets = obj.blogs;
var count = obj.count;
var blogName = obj.name;

var stringHTML = "<ul>";
for(var i = 0; i < count; i++)
{
    stringHTML = stringHTML + '<li><a href="' + sets[i].dir + '">' + sets[i].name + "</a></li>";
}
stringHTML = stringHTML + "</ul>"

var target = document.getElementById(blogName);
target.innerHTML = target.innerHTML + stringHTML;