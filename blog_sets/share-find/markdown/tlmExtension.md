# TLM Extension
在标准的`tlm_generic_payload`中，只能够支持有限的数据域，且这些域的取值范围都已经被提前规定，因此如果需要使用我自己定义的额外的数据，且不影响`b_transport & nb_transport`的使用，TLM为我们提供了`tlm_extension`工具

## 创建自己的extension数据结构
```cpp
struct extension_name : tlm_extension<extension_name> {
    extension_name() {};
    virtual tlm_extension_base* clone() const {
        extension_name* ext = new extension_name;
        ext->data1 = data1;
        ext->data2 = data2;
        // ...
        return ext;
    }
    virtual void copy_from(tlm_extension_base const& ext) {
        data1 = static_cast<extension_name const&>(ext).data1;
        data2 = static_cast<extension_name const&>(ext).data2;
        // ...
    }
    
    data_type_1 data1;
    data_type_2 data2;
    // ...
};
```
`extension_name() {};`是固定写的

代码中的两个函数是对`tlm_extension`的两个纯虚函数的实现，第一个是创建一个此extension的拷贝，第二个是从另一个extension处copy得到此extension的数据

data1和data2是用户自定义的数据

## 创建含有extension的transaction
```cpp
tlm_generic_payload* trans = new tlm_generic_payload;
extension_name* ext = new extension_name;
ext->data1 = 1;
ext->data2 = 2;
trans->set_extension(ext);
// next send the transaction
```

## 接收transaction的extension
```cpp
extension_name* ext;
trans.get_extension(ext);
// then get the data from ext
```