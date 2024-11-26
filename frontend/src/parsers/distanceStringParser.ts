export default function distanceStringParser(n:number):string {

    let n_string:string = String(n/1000);

    return n_string + " Km";

}