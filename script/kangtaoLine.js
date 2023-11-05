window.addEventListener('resize', instantDraw);
let drawing = 0;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

async function drawBoader()
{
    if (drawing == 1)
        return;
    drawing = 1;
    
    await sleep(300);
    
    let canvas = document.getElementById("kangtaoLine");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let context = canvas.getContext("2d");
    context.strokeStyle = "white";
    context.lineWidth = 2.5;
    context.lineCap = "round";
    
    let kangtaoHeight = window.innerWidth * 0.2 * 0.212;
    let boaderLen = kangtaoHeight * 0.14;
    let bottomY = window.innerHeight - boaderLen;
    let topY = boaderLen;
    let bottomCenterStartLeftX = window.innerWidth * 0.5 - window.innerWidth * 0.067;
    let bottomCenterStartRightX = window.innerWidth * 0.5 + window.innerWidth * 0.064;
    let topCenterEndLeft = window.innerWidth * 0.5 - 70;
    let topCenterEndRight = window.innerWidth * 0.5 + 70;
    let marginStartLeftX = boaderLen;
    let marginStartRightX = window.innerWidth - boaderLen;
    
    await drawLeftRight(context, bottomCenterStartLeftX, bottomY, marginStartLeftX, bottomY, bottomCenterStartRightX, bottomY, marginStartRightX, bottomY);
    await drawLeftRight(context, marginStartLeftX, bottomY, marginStartLeftX, topY, marginStartRightX, bottomY, marginStartRightX, topY);
    await drawLeftRight(context, marginStartLeftX, topY, topCenterEndLeft, topY, marginStartRightX, topY, topCenterEndRight, topY);
    
    drawing = 0;
}

async function drawLeftRight(context, leftStartX, leftStartY, leftEndX, leftEndY, rightStartX, rightStartY, rightEndX, rightEndY)
{
    let leftXHop = (leftEndX - leftStartX) / 120;
    let leftYHop = (leftEndY - leftStartY) / 120;
    let rightXHop = (rightEndX - rightStartX) / 120;
    let rightYHop = (rightEndY - rightStartY) / 120;
    
    let leftX = leftStartX;
    let leftY = leftStartY;
    let rightX = rightStartX;
    let rightY = rightStartY;
    for(let i = 0; i < 120; i++)
    {
        context.moveTo(leftX, leftY);
        leftX += leftXHop;
        leftY += leftYHop;
        context.lineTo(leftX, leftY);
        context.stroke();
        
        context.moveTo(rightX, rightY);
        rightX += rightXHop;
        rightY += rightYHop;
        context.lineTo(rightX, rightY);
        context.stroke();
        await sleep(8);
    }
}

function instantDraw()
{
    let canvas = document.getElementById("kangtaoLine");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let context = canvas.getContext("2d");
    context.strokeStyle = "white";
    context.lineWidth = 2.5;
    context.lineCap = "round";

    let kangtaoHeight = window.innerWidth * 0.2 * 0.212;
    let boaderLen = kangtaoHeight * 0.14;
    let bottomY = window.innerHeight - boaderLen;
    let topY = boaderLen;
    let bottomCenterStartLeftX = window.innerWidth * 0.5 - window.innerWidth * 0.067;
    let bottomCenterStartRightX = window.innerWidth * 0.5 + window.innerWidth * 0.064;
    let topCenterEndLeft = window.innerWidth * 0.5 - 70;
    let topCenterEndRight = window.innerWidth * 0.5 + 70;
    let marginStartLeftX = boaderLen;
    let marginStartRightX = window.innerWidth - boaderLen;

    context.moveTo(bottomCenterStartLeftX, bottomY);
    context.lineTo(marginStartLeftX, bottomY);
    context.stroke();
    
    context.moveTo(bottomCenterStartRightX, bottomY);
    context.lineTo(marginStartRightX, bottomY);
    context.stroke();
    
    context.moveTo(marginStartLeftX, bottomY);
    context.lineTo(marginStartLeftX, topY);
    context.stroke();
    
    context.moveTo(marginStartRightX, bottomY);
    context.lineTo(marginStartRightX, topY);
    context.stroke();
    
    context.moveTo(marginStartLeftX, topY);
    context.lineTo(topCenterEndLeft, topY);
    context.stroke();
    
    context.moveTo(marginStartRightX, topY);
    context.lineTo(topCenterEndRight, topY);
    context.stroke();
}