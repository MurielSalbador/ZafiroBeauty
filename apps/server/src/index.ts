import "reflect-metadata";
import { env } from "@Depilacion/env/server";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { auth } from "@Depilacion/auth";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors({
		origin: true,
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "better-auth-agent"],
		credentials: true,
	});

	const expressApp = app.getHttpAdapter().getInstance();
	
	// Better Auth handler
	expressApp.use("/api/auth", async (req: any, res: any) => {
		try {
			const result = await auth.handler(req);
			
			// Copy status
			res.status(result.status);
			
			// Copy headers from Better Auth
			result.headers.forEach((value, key) => {
				res.setHeader(key, value);
			});

			if (result.body) {
				const reader = result.body.getReader();
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					res.write(value);
				}
			}
			res.end();
		} catch (error) {
			console.error("Better Auth Error:", error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	});

	await app.listen(3000);
	console.log("Server is running on http://localhost:3000");
}

bootstrap();
