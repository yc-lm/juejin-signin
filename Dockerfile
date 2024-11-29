# 使用官方Node.js作为基础镜像
FROM node:20

# 设置工作目录
WORKDIR /usr/src/app

# 将package.json和package-lock.json复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install --register=https://registry.npmmirror.com/

# 将项目源代码复制到工作目录
COPY . .

# 全局安装
RUN npm install pm2 -g

# 安装tzdata包
RUN apt-get update && apt-get install -y tzdata vim

# 设置时区为Asia/Shanghai
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

# 清理缓存
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# 使用PM2启动应用程序
CMD ["pm2-runtime", "start", "ecosystem.config.js"]

# docker build -t juejin-img .
# docker run -itd --name juejin-signin -v E:/docker-map/juejin-signin/config:/usr/src/app/config  juejin-img
