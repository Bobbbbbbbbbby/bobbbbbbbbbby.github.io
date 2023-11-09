# TLM基础
围绕一个一发送一接收的module展开，主要内容包括：
* initiator & target module
* top module
* `initiator_thread`完成方式
* target socket注册的`b_transport`函数完成方式

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
发送的内容是initiator的`private`成员`data`

过程：
1. 创建`tlm_generic_payload`
2. 创建`sc_time delay`
3. 循环发送每一个transection
    * 设置command
    * 设置memory接收的地址
    * 设置发送/接受数据内容的指针，指向`data`
    * 设置数据长度
    * 设置流传输宽度
    * 设置字节使能指针
    * 设置dmi
    * 设置返回状态
    * 阻塞发送
    * 检查返回状态
    * 输出结果
    * `wait(delay)`加延迟

## `b_transport`
1. 得到接收的`tlm_generic_payload`的各项数据
2. 检查错误
3. 根据command操作内存<br>
> memory本身就是一个`int`数组
4. 将`tlm_generic_payload`的response_status设为`OK`

## 全部代码
```cpp
#define SC_INCLUDE_DYNAMIC_PROCESS

#include <systemc>
#include <iostream>
#include "tlm.h"
#include "tlm_utils/simple_initiator_socket.h"
#include "tlm_utils/simple_target_socket.h"

using namespace tlm_utils;
using namespace tlm;
using namespace sc_core;
using namespace sc_dt;
using namespace std;

SC_MODULE(Initiator){
    simple_initiator_socket<Initiator> socket;

    SC_CTOR(Initiator) : socket("socket"){
        SC_THREAD(initiator_thread);
    }

    void initiator_thread(void);

    private:
        int data;
};

SC_MODULE(Memory){
    simple_target_socket<Memory> socket;
    const static int size = 256;

    SC_CTOR(Memory) : socket("socket"){
        socket.register_b_transport(this, &Memory::b_transport);
        mem_init();
    }

    virtual void b_transport(tlm_generic_payload & trans, sc_time & delay);
    void mem_init();

private:
    int mem[size];
};

/*SC_MODULE(Top){
    Memory* _memory;
    Initiator* _initiator;

    SC_CTOR(Top){
        _memory = new Memory("memory");
        _initiator = new Initiator("initiator");

        _initiator->socket.bind(_memory->socket);
    }
};*/

SC_MODULE(Top)
{
    Memory memory;
    Initiator initiator;
    SC_CTOR(Top) : memory("memory"), initiator("initiator"){
        initiator.socket.bind(memory.socket);
    }
};

int sc_main(int argc, char* argv[])
{
    Top top("top");
    sc_start();
    return 0;
}

void Initiator::initiator_thread(void){
    tlm_generic_payload *trans = new tlm_generic_payload;
    sc_time delay = sc_time(10, SC_NS);

    for (int i = 0; i < 256; i += 1)
    {
        tlm_command cmd = static_cast<tlm_command>(rand() % 2);
        if(cmd == TLM_WRITE_COMMAND){
            data = 0xFF000000 | i;
        }

        trans->set_command(cmd);
        trans->set_address(i);
        trans->set_data_ptr(reinterpret_cast<unsigned char *>(&data));
        trans->set_data_length(4);
        trans->set_streaming_width(4);
        trans->set_byte_enable_ptr(0);
        trans->set_dmi_allowed(false);
        trans->set_response_status(TLM_INCOMPLETE_RESPONSE);

        socket->b_transport(*trans, delay);

        if(trans->is_response_error()){
            SC_REPORT_ERROR("TLM 2.0", "Error from initiator");
        }

        cout << "trans = { " << (cmd ? 'W' : 'R') << ", " << hex << i
             << " }, data = " << hex << data << " @ time " << sc_time_stamp()
             << ", delay = " << delay << endl;
        wait(delay);
    }
}

void Memory::b_transport(tlm_generic_payload& trans, sc_time& delay)
{
    tlm_command     cmd = trans.get_command();
    uint64          adr = trans.get_address();
    unsigned char * ptr = trans.get_data_ptr();
    unsigned int    len = trans.get_data_length();
    unsigned char * ben = trans.get_byte_enable_ptr();
    unsigned int    wid = trans.get_streaming_width();

    if(adr >= uint64(size) || ben != 0 || len > 4 || wid < len){
        SC_REPORT_ERROR("TLM 2.0", "Data Error");
    }

    if(cmd == TLM_READ_COMMAND){
        memcpy(ptr, &mem[adr], len);
    } else if(cmd == TLM_WRITE_COMMAND){
        memcpy(&mem[adr], ptr, len);
    }

    trans.set_response_status(TLM_OK_RESPONSE);
}

void Memory::mem_init()
{
    for (int i = 0; i < size; i++)
    {
        mem[i] = 0xAA000000 | i;
    }
}
```
