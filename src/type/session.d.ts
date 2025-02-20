import 'express-session';

declare module 'express-session' {
    interface SessionData {
        data: {
            id: string;
            username: string;
        };
    }
}
