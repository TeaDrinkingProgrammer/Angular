FROM node:16
RUN mkdir -p /usr/src/app/
RUN chown -R node:node /usr/src/app/
WORKDIR /usr/src/app
COPY ./package*.json ./

# angular
RUN npm install -g @angular/cli@8.1.2
# http-server
RUN npm install -g http-server
# firebase
RUN npm install firebase
RUN npm install -g firebase-tools

RUN npm install
#protractor
RUN node_modules/protractor/bin/webdriver-manager update

# chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable
USER node