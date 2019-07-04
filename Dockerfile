FROM node:11.6.0-alpine AS builder
WORKDIR /employeeApp
COPY . .
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /employeeApp/dist/employeeApp/ /usr/share/nginx/html
..
