# 使用官方Node.js作为基础镜像
FROM node:20

# 设置工作目录
WORKDIR /usr/src/app

# 将package.json和package-lock.json复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 将项目源代码复制到工作目录
COPY . .

# 全局安装pm2
RUN npm install pm2 -g

# 设置环境变量，确保pm2可以正确启动
ENV PM2_HOME=/usr/src/app/.pm2
ENV PATH=$PATH:/usr/src/app/node_modules/.bin

# 创建pm2的配置文件，用于启动应用
RUN echo "module.exports = { apps: [{ script: 'index.js' }] };" > ecosystem.config.js

# 添加cron任务，每天上午11点执行pm2 restart
RUN echo "0 12 * * * pm2 restart all --env production" > /etc/cron.d/pm2-cron
RUN chmod 0644 /etc/cron.d/pm2-cron

# 应用cron任务
RUN crontab /etc/cron.d/pm2-cron

# 启动pm2进程和cron服务
CMD ["sh", "-c", "service cron start && pm2-docker start ecosystem.config.js"]
