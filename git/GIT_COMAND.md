# git命名集合

## 基本命名

### 1、从远程仓库下载代码

git clone uri

示例

```shell
git clone https://bitbucket.org/openesb/openesb-components-3.git
```

### 2、将文件添加到git管理

git add 目录名

示例

```shell
#添加当前文件夹下所有文件
git add . 
#添加/code 下所有修改的文件
git add -u /code
#提交到本地库
git commit -m "这里写注释"
```

### 3、切换和新建分支/标签

git checkout -b 新分支名

```shell
#创建并切换到分支dev
git checkout -b dev
#新建dev分支
git branch dev
#查看所有分支
git branch
#标签的操作和分支类似只是需要把关键字换成 tag
#切换标签 切换标签后可以查看此标签下的代码但是会提示
#You are in 'detached HEAD' state. 说明这个是不可以修改的
#如果想修改可以创建一个分支
git checkout tag_name
#新建tag-1标签
git tag tag-1
#查看所有标签
git tag
#基于tag创建分支
git checkout -b branch_name tag_name
```

### 4、管理远程仓库地址

查看远程仓库地址

git remote -v

```shell
$ git remote -v
origin  https://github.com/AlenZhai/Learning.git (fetch)
origin  https://github.com/AlenZhai/Learning.git (push)

```

添加远程仓库地址

```shell
#添加名字为rep的远程仓库（origin仓库为必须，除了这个还可以添加其它的仓库）
git remote add rep https://github.com/AlenZhai/Learning.git
```



修改远程仓库地址

git remote set-url origin URL

```shell
#origin 为源名，可以创建其它的源名
git remote set-url origin https://github.com/AlenZhai/Learning.git
```

### 5、文件管理

从远程仓库获取文件

git fetch [仓库名]  [分支名]

```shell
#从origin仓库获取master分支的文件
git fetch origin master
#从远程仓库获取文件并合并
git pull origin master
#把远程仓库和本地同步，消除差异
git pull origin master --allow-unrelated-histories 
```

推送文件到远程仓库

git push [仓库名] [分支名]

```shell
#将文件推送到 origin仓库的master分支
git push origin master
```

删除远程分支

git push 仓库名 :分支名

```shell
 #删除远程仓库中的dev分支
 git push origin :dev
```

分支合并

git merge 分支名

```shell
#将指定分支合并到当前分支
#切换到主分支
#将dev分支合并到主分支
git checkout master
git merge dev
```

