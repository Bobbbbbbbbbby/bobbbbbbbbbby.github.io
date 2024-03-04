# SystemC
真正意义上的开始研究怎么自己写一个SystemC的程序然后让他跑起来
## 编译SystemC
首先当然是跟着官方给的文件里面按照他的方法搞一遍，但是发现了一个问题

在进行configure的时候会出现报错：
```sh
config.status: error: cannot find input file: `src/Makefile.in'
```

我并不知道是什么问题，但是找到了正确的解决方案：
* `sudo apt install automake`
* 在SystemC根目录下，`aclocal`
* `automake --add-missing`
* 再到configure的文件夹下，重新configure就可以成功了

## Hello World
```cpp
#include <systemc>
#include <iostream>
using namespace sc_core;

SC_MODULE(Hello)
{
    void hello()
    {
        std::cout << "Hello World" << std::endl;
    }

    SC_CTOR(Hello)
    {
        SC_METHOD(hello);
    }
};

int sc_main(int argc, char* argv[])
{
    Hello instance("name");
    sc_start();
    return 0;
}
```
### 碰到的问题
在编译的时候需要指定g++的include path，为了做到这一点，可以在.bashrc中加入：`export CPLUS_INCLUDE_PATH=/usr/share/systemc/include:$CPLUS_INCLUDE_PATH`

在编译的时候还要加上`-L /usr/share/systemc/lib`，用来给出库文件的声明的位置

在编译的时候还要加上`-lsystemc`，用来告诉链接器链接systemc库

在运行的时候需要指定库文件的位置，因为是动态链接库，要在运行的时候链接。如果不指定位置并不知道库文件在什么位置，为了做到这一点，在.bashrc中加入`export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/share/systemc/lib`

最后编译的命令就是`g++ -L /usr/share/systemc/lib -lsystemc hello.cpp -o name`

### 学习的内容
#### SC_CTOR和SC_HAS_PROCESS

`SC_CTOR`用来声明并定义`SC_MODULE`的构造函数，`SC_CTOR`只能有一个参数，只能在`SC_MODULE`代码块内出现

`SC_HAS_PROCESS`会声明一个`SC_MODULE`的构造函数，这个构造函数可以在别处定义，且可以有多个参数，代码示例如下：
```cpp
SC_MODULE(example)
{
    SC_HAS_PROCESS(function);

    void function(int a, int b)
    {
        int c = a + b;
        std::cout << a + b;
    }
}
```

#### Simulation Process
Simulation Process是一个`SC_MODULE`的成员函数，参数和返回都是`void`，这个函数会被注册到kernel中，主要分为三种
* `SC_METHOD`
* `SC_THREAD`
* `SC_CTHREAD`

在`SC_MODULE`的构造函数中进行注册，其中`SC_THREAD`用到最多

别人写的内容中的注意事项：
* 为了使一个`SC_THREAD`或者`SC_CTHREAD`过程被再次调用，需要使用一个`while`循环以确保其已经释放
* 一个`SC_THREAD`过程不要求使用`while`循环，可由`next_trigger()`再次调用
* SystemC中的仿真时间并不是真实时间，而是仿真内核的一个计数器

示例代码：
```cpp
#include<systemc>
#include<iostream>
using namespace std;
using namespace sc_core;

SC_MODULE(Process)
{
    sc_clock clk;
    void _method(void)
    {
        cout << "method triggered @ " << sc_time_stamp() << endl;
        next_trigger(sc_time(1, SC_SEC));
    }

    void _thread(void)
    {
        while(true)
        {
            cout << "thread triggered @ " << sc_time_stamp() << endl;
            wait(1, SC_SEC);
        }
    }

    void _cthread(void)
    {
        while(true)
        {
            cout << "cthread triggered @ " << sc_time_stamp() << endl;
            wait();
        }
    }

    SC_CTOR(Process) : clk("clk", 1, SC_SEC){
        SC_METHOD(_method);
        SC_THREAD(_thread);
        SC_CTHREAD(_cthread, clk);
    }
}
;

int sc_main(int argc, char* argv[])
{
    Process instance("instance");
    cout << "begin @ " << sc_time_stamp() << endl;
    sc_start(4, SC_SEC);
    cout << "end @ " << sc_time_stamp() << endl;
    return 0;
}
```

#### Simulation Stage
简而言之就是`sc_core`有四个虚的函数：
* `virtual void before_end_of_elaboration()`
* `virtual void end_of_elaboration()`
* `virtual void start_of_simulation()`
* `virtual void end_of_simulation()`

这四个函数将在对应的阶段节点被调用，可以用来输出或者处理内容，要利用这几个函数只需要在某个`SC_MODULE`里面将这些函数实现即可

特别注意的是`end_of_simulation()`的效果只有在用户主动调用`sc_stop()`的时候才会体现出来

