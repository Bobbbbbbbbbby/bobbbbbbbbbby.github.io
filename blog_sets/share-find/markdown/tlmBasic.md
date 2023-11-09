# TLM基础
围绕一个一发送一接收的module展开，主要内容包括：
* initiator & target module
* top module
* `initiator_thread`完成方式
* target socket注册的`b_transport`函数完成方式
* memory构造

头文件和命名空间
```cpp
#include <systemc>
#include <iostream>
#include "tlm.h"
#include "tlm_utils/simple_initiator_socket.h"
#include "tlm_utils/simple_target_socket.h"

using namespace tlm;
using namespace tlm_utils;
using namespace sc_core;
using namespace sc_dt; // data type
using namespace std;
```

## initiator & target module
例中使用的initiator socket是`tlm_utils`提供的`simple_initiator_socket`<br>
例中使用的target socket是`tlm_utils`提供的`simple_target_socket`

每个transection的发起者(initiator)一定会有一个initiator socket；同理每个transection的接收者一定会有一个target socket，在顶层模块(top)中使用initiator socket的`bind`方法可以建立initiator和target之间的连接

在构造函数`SC_CTOR`中，initiator会将自己用来不断发送内容的`initiator_thread`函数设置为`SC_THREAD`，使用target socket的`register_b_transport`方法来确定被initiator使用的发送*TLM Generic Payload*的函数。在本例中，target是一个内存模块，target的构造函数中还会进行内存的初始化。

## top module
一个top module有一个initiator和一个target，在构造函数`SC_CTOR`中对二者进行初始化，并将二者的socket连接即可，值得注意的是，top的两个子模块既可以用指针表示，在构造函数中`new`出来模块，也可以直接用模块对象表示，在构造函数头上用`:`进行初始化，即有两种写法：

指针写法
```cpp
SC_MODULE(Top){
    Memory* _memory;
    Initiator* _initiator;

    SC_CTOR(Top){
        _memory = new Memory("memory");
        _initiator = new Initiator("initiator");

        _initiator->socket.bind(_memory->socket);
    }
}
```

对象写法
```cpp
SC_MODULE(Top){
    Memory _memory;
    Initiator _initiator;

    SC_CTOR(Top) : _memory("memory"), _initiator("initiator") {
        initiator.socket.bind(memory.socket);
    }
}
```

## `initiator thread`
