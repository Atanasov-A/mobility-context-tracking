FROM node:17
WORKDIR /app
COPY . ./
RUN npm install

# Build for production.
RUN npm run build --production
# Install `serve` to run the application in prod.
RUN npm install -g serve

EXPOSE 3003

# Run application
# prod
# https://stackoverflow.com/questions/62188330/how-to-deploy-a-react-app-in-production-over-https
CMD serve -s build --ssl-cert ".cert/cert.pem" --ssl-key ".cert/key.pem"
# dev
#CMD ["npm", "run", "start-https"]