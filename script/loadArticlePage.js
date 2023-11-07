let innerPageContentSave = null;

function loadArticlePage()
{
    let element = document.getElementById("innerPage");
    innerPageContentSave = element.innerHTML;
    element.innerHTML = `<br><iframe id="innerFrame" title="Article Page" src="blog_articles.html"></iframe>`;
    element.innerHTML += `<input id="goback" "type="button" onclick="reloadSave()" value="Go Back">`;
    let innerFrame = document.getElementById("innerFrame");
    innerFrame.width = window.innerWidth * 0.9;
    innerFrame.height = window.innerHeight - 40 - window.innerWidth * 0.2 * 0.212;
}

function reloadSave()
{
    let element = document.getElementById("innerPage");
    element.innerHTML = innerPageContentSave;
}