FROM node:17
WORKDIR /app
COPY . ./
RUN npm install
EXPOSE 3003
CMD ["npm", "run", "start-https"]