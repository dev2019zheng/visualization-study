FROM nginx:alpine

LABEL MAINTAINER="zhengyh<zhengyh@taiji.com.cn>"

RUN mkdir /app

COPY dist /app

COPY .nginx/nginx.conf /etc/nginx/nginx.conf