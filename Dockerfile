FROM node:20-bookworm

RUN npx -y playwright@1.40.1 install --with-deps

RUN mkdir pw-tests

WORKDIR /pw-tests

COPY . /pw-tests

RUN npm ci

CMD ["npm", "run", "test:hw23"]