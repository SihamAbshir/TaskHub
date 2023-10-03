export const config = () => ({
    PORT: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_SECRET_EXPIRY,
    
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

});