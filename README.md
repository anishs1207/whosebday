# 🎂 Whosebday

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square&logo=clerk)](https://clerk.dev/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-6772E5?style=flat-square&logo=stripe)](https://stripe.com/)
[![Redis](https://img.shields.io/badge/Cache-Redis-DC382D?style=flat-square&logo=redis)](https://redis.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Whosebday** is a premium, full-stack web application designed to help you never forget a special occasion again. Track birthdays, anniversaries, and other important events with ease.

🚀 **Check out the live demo:** [whosebday-prod.vercel.app](https://whosebday-prod.vercel.app/)

---

## ✨ Features

- **Event Tracking**: Effortlessly manage birthdays, anniversaries, and custom occasions.
- **Smart Dashboard**: A unified view of upcoming events and recent updates.
- **Fast Search**: Quickly find any event with optimized search indexing.
- **Redis Caching**: Ultra-fast performance with a robust caching layer.
- **Secure Auth**: Powered by Clerk for a seamless and secure login experience.
- **Payments**: Integrated with Stripe and Razorpay for premium features.
- **Real-time Monitoring**: Built-in Prometheus metrics and Grafana dashboard support.
- **Responsive Design**: Beautiful UI inspired by modern design trends, optimized for all devices.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Caching**: [Redis](https://redis.io/)
- **Payments**: [Stripe](https://stripe.com/) & [Razorpay](https://razorpay.com/)
- **Monitoring**: [Prometheus](https://prometheus.io/) & [Grafana](https://grafana.com/)
- **Infrastucture**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker & Docker Compose
- A Clerk account
- A Stripe/Razorpay account (for payments)

### Local Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/anishs1207/whosebday.git
   cd whosebday
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Copy `.env.sample` to `.env` and fill in your credentials:
   ```bash
   cp .env.sample .env
   ```

4. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Development Server**:
   ```bash
   npm run dev
   ```

---

## 🐳 Docker Setup

Run the entire stack (App + Redis + Prometheus) using Docker:

```bash
docker-compose up --build
```

- **App**: `http://localhost:3000`
- **Prometheus**: `http://localhost:9090`
- **Metrics Endpoint**: `http://localhost:3000/api/metrics`

---

## 📊 Monitoring

Whosebday exposes custom Prometheus metrics for deep visibility:

- **HTTP Metrics**: Request counts, latencies, and status codes.
- **DB Metrics**: Query durations and connection status.
- **Cache Metrics**: Hit/miss ratios for Redis.
- **Business Metrics**: Total birthdays tracked, emails sent, stripe webhooks.

For setup instructions and recommended Grafana panels, see [notes/GRAFAN.md](notes/GRAFAN.md).

---

## 🤝 Contributing

Contributions are welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Anish](https://github.com/anishs1207)
