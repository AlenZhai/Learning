# Oracle 物化视图

## 物化视图的创建

```sql
CREATE MATERIALIZED VIEW  viewname
-- viewname 为物化视图名 
NOCACHE -- 不开启缓存
USING INDEX --使用索引
REFRESH ON DEMAND -- 在需要时刷新(可选项 ON COMMIT在提交时刷新)
FORCE --刷新方式（默认为 FORCE）
USING DEFAULT ROLLBACK SEGMENT --使用默认的回滚段
DISABLE QUERY REWRITE --关闭查询重写
AS
SELECT * FROM tablename ; --tablename 为表名可以是复杂的联合查询
--创建表的日志
CREATE MATERIALIZED VIEW LOG ON <TAB_NAME(这里是表的名字)> WITH PRIMARY KEY;
--快速刷新的物化视图
CREATE MATERIALIZED VIEW  viewname
 ---- viewname 为物化视图名 
BUILD IMMEDIATE----创建时生成数据 (BUILD DEFERRED 创建时不生成数据，以后根据需要在生成数据)
REFRESH FAST ----刷新方式 
ON COMMIT ----在基表有更新时提交，这里该句对视图无效
WITH PRIMARY KEY ----这里创建基于PRIMARY KEY 的物化视图，要与日志中对应的是 PRIMARY KEY ；若日志为 rowid 则此处必须为rowid
 As 
 Select * from F_RPT_TASK  where RPT_PERIOD in (2012,2011) ----生成物化视图数据语句 
```

## 参数及选项说明

| 名称              |                             描述                             |                             取值                             |      默认值      |
| :---------------- | :----------------------------------------------------------: | :----------------------------------------------------------: | :--------------: |
| ON PREBUILD TABLE | 将已经存在的表注册为实体化视图。同时还必须提供描述创建该表的查询的 SELECT 子句。可能无法始终保证查询的精度与表的精度匹配。为了克服此问题，应该在规范中包含 WITH REDUCED PRECISION 子句。 |                                                              |                  |
| Build Clause      |                           创建方式                           | BUILD IMMEDIATE(立即充填数据)，BUILD DEFERRED(需要时充填数据) | BUILD IMMEDIATE  |
| Refresh           | 刷新方式，当基表发生了DML操作后，实体化视图何时采用哪种方式和基表进行同步 | [refresh [fast \| complete \| force]          [on demand \| commit]          [start with date]          [next date]          [with {primary key \| rowid}] ] | FORCE  ON DEMAND |



## ORA-23413问题

执行以下语句创建日志

CREATE MATERIALIZED VIEW LOG ON <TAB_NAME(这里是报错表的名字)> WITH ROWID;