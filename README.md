# Gemini Clone

A frontend clone of Google Gemini's chat interface, built with React and powered by the actual Google Generative AI API — so it's not just a UI mockup, it returns real model responses.

**🔗 Live demo:** [gemini-clone-seven-rust.vercel.app](https://gemini-clone-seven-rust.vercel.app/)

## Features
- Chat-style interface modeled on Gemini's UI
- Live responses via the `@google/generative-ai` SDK
- Built with React 19 + Vite for fast dev/build

## Tech Stack
React 19 · Vite · Google Generative AI SDK · ESLint

## Getting Started
```bash
git clone https://github.com/uryapraveen/Gemini-Clone.git
cd Gemini-Clone
npm install
```
Create a `.env` file with your Gemini API key:
```
VITE_GEMINI_API_KEY=your_api_key_here
```
Then run:
```bash
npm run dev
```

## Status
Personal project built to practice integrating a real LLM API into a React frontend.
