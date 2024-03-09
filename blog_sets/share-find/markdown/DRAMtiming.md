# Understanding Timing Parameters
Quote: [Understanding Timing Parameters](https://www.systemverilog.io/design/understanding-ddr4-timing-parameters/#ddr4-sdram-understanding-timing-parameters)

## Timing for ACTIVATE
ACTIVATE命令用来打开bank中的一行，一次只能由一行处于打开状态，有三个重要时序参数需要了解：tRRD_S, tRRD_L, tFAW

### tRRD_S
time: row-to-row delay(short)

表示两个向不同bankgroup中发送的ACTIVATE命令之间允许的最短间隔。

### tRRD_L
time: row-to-row delay(long)

表示两个向相同bankgroup中发送的ACTIVATE命令之间允许的最短时间间隔。

### tFAW
time: four activate window

在一个tFAW中，最多只能发送四个ACTIVATE命令

## Timing for REFRESH
控制器需要以平均tREFI每次的频率发送REFRESH命令。

但是在REFRESH命令能被使用之前，SDRAM的所有bank都要被precharged并最短保持tRP的空闲状态。

一旦REFRESH命令发送，在下一个有效指令发送之前必须等待一个延迟tRFC

### tREFI
time: refresh interval

### tRP
time: refresh after precharge

表示precharge多久之后才能进行refresh

### tRFC
time: 

表示refresh多久之后才能接受下一个command

## Timing for READ
总共有三类：Overall read timing, Clock-to-Strobe relationship, Data Strobe to Data relationship

### CL
CAS Latency

CAS是列地址线，当列地址保持在线上时，CL是READ命令和第一个输出数据bit之间间隔的周期数

### AL
Additive Latency

有了AL，就允许READ命令在ACTIVATE命令之后立刻发送，在READ被发送到device里面去之前至少保持AL的时间

### RL
Read Latency

表示总体的Read延迟，RL = CL + AL

### tCCD_S & tCCD_L
time: column-to-column delay(short/long)

对不同的bankgroup的读访问间隔会比对相同bankgroup的读访问间隔时间短

### tDQSCK