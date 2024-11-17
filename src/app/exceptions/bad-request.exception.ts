export class BadRequestError extends Error 
{
    private readonly header: string = "Bad Request"
    constructor(message: string) 
    {
        super(message)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    public getHeader() : string
    {
        return this.header
    }
}