# SystemC
真正意义上的开始研究怎么自己写一个SystemC的程序然后让他跑起来

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
