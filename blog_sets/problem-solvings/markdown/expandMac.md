# M1 Mac删除Asahi Linux分区遇到的问题

在安装Asahi Linux的时候，安装工具会自动对Mac硬盘进行分区，按顺序创建一个EFI分区和一个数据分区

不再使用Asahi Linux之后，可以在MacOS磁盘管理中格式化分区，但是在扩展MacOS分区时总是会报错

在我一通捣鼓之下，发现虽然MacOS磁盘管理中没有显示EFI分区，但是`diskUtil list`告诉我在Asahi Linux数据分区和MacOS数据分区之间还有一个EFI分区

使用`diskUtil eraseVolume`即可将此EFI分区删除，之后再去MacOS磁盘管理中进行分区就不会报错了。