function readTextFile(file)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4)
        {
            if (xhr.status === 200)
            {
                var content = xhr.responseText;
                return content;
            }
            else if (xhr.status === 404)
            {
                var content = "# 404 Not Found";
                return content;
            }
            else if (xhr.status === 500)
            {
                var content = "# 500 Internal Error";
                return content;
            }
        }
    }
    xhr.open("GET", file, true);
    xhr.send();
}