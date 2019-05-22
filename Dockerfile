FROM node:11-alpine as build
WORKDIR /app
COPY . .
ARG build=build
ARG extra=true
RUN apk update \
  && apk add git \
  && yarn install \
  && $extra \
  && yarn $build

FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html