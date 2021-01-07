export default class Cancel {
    message?:string
    constructor(msg:string) {
        this.message = msg;
    }
}
export function isCancel(val:any):boolean {
    return val instanceof Cancel;
}