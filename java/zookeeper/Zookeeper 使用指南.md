# Zookeeper 使用指南

## Zookeeper  CreateMode

- PERSISTENT：创建后只要不删就永久存在
- EPHEMERAL：会话结束后结点自动被删除，EPHEMERAL结点不允许有子节点
- SEQUENTIAL：节点名末尾会自动追加一个10位数的单调递增的序号，同一个节点的所有子节点序号是单调递增的
- PERSISTENT_SEQUENTIAL：结合PERSISTENT和SEQUENTIAL
- EPHEMERAL_SEQUENTIAL：结合EPHEMERAL和SEQUENTIAL

## acl:权限列表

```java
//创建开放节点，允许任意操作
Ids.OPEN_ACL_UNSAFE
//创建只读节点
Ids.READ_ACL_UNSAFE
//创建者全部权限
Ids.CREATOR_ALL_ACL
```

## ZKClient 的使用

### 对Watcher的封装

ZKClient里面并没有类似的watcher、watch参数，这也就是说我们开发人员无需关心反复注册watcher的问题，zkclient给我们提供了一套监听方式，我们可以使用监听节点的方式进行操作，剔除了繁琐的反复watcher操作、简化了代码的复杂程度

```java
/**
* 侦听父节点下子节点的变化
*/
zkClient.subscribeChildChanges("", new IZkChildListener() {
            @Override
            public void handleChildChange(String s, List<String> list) throws Exception {

            }
});
/**
 * 侦听节点下数据的变化
*/
zkClient.subscribeDataChanges("", new IZkDataListener() {
            @Override
            public void handleDataChange(String s, Object o) throws Exception {

            }

            @Override
            public void handleDataDeleted(String s) throws Exception {

            }
});
/**
* 侦听Zookeeper状态的变化
*/
zkClient.subscribeStateChanges(new IZkStateListener() {
            @Override
     public void handleStateChanged(Watcher.Event.KeeperState keeperState) 
         throws Exception {

            }

            @Override
     public void handleNewSession() throws Exception {

            }

            @Override
      public void handleSessionEstablishmentError(Throwable throwable) throws Exception {

            }
});
```

### 对创建节点的封装

```java
/**
* 创建永久节点
* 第二个参数指定是否递归创建父节点
*/
zkClient.createPersistent("path",true);
/**
* 创建永久有序节点
* 
*/
zkClient.createPersistentSequential("",data);
/**
* 创建临时节点
*
*/
zkClient.createEphemeral("path");
/**
* 创建临时的有序节点
*/
zkClient.createEphemeralSequential("path",data);
```

### ZkClient Watcher 临时节点的例子

```java
String NODEPATH = "/com/alen/mp/node";
//连接到Zookeeper
ZkClient zkClient = new ZkClient("172.XX.XX.226:2181");
JSONObject json = new JSONObject();
json.put("token","0000000");
json.put("invdate","2019-09-01");
//创建父节点 第二个参数表示是否递归创建
zkClient.createPersistent(NODEPATH,true);
//在父节点下创建临时有序节点
//创建成功后会返回临时节点的路径（全路径 /com/alen/mp/node/n0000000002）
String path = zkClient.createEphemeralSequential(NODEPATH+"/n",json);
//这里在另外的线程中对新创建的临时节点进行侦听
new Thread(()->{
  zkClient.subscribeChildChanges(path, new IZkChildListener() {
      @Override
      public void handleChildChange(String s, List<String> list) throws Exception {
          System.out.println(StringFormatter.format("param s :{}\n list:{}",s,list));
         }
      });
 }).start();
```



