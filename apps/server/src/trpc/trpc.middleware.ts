import { Injectable, type NestMiddleware } from "@nestjs/common";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { createContext } from "@Depilacion/api/context";
import { appRouter } from "@Depilacion/api/routers/index";
import type { Request, Response, NextFunction } from "express";

@Injectable()
export class TrpcMiddleware implements NestMiddleware {
	private trpcMiddleware = createExpressMiddleware({
		router: appRouter,
		createContext,
	});

	use(req: Request, res: Response, next: NextFunction) {
		this.trpcMiddleware(req, res, next);
	}
}
