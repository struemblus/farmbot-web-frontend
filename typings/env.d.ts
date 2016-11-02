interface Env {
    env: {
        NODE_ENV: string;
        REVISION: string;
    };
}

declare var process: Env;