# Stage 1: Build React application
FROM node:16-alpine as builder

# Установим рабочую директорию
WORKDIR /app

# Скопируем package.json и package-lock.json для установки зависимостей
COPY package.json ./

# Установим зависимости
RUN npm install --force

# Скопируем весь код приложения в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Stage 2: Serve React app with Nginx
FROM nginx:stable-alpine

# Удаляем стандартную конфигурацию Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Копируем наш билд в директорию Nginx для статических файлов
COPY --from=builder /app/build /usr/share/nginx/html

# Копируем собственную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Экспонируем порт 89
EXPOSE 89

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]