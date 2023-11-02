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
    for (let i = 0; i < count; i++)
    {
        //stringHTML += '<li>' + '<input type="button" onclick="loadBlogArticles" value="' + sets[i].name + '">' + '</li>';
        stringHTML += `<li><input type="button" onclick="loadBlogArticles(${i})" value="${sets[i].name}"></li>`
    }
    stringHTML += "</ul>";
    return stringHTML;
}

async function getArticleDiv(setIndex)
{
    const obj = await readJsonFile(baseUrl + sets[setIndex].dir);
    const blogs = obj.blogs;
    const count = obj.blogCount;
    let stringHTML = "<ul>";
    for(let i = 0; i < count; i++)
    {
        stringHTML += `<li><a href="">${blogs[i].name}</a></li>`;
    }
    stringHTML += '</ul>';
    return stringHTML;
}

function loadBlogArticles(setIndex)
{
    articleMainOrigin = document.getElementById("article_main").innerHTML;
    let newContent = `<h1>${sets[setIndex].name}</h1>`;
    newContent += `<div><input type="button" onclick="reloadOrigin()" value="Go Back"></div>`
    newContent += `<div id="articles"></div>`
    document.getElementById("article_main").innerHTML = newContent;
    getArticleDiv(setIndex)
    .then((inner)=> document.getElementById("articles").innerHTML = inner);
}

function reloadOrigin()
{
    document.getElementById("article_main").innerHTML = articleMainOrigin;
}