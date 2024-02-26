# DRAM工作原理

## DRAM层级
自上到下：
* Channel<br>
    一台电脑通常有若干个Channel的内存
* Rank<br>
    一个rank通常等同于一条内存
* DRAM Chip<br>
    一个DRAM chip是一个内存颗粒
* Bank<br>
    一个bank由若干个memory array构成
* Row
* Column<br>
    一个memory array有若干行(row)和若干列(column)
* Cell<br>
    Cell是内存的最小单元

## DRAM结构说明
### Cell
1 * cell = 1 * transistor + 1 * capacitance

晶体管的gate连接word line，晶体管的source接bit line

在word line使gate导通时，bit line将连通电容，使得bit line连接的感应放大器得到被放大的电压

当电容中充满正电荷时，储存1，否则储存0

### Memory Array
一个word line连接了多个cell，构成一个row

将多个row平行放置，垂直于word line的bit line也连接了多个cell，构成一个column

所有的column作为多路复用器的输入

一个memory array根据输入的(row, column)来决定输出其中特定的一个cell储存的1 bit数据

一个memory array还需要一个写使能信号(WE: Write Enable)来控制读写

#### Memory Array的设计
如果memory array过大，分开布置的行地址线(RAS: Row Address Strop)和列地址线(CAS: Column Address Strop)使用的大量线将会占用大量空间。

为了解决此问题，可以使用一组线，先输入RAS后输入CAS。<br>
**注意**: *一定为此固定的先后顺序，因为先输入的RAS可以使row上所有cell的数据被感应放大器保存*

### Bank
Bank是控制DRAM的最小单元！

将8个memory array堆叠，每个memory array公用相同的输入信号线，每个memory array输入相同位置的bit，合起来就是一个byte。

#### Bank设计考量
* Bank Burst Mode

一个memory array在读取一个bit时，将会打开这个bit所在row的所有cell，但是最终只用了一个cell的数据。

为了避免浪费，bank burst会将指定bit的相邻bit进行输出，输出长度即burst length。不同类型的DRAM使用的burst length不全相同。

* Bank Interleave & Bank Conflict

*interleave: 交织，交错*

读取一个byte的过程：
1. capacitance recharge & bit line precharge
2. output
3. capacitance recharge & bit line precharge

第三个阶段中此bank将无法再次进行访问

Bank interleave使得控制器交错的读取不同bank的数据，来确保读取bank一直处于可用状态。

如果控制器不可避免的连续读取相同bank中的（不同row）的数据，则将会出现必须阻塞等待的情况，即bank conflict.