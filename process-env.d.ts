export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined;
            DB_HOST: string;
            DB_PORT: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
        }
    }
}