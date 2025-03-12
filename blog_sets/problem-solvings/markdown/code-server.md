# 搭建Code-Server
写这个文档用来记录在虚拟机上搭建code-server的过程

## 准备工作
### 安装虚拟机
ubuntu 24 lts，没什么好说的

### 安装code-server
从github中下载安装包
```sh
wget https://github.com/coder/code-server/releases
```

初次启动
```sh
code-server --port 8888 --host 0.0.0.0
```

在VMware中设置虚拟机ssh端口映射到8888<br>
code-server监听虚拟机的8888端口，此端口映射到物理机的8889

启动成功后在浏览器中打开网页可以看到提示：
>Please log in below. Check the config file at xxx for the password.

可以去xxx目录修改密码，还需要修改bind-addr和port

至此code-server已经基本可以使用了

## 配置https
code-server的预览、剪贴板等功能必须在有证书的https环境下才可用

这部分为code-server配置https和证书

### 证书制作
使用mkcert工具制作自签名证书
```sh
sudo apt install mkcert
```

制作证书
```sh
mkcert 100.64.0.0
```
为服务器的地址制作证书

### 更改配置
在之前的xxx文件中更改证书相关配置
```
cert: file name of cert
cert-key: file name of cert-key
```

至此code-server已经可以运行在https下了<br>
但是在使用code-server的电脑上还需要安装CA证书，否则仍然会报错

### 安装CA证书
从`~/.local/share/mkcert`中下载`rootCA.pem`，并在本地修改后缀为`.crt`

windows中双击安装，安装位置为
> 将所有的证书都放入下列存储<br>
> 受信任的根证书颁发机构

如果要删除证书，在Win+R中输入`certmgr.msc`