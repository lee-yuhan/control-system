FROM nginx:latest
RUN mkdir /dist
COPY ./dist /dist
COPY ./nginx.conf /

CMD envsubst < /nginx.conf > /etc/nginx/nginx.conf \
	&& cat /etc/nginx/nginx.conf \
	&& nginx -g 'daemon off;'
