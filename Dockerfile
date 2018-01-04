FROM node:6.9
MAINTAINER taojy

RUN mkdir /workspace
WORKDIR /workspace

COPY . /workspace/

RUN npm config set registry http://nexus.daocloud.io/repository/daocloud-npm
RUN npm install

ENV NODE_ENV production

RUN npm run build

CMD npm run start


