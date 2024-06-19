2024年6月17日 11点14分

## 原始年代：服务器部署

> 这种部署好就好在快速、敏捷，只需要把所有东西都上传上去（vps主机），然后删删文件、改改图片链接，最后找个掘金小册把html dom套壳进去，就结束了。

套壳工艺重新说明一遍，之前的找不到了

1. 资源上传。把html和资源文件夹上传上去。
2. 防盗链洗白。搜索.js文件，全部删除。（因为没有改html里面的引入之流所以记得刷缓存）

此时已经可以在page.jituc.cn 预览。但要关闭侧边栏，需要套壳掘金。

1. 图片回源。`<img src=` 这种格式后面的链接，由之前的相对链接换到挂载的本站（例：`<img src="./ `-> `<img src="https://page.jituc.cn/juejin/Node + React 实战：从 0 到 1 实现记账本/`）
2. 套壳掘金。随便在掘金小册找一章免费的，把html的正文部分，全部复制粘贴进来。
3. 开发者工具删顶栏
4. 链接上线

```
<img src="./

<img src="https://page.jituc.cn/juejin/Node + React 实战：从 0 到 1 实现记账本/


<div class="markdown-body">
```

## 2.0年代：github七牛云集成

> 这一部署问题在于极为麻烦，只换取了一些自动化。单就资源来说，需要用到：七牛云cos、github workflows……

### 工具准备：

七牛云cos空间

github一个公开仓库，可以使用action

### workflows编写：

类似上面替换链接的原理，编写workflows工作流

1. 格式分析

原始格式：

```html
<p><img src="./1. 开篇-技术选型和项目结构_files/354dda56771d480490654ec971b11645_tplv-k3u1fbpfcp-zoom-in-crop-mark_3024_0_0_0.awebp" alt="image.png" loading="lazy" class="medium-zoom-image"></p>
```

目标格式：

（以七牛云cdn为例）【不推荐，需要将cdn设置为公开访问，可能产生不必要的流量盗刷费用】

```html
因为不推荐所以不写了
```

（以github page的repo 存储为例）

```html
好像不用改，先放着吧
```

2. 添加repo secrets

（回头补充）

3. 最终结果（仅供参考）：

```yml
name: Process HTML and Deploy

on:
  push:
    branches:
      - main  # 触发工作流的分支

jobs:
  process_files:
    runs-on: ubuntu-latest  # 指定运行环境

    steps:
    - name: Checkout code
      uses: actions/checkout@v2  # 检出代码

    - name: Remove JavaScript files
      run: find . -type f -name '*.js' -delete  # 删除所有.js文件

    # - name: Replace text in HTML files
    #   run: |
    #     find . -maxdepth 1 -type f -name '*.html' -exec sed -i 's|<img src="./|<img src="https://page.jituc.cn/juejin/Node + React 实战：从 0 到 1 实现记账本/|g' {} +
      # 在一级目录下的HTML文件中替换指定文本

    - name: Create and push to a new branch
      run: |
        git config --global user.name 'bairihai-auto'
        git config --global user.email '237876867@qq.com'
        git checkout -b deploy-branch-$(date +%Y-%m-%d)  # 创建以日期命名的新分支
        git add .
        git commit -m "Automated changes by GitHub Actions"
        git push https://${{ secrets.GH_BRH_REPO_TOKEN }}@github.com/bairihai/Juejin-visResumeMook.git HEAD  # 推送到新分支
      # 提交更改并推送到新的分支

    # - name: Deploy to Server
    #   uses: appleboy/scp-action@master
    #   with:
    #     host: ${{ secrets.HOST }}
    #     username: ${{ secrets.USERNAME }}
    #     key: ${{ secrets.SSH_KEY }}
    #     port: ${{ secrets.PORT }}
    #     source: "."
    #     target: "/path/on/server"
    # 使用 SCP 将文件部署到服务器
```

### 部署上云：

提交&同步。

==**特别注意**==：务必赋予读写权限。任何涉及到自己修改自己的操作都可能需要这个权限。这与密码是否正确根本无关，可以自己读一下报错。

```md
### Workflow permissions工作流程权限

Choose the default permissions granted to the GITHUB_TOKEN when running workflows in this repository. You can specify more granular permissions in the workflow using YAML. [Learn more about managing permissions.](https://docs.github.com/actions/reference/authentication-in-a-workflow#modifying-the-permissions-for-the-github_token)
选择授予 GITHUB_TOKEN 的默认权限 在此存储库中运行工作流程时。 您可以使用 YAML 在工作流程中指定更细化的权限。 [了解有关管理权限的更多信息。](https://docs.github.com/actions/reference/authentication-in-a-workflow#modifying-the-permissions-for-the-github_token)

Read and write permissions 读写权限Workflows have read and write permissions in the repository for all scopes.
工作流在所有范围的存储库中具有读取和写入权限。

Read repository contents and packages permissions 读取存储库内容和包权限Workflows have read permissions in the repository for the contents and packages scopes only.
工作流程在存储库中仅具有内容和包范围的读取权限。

Choose whether GitHub Actions can create pull requests or submit approving pull request reviews.
选择 GitHub Actions 是否可以创建拉取请求或提交批准拉取请求审查。

Allow GitHub Actions to create and approve pull requests
允许 GitHub Actions 创建和批准拉取请求
```

