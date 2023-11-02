function readTextFile(file)
{
    var markdown = "";
    fetch(file).then(res => {
        markdown = res.text();
    });
    return markdown;
}