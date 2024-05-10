# Используем в качестве базового образа Nginx
FROM nginx:alpine

# Копируем статические файлы в директорию Nginx
COPY . /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