### 验收，配置github pages

以cloudflare为例，配置cname解析，一段时间后github page设置自己的域名，然后就可以直接根目录访问了。

默认的页面是index.js。不再需要用 xxx.io/xxx/ 这样的格式。

## 3.0年代：私域集成CI/CD

### github repo重命名

仓库rename之后你还有充足的时间慢慢修改原本的链接引入。

gtihub会保存原本的链接，重定向到新的仓库。

你有很长很长一段时间，留意的时候慢慢改就行了。

### 对action进行迭代以增强其兼容性。

```bash
- name: Generate index.html
  run: |
    declare -A files
    while IFS= read -r -d '' file; do
      dir=$(dirname "$file")
      files["$dir"]+="$file "
    done < <(find . -name '*.html' -print0)

    echo "<html><body>" > index.html
    for dir in "${!files[@]}"; do
      echo "<h2>${dir#./}</h2><ul>" >> index.html
      for file in ${files[$dir]}; do
        echo "<li><a href='https://bairihai.github.io/Juejin-visResumeMook/${file#./}'>${file#./}</a></li>" >> index.html
      done
      echo "</ul>" >> index.html
    done
    echo "</body></html>" >> index.html
# 生成一个索引文件，列出所有HTML文件的链接，并按目录分类bash
```

这段代码首先创建一个关联数组 `files`，然后使用 `find`命令查找所有的HTML文件。对于每个文件，它获取文件的目录名，并将文件添加到该目录的数组元素中。然后，它遍历所有的目录，并为每个目录生成一个标题和一个包含该目录中所有文件链接的列表。`${dir#./}`和 `${file#./}`是bash参数扩展，它们从变量的值中删除开头的 `./`，以生成正确的链接。

这样一来，原本一个仓库只能放一个小册——现在，一个仓库可以放无数小册。


当然了，可能还需要调教一下。

>
> 对不起，我明白了。问题出在这一行代码上：
>
> **for** **file** **in** $**{**files**[**$dir**]**}**; **do
>
> 这行代码会将 `${files[$dir]}`中的每个空格分隔的字符串视为一个单独的文件。这就是为什么文件名中的每个单词都被视为一个单独的文件的原因。
>
> 我们可以通过将这行代码更改为使用数组迭代来解决这个问题。首先，我们需要在添加文件名到数组时使用数组语法，然后在迭代文件名时使用数组语法。以下是修改后的代码：
>
> **- **name**: **Generate index.html
>
> **  **run**: **|
>
> **    declare -A files**
>
> **    while IFS= read -r -d '' file; do**
>
> **      dir=$(dirname "$file")**
>
> **      files["$dir"]+="$file "**
>
> **    done < <(find . -name '*.html' -print0)**
>
> **    echo "`<html><body>`" > index.html**
>
> **    for dir in "${!files[@]}"; do**
>
> **      echo "`<h2>`${dir#./}`</h2><ul>`" >> index.html**
>
> **      IFS=' ' read -r -a filenames <<< "${files[$d**ir]}"
>
> **      for file in "${filenames[@]}"; do**
>
> **        echo "`<li><a href='https://bairihai.github**.io/Juejin-book-mirror/${file#./}'>`${file#./}`</a>`<**/li>" >> index.html**
>
> **      done**
>
> **      echo "`</ul>`" >> index.html**
>
> **    done**
>
> **    echo "`</body></html>`" >> index.html**
>
> **# 生成一个索引文件，列出所有HTML文件的链接，并按目录分类**
>
> 这段代码现在应该能正确处理包含空格的文件名了。

```bash
- name: Generate index.html
  run: |
    declare -A files
    while IFS= read -r -d '' file; do
      dir=$(dirname "$file")
      files["$dir"]+="$file "
    done < <(find . -name '*.html' -print0)

    echo "<html><body>" > index.html
    for dir in "${!files[@]}"; do
      echo "<h2>${dir#./}</h2><ul>" >> index.html
      IFS=' ' read -r -a filenames <<< "${files[$dir]}"
      for file in "${filenames[@]}"; do
        echo "<li><a href='https://bairihai.github.io/Juejin-book-mirror/${file#./}'>${file#./}</a></li>" >> index.html
      done
      echo "</ul>" >> index.html
    done
    echo "</body></html>" >> index.html
# 生成一个索引文件，列出所有HTML文件的链接，并按目录分类
```




### 用action自动化部署page
