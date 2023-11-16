# TLM非阻塞事务
写这个是因为工作里面的性能模型因为使用了阻塞传输的方式导致性能减少很多，虽然不确定非阻塞能不能显著改善，但是一定可以解决部分问题，TLM事务非阻塞传输比阻塞传输复杂一些，且实现方法多样。代码显著变长，所以我不会在这个article里面放太多代码。

基本的结构还是没有变化，还是一个top里面有一个initiator和target，但是传输方式有两种实现

## Using backward path
initiator transport forward begin request
                                            target write request fifo
initiator wait signal
                                            target transport backward end request
part of initiator send signal
initiator stop wait
                                            target handle transection
                                            target transport backward begin response
initiator write response to fifo
initiator transport forward end response

所以这种情况下，initiator就有三个主要函数
* `initiator_thread`
> 负责发送transection
* `nb_transport_backward`
> 注册为`nb_transport_bw`
> 在end request阶段用来提醒`initiator thread`发送下一个transection
> 在begin response阶段用来将response transection 加入对列
* `response_handler`
> 负责处理从target发来的response

```cpp
SC_MODULE(Initiator){
    sc_event target_end_request;
    simple_initiator_socket<Initiator> socket;
    peq_with_get<tlm_generic_payload> peq;

    void initiator_thread(void);
    void send_end_response_thread(void);
    tlm_sync_enum nb_transport_bw(tlm_generic_payload & trans, tlm_phase & phase, sc_time & delay);

    SC_CTOR(Initiator) : socket("socket"), peq("peq"){
        socket.register_nb_transport_bw(this, &Initiator::nb_transport_bw);
        SC_THREAD(initiator_thread);
        SC_THREAD(send_end_response_thread);
        sensitive << peq.get_event();
    }
};
```

target也有三个主要函数
* `nb_transport_forward`
> 注册为`nb_transport_fw`<br>
> 在begin request阶段用来将request transection加入队列<br>
> 在end response阶段返回`TLM_COMPLETED`
* `request_handler`(`target_thread`)
> 负责处理transection并将完成的transection加入response队列
* `response_thread`
> 负责发送response transection

```cpp
SC_MODULE(Target){
    simple_target_socket<Target> socket;
    sc_fifo<tlm_generic_payload *> request_fifo;
    sc_fifo<tlm_generic_payload *> response_fifo;

    void target_thread(void);
    void begin_response_thread(void);
    tlm_sync_enum nb_transport_fw(tlm_generic_payload & trans, tlm_phase & phase, sc_time & delay);

    SC_CTOR(Target) : socket("socket"), request_fifo("request", 2), response_fifo("response", 2){
        socket.register_nb_transport_fw(this, &Target::nb_transport_fw);
        SC_THREAD(target_thread);
        SC_THREAD(begin_response_thread);
    }
};  
```

## Using return path
initiator transport forward begin request           target write request fifo
return and end request                              target return end request
                                                    
                                                    target handle transection
                                                    target transport backward begin response
initiator handle transection
initiator return end request                        target receive end request

这种情况下，initiator有两个主要函数，就是前一部分去掉`response_handler`

target也有两个主要函数，`request_handler`和`response_handler`合为一个