# 开发日志

### Day minus
前两天花了九牛二虎之力学习了JavaScript然后给Blog的框架基本定型了，具体的设计看Problem Solving的静态Blog实现方式

### Day 1
开始美化页面，研究CSS

给Index写CSS的时候发现背景图片y轴位置设置为bottom始终在最上方，原因是html的高度没有指定，然后整个页面到body的最下面就终止了，但是body非常短，只要给html设置高度和宽度100%，就能到页面最下方了。

如果要body的底部在页面的最下方，要先给html设置高度为100%，再给body设置高度为100%。<br>
因为body的是html的子元素，子元素50%的意思是父元素大小的50%。

在调成了100%之后，虽然背景图片的位置正确了，但是出现了令人厌恶的滚动条，原因是浏览器的margin默认不为0，导致html加上margin的大小实际上大于浏览器页面。只要给html和body的margin设为0就不会有滚动条了。