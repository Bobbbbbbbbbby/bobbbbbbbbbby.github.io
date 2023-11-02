const baseURL = "https://bobbbbbbbbbby.github.io/";
const setsURL = baseURL + "blog_sets/";

let obj = null;
let blogs = null;
let blogCount = null;

async function getBlogListHTML(blogSetURL)
{
    obj = await readJsonFile(blogSetURL + "blogs.json");
    blogs = obj.blogs;
    blogCount = obj.blogCount;
    let stringHTML = '<ul>';
    for(let i = 0; i < blogCount; i++)
    {
        stringHTML += `<li><input type="button" onclick="loadBlogArticle('${blogSetURL + blogs[i].file}')" value = "${blogs[i].name}"></li>`;
    }
    stringHTML += "</ul>"
    return stringHTML;
}

function loadBlogArticle(markdownURL)
{
    alert("hello");
}