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
  settings: {
    port: 3000,
    ip: "0.0.0.0",
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
        onBeforeCall(ctx: Context, route: RouteSettings, req: IncomingMessage, res: ServerResponse) {
          Logger.info(`[API] Incoming request: ${req.method} ${req.url}`);
        },
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
    cors: {
      origin: "*",
      methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"]
    },
    logging: true
  },
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
