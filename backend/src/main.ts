import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',')
        : ['http://localhost:3001'];

    app.enableCors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    });

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(process.env.PORT ?? 3000);
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
}
bootstrap();