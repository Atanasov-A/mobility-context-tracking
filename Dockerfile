FROM node:17
WORKDIR /app
COPY . ./

WORKDIR mobi-context-tracking-fe
RUN npm run build 

WORKDIR /app
WORKDIR mobi-context-tracking-be
RUN npm install 

ENV PORT="3090"
EXPOSE 5000
CMD npm start
#CMD npm run dev
