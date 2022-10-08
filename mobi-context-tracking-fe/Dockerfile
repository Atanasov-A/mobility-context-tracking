FROM node:17
WORKDIR /app
COPY . ./
RUN npm install
# Install `serve` to run the application in prod.
# RUN npm install -g serve

# Build for production.
#RUN npm run build 

# Run application
# prod
# https://stackoverflow.com/questions/62188330/how-to-deploy-a-react-app-in-production-over-https
#CMD serve -s build --ssl-cert ".cert/cert.pem" --ssl-key ".cert/key.pem"
# CMD ["serve", "-s", "build-https"]
# dev
CMD ["npm", "run", "start-https"]