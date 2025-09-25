# 使用命令行测网速并生成报告
*在申请ehentai hath时特别有用*

### Speedtest
Speedtest是众所周知的网速测试平台，但是通常都在浏览器中使用。然而在Linux server中并不能使用图形界面浏览器，好在Speedtest.net提供了简单易用的命令行测试工具：**Speedtest CLI**

### 安装
在[官方网站](https://www.speedtest.net/apps/cli/)上对不同平台给出了复制粘贴的安装命令：

```sh
## If migrating from prior bintray install instructions please first...
# sudo rm /etc/apt/sources.list.d/speedtest.list
# sudo apt-get update
# sudo apt-get remove speedtest
## Other non-official binaries will conflict with Speedtest CLI
# Example how to remove using apt-get
# sudo apt-get remove speedtest-cli
sudo apt-get install curl
curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | sudo bash
sudo apt-get install speedtest
```

### 测试
在运行完成命令后，直接使用`speedtest`命令就可以测网速并生成报告所在网址