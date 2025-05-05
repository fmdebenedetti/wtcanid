import ApiGateway = require("moleculer-web");
import { ServiceSchema, Context } from "moleculer";
import { IncomingMessage, ServerResponse } from 'http';

import Logger from '../helpers/logger';

interface RouteSettings {
  path: string;
  bodyParsing?: boolean;
  mappingPolicy?: string;
  aliases?: Record<string, string>;
}

const apiService: ServiceSchema = {
  name: "api",
  mixins: [ApiGateway],

  /** More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html */
  settings: {
    // Exposed port
    port: 3000,

    // Exposed IP
    ip: "0.0.0.0",

    // Global Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
    use: [],

    routes: [
      {
        path: "/auth",
        bodyParsing: true,
        mappingPolicy: "restrict",
        aliases: {
          "POST /login": "auth.login",
          "POST /validate2fa": "auth.validate2FA"
        },
        // Middleware de logging
        onBeforeCall(ctx: Context, route: RouteSettings, req: IncomingMessage, res: ServerResponse) {
          Logger.info(`[API] Incoming request: ${req.method} ${req.url}`);
        },
        // Middleware de manejo de errores
        onError(req: IncomingMessage, res: ServerResponse, err: Error & { code?: number }) {
          Logger.error(`[API] Error en ruta: ${err.message}`);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = err.code || 500;
          res.end(JSON.stringify({
            error: true,
            message: err.message
          }));
        }
      }
    ],

    // Configuraciones globales
    cors: {
      origin: "*",
      methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"]
    },

    // Logging
    logging: true
  },

  // Hooks del servicio
  created() {
    Logger.info("[API Gateway] Servicio creado");
  },

  started() {
    Logger.info(`[API Gateway] Servicio iniciado en puerto ${this.settings.port}`);
  },

  stopped() {
    Logger.info("[API Gateway] Servicio detenido");
  }
};

module.exports = apiService;
