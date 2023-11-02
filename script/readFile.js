async function readTextFile(file)
{
    const response = await fetch(file);
    return await response.text();

}

async function readJsonFile(file)
{
    const response = await fetch(file);
    return await response.json();

}