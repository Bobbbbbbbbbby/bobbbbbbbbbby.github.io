async function readTextFile(file)
{
    var response = await fetch(file);
    var markdown = await response.text();
    return markdown;
}

async function readJsonFile(file)
{
    var response = await fetch(file);
    var objFile = await response.json();
    return objFile;
}