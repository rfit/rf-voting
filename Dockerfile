FROM node:6

WORKDIR /srv

COPY ["package.json", "/srv/"]
RUN ["npm", "i"]

COPY [".", "/srv/"]
RUN ["npm", "run", "build"]
CMD ["npm", "start"]

EXPOSE 3000
