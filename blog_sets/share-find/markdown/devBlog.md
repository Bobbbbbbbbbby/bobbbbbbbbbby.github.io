# 开发日志

### Day minus
前两天花了九牛二虎之力学习了JavaScript然后给Blog的框架基本定型了，具体的设计看Problem Solving的静态Blog实现方式

### 完成了基本的框架
开始美化页面，研究CSS

给Index写CSS的时候发现背景图片y轴位置设置为bottom始终在最上方，原因是html的高度没有指定，然后整个页面到body的最下面就终止了，但是body非常短，只要给html设置高度和宽度100%，就能到页面最下方了。

如果要body的底部在页面的最下方，要先给html设置高度为100%，再给body设置高度为100%。<br>
因为body的是html的子元素，子元素50%的意思是父元素大小的50%。

在调成了100%之后，虽然背景图片的位置正确了，但是出现了令人厌恶的滚动条，原因是浏览器的margin默认不为0，导致html加上margin的大小实际上大于浏览器页面。只要给html和body的margin设为0就不会有滚动条了。

### 为页面添加康陶元素
*希望根据智能电子解决方案的白线来为页面添加边框*<br>
为了让canvas覆盖整个屏幕，需要在css中进行如下处理，使得坐标采用绝对位置：
```css
{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}
```
准备采用`HTML canvas`的方式去做，一开始就发现画的东西错位，是因为`canvas`标签的`height`和`width`与其`style`
中的`height`和`width`不是一个东西，需要优先设置标签的长和宽。<br>
我使用`window.addEventListener`监听`resize`，在每次调整窗口大小时重新绘制边框。

为了美观和方便起见，只有第一次打开窗口时才会动态绘制边框，在边框绘制完成后才会加载其他页面内容，每次`resize`都会立刻绘制完整边框而不会显示动画

在加上了canvas之后，还会出现点击不了链接的现象，因为canvas接收了鼠标点击事件，只需要在它的style中加上`style="pointer-events: none"`中就解决了问题。