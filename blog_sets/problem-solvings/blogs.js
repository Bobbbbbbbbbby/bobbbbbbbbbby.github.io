var blogHello = '{"name":"hello", "dir":"blog_sets/problem-solvings/hello.html"}';
var blog1 = '{"name":"blog1", "dir":"blog_sets/problem-solvings/blog1.html"}'

var blogString = 
'{' +
    '"blogs":['+
        blogHello + ',' + 
        blog1 + 
    '],' +
    '"count":2' + ',' +
    '"name":"problem-solvings"' +
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