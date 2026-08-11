# YourSetoGo v1

Premium React/Vite website for YourSetoGo.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository into Vercel.
3. Framework: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Add environment variables from `.env.example` if you want the contact form to send emails through Resend.

### Contact form

The frontend calls `/api/contact`. On Vercel, configure:

- `RESEND_API_KEY`
- `CONTACT_TO`
- `CONTACT_FROM` (optional)

If the API is not configured, the form falls back to the visitor's mail app using the temporary public email configured in `src/main.jsx`.

## Before launch

Replace:

- `yoursetogo@gmail.com`
- placeholder LinkedIn/Instagram `#` links
- concept portfolio work with genuine work as it becomes available
- pricing if your actual delivery economics require different numbers
