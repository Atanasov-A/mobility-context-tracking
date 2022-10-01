FROM node:17
WORKDIR /app
COPY . ./
RUN npm install
ENV PORT="3090"
EXPOSE 3091
CMD [ "npm", "run", "dev" ]