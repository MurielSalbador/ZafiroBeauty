import "reflect-metadata";
import { env } from "@Depilacion/env/server";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { auth } from "@Depilacion/auth";
import { toNodeHandler } from "better-auth/node";

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
	expressApp.use("/api/auth", toNodeHandler(auth));

	await app.listen(3000);
	console.log("Server is running on http://localhost:3000");
}

bootstrap();
