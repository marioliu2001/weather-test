## 自动部署脚本 已经弃用 选中使用.github/workflows/AutoDeploy.yml
## /bin/bash
#
## 确保脚本抛出遇到的错误
#set -e
#
## 打包生成静态文件
#npm run build
#
## 进入待发布的 dist/ 目录
#cd ../dist
#
##
#git init
#git add .
#git commit -m 'deploy'
#
## 部署到 https://.github.io/
#git push -f https://github.com/marioliu2001/weather-test.git master:github-pages
#
## 提交所有代码到github
#cd ../
#git init
#git add .
#git commit -m 'update'
#git push -f https://github.com/marioliu2001/weather-test.git master
