FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm install
COPY . .

# Provide dummy keys for build-time static analysis
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder

# RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
