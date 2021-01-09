const cookie = {
    read(cookieName:string):string|null {
           return getMatch(cookieName);
    }
}
function getMatch(cookiName:string):string|null {
    const cookie = document.cookie;
    
    if(cookie) {
        const reg = new RegExp(`${cookiName}=(.*);`,'g');
        const result = reg.exec(cookie);
        if(result) {
            return result[1];
        }
    }
    return null;
}
export default cookie;
