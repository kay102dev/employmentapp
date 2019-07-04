# Employee Admin app

A simple CRUD application to maintain Employee information. 

This is an application to manage my companies employees as an office admin.



## Demo Link

Use following link [Employee App](http://www.greymeta-it.co.za/employeeapp/index.html).

## Prerequisite

Download and install [Node](https://nodejs.org/en/download/).


## Installation

Use the following commands in sequence in the application root folder to Install the needed dependencies.

```node
npm install
npm start
```

## Run BDD / E2E Testing (Cucumber JS)


```node
npm run e2e
```



## Run App in Local machine

npm start

```node
npm run e2e
```

## Dockerizing application

```node
docker image build -t employeeapp:v1 .
```

 Run docker image on port 3000
```node
docker run -p 3000:80 --rm employeeapp:v1
```

## Created Docker file script

```javascript
FROM node:11.6.0-alpine AS builder
WORKDIR /employeeApp
COPY . .
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /employeeApp/dist/employeeApp/ /usr/share/nginx/html
```
![Alt text](http://www.greymeta-it.co.za/employeeapp/screens/screen1.PNG  "Optional title")
![Alt text](http://www.greymeta-it.co.za/employeeapp/screens/screen2.PNG  "Optional title")
![Alt text](http://www.greymeta-it.co.za/employeeapp/screens/screen3.PNG  "Optional title")
![Alt text](http://www.greymeta-it.co.za/employeeapp/screens/screen4.PNG  "Optional title")
