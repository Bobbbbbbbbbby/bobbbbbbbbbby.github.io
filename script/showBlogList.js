let obj = null;
let blogs = null;
let blogCount = null;

let blogMainOrigin = null;

async function getBlogListHTML(blogSetURL)
{
    obj = await readJsonFile(blogSetURL + "blogs.json");
    blogs = obj.blogs;
    blogCount = obj.blogCount;
    let stringHTML = '<ul>';
    for(let i = 0; i < blogs.length; i++)
    {
        stringHTML += `<li><input type="button" onclick="loadBlogArticle('${blogSetURL + "markdown/" + blogs[i].file}')" value = "${blogs[i].name}"></li>`;
    }
    stringHTML += "</ul>"
    return stringHTML;
}

function loadBlogArticle(markdownURL)
{
    blogMainOrigin = document.getElementById("blogMain").innerHTML;
    document.getElementById("blogMain").innerHTML = `<input type="button" onclick="reloadOrigin()" value = "Go Back">`;
    readTextFile(markdownURL)
        .then((markdown) => document.getElementById("blogMain").innerHTML += marked.parse(markdown));
}

function reloadOrigin()
{
    document.getElementById("blogMain").innerHTML = blogMainOrigin;
}