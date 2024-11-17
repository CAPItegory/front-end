export class ServerError extends Error 
{
    private readonly header: string = "Internal Server Error"
    constructor(message: string) 
    {
        super(message)
        Object.setPrototypeOf(this, ServerError.prototype)
    }

    public getHeader() : string
    {
        return this.header
    }
}