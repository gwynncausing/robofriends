# #STEP 1
# FROM node:14-alpine3.13 as build
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm install -g @vue/cli
# RUN npm run build

# # STEP 2
# FROM nginx:1.19
# COPY ./nginx/nginx.conf etc/nginx/nginx.conf
# COPY --from=build /app/dist /usr/share/nginx/html

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "run", "serve"]
