export function driverExistById(id:number):boolean{
    const validIds = [1, 2, 3];
    return validIds.includes(id);
}