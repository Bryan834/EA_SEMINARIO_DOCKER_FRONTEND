FROM node:20-alpine AS build

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm ci --silent || (echo "⚠️ npm ci ha fallado, usando npm install..." && npm install --silent)

COPY . .

RUN npm run build -- --configuration production

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/front-end-angular/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]