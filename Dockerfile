FROM node:21-alpine AS builder

WORKDIR /app

RUN npm install -g @angular/cli@18.0.0

COPY package*.json .

RUN npm install

COPY . .

RUN ng build --configuration=production


FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/capitegory-frontend /usr/share/nginx/html

EXPOSE 4200

CMD nginx -g "daemon off;"