FROM node:6.9
MAINTAINER taojy(taojy123@163.com)

RUN mkdir /workspace
WORKDIR /workspace

COPY . /workspace/

RUN npm config set registry http://nexus.daocloud.io/repository/daocloud-npm
RUN npm install

ENV NODE_ENV production

RUN npm run build

CMD bash -c "rm -rf /var/www/html/jinns_frontend; cp -r ./dist /var/www/html/jinns_frontend; touch f; tail -f f"


