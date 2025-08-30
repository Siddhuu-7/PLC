import fs from 'node:fs/promises'
import express from 'express'
import dotenv from 'dotenv'
import User from './Routes/user.route.js'
import cors from "cors"
import sequelize from './SQLdb.config.js'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import Test from "./Routes/test.route.js"
import Admin from "./Routes/admin.route.js"
dotenv.config();

mongoose.connect("mongodb://localhost:27017/PLC")
  .then(() => console.log("noSQL connected"))
  .catch(error => console.log(error.message));

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use("/api/users", User);
app.use("/api/questions", Test);
app.use("/api/admin",Admin)
try {
  sequelize.authenticate()
    .then(() => console.log("SQL authenticated"))
    .catch(error => console.log(error.message));
  // sequelize.sync({ alter: true });
} catch (error) {
  console.log("mysql:", error.message);
}

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// ✅ Serve React SSR only for non-API GET routes
app.get('*all', async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }

  try {
    const url = req.originalUrl.replace(base, '');

    let template;
    let render;

    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.error("SSR error:", e.stack);
    res.status(500).end("SSR failed");
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
