# learning_log

> 基于Django 开发的学习笔记（web页面）

## 使用Django

```bash
# 要使用Django 首先要建立一个虚拟环境
python3 -m venv ll_env
# 激活虚拟环境
source ll_env/bin/activate
# 停止虚拟环境
deactivate
# 安装Django
pip install Django
# 新建Django项目
django-admin startproject learning_log . # 末尾的句点让新项目使用合适的目录
# 创建数据库
python3 manage.py migrate
# 查看是否正确创建了项目
python3 manage.py runserver
# 创建应用程序 先进入虚拟环境
python3 manage.py startapp learning_logs
# 每当修改"学习笔记"管理的数据，需要执行三个步骤:修改models.py;对learning_logs调用makemigrations;让Django迁移项目
# 创建超级管理员
python3 manage.py createsuperuser
```

## 部署web应用程序

```bash
# 建立Heroku账户
https://heroku.com/
# 安装Heroku Toolbelt
# 安装必要的包
pip install dj-database-url
pip install dj-static
pip install static3
pip install gunicorn
# 创建包含包列表的文件 requirements.txt
pip freeze > requirements.txt
```