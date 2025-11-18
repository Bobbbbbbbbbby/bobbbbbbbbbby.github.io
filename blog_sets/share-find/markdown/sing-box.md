# 为Linux系统配置sing-box
在sing-box还没有开发图形客户端之前，只能先用命令行版本

配置文件默认放置在`/etc/sing-box/config.json`中

## 从订阅网址下载config文件
使用curl下载：
```sh
curl -o config.json
```

## 将订阅文件复制到默认的配置文件处
```sh
pushd /etc/sing-box
sudo cp ~/Download/config.json config.json
popd
```

## 启动sing-box服务
```
sudo systemctl start sing-box
```