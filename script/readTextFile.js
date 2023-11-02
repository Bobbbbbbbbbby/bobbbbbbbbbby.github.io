async function readTextFile(file)
{
    var response = await fetch(file);
    var markdown = await response.text();
    return markdown;
}