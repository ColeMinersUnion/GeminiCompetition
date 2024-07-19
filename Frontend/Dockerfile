FROM node:18-alpine
WORKDIR /GeminiCompetition/Frontend
COPY package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]