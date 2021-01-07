
import {CancelExecutor,Canceler,CancelToken as ICancelToken} from '../types';
import { CancelTokenSource } from '../types/index';
import Cancel from './Cancel';
interface ResolvePromise {
    (val:Cancel):void
}
export default class CancelToken {
    promise:Promise<Cancel>
    result?:Cancel
    constructor(excutor:CancelExecutor) {
        let resolvePromise:ResolvePromise;
        this.promise = new Promise(resolve=>{
            resolvePromise = resolve;
        });
        excutor(result=>{
            if(this.result) {
                return;
            }
            this.result = new Cancel(result!);
            resolvePromise(this.result);
        });
    }
    throwIfCancelRequest() {
        if(this.result) {
            throw this.result;
        }
    }
    static source():CancelTokenSource {
        let cancel!:Canceler;
        let token = new CancelToken(c=>{
            cancel = c;
        });
        return {
            cancel,
            token
        }
    }
}