export const appConfig = () => ({
    auth: {
        jwtsecretkey: process.env.JWT_SECRET as string
    }
})