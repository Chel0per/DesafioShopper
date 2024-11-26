export default function durationStringParser(s:string):string {

    let seconds:number = Number(s.slice(0,-1));
    
    const days:number = Math.floor(seconds / 86400); 
    seconds -= days*86400;

    const hours:number = Math.floor(seconds / 3600); 
    seconds -= hours*3600;

    const minutes:number = Math.floor(seconds / 60); 
    seconds -= minutes*60;

    let result:string = "";
    let first_part:boolean = true;

    if(days === 1){
        result += "1 dia"
        first_part = false
    }
    else if(days > 1){
        result += `${days} dias`
        first_part = false
    }

    if(hours === 1){
        {
            if(!first_part) result += " ";
        }
        result += "1 hora"
        first_part = false
    }
    else if(hours > 1){
        {
            if(!first_part) result += " ";
        }
        result += `${hours} hora`
        first_part = false
    }

    if(minutes === 1){
        {
            if(!first_part) result += " ";
        }
        result += "1 minuto"
        first_part = false
    }
    else if(minutes > 1){
        {
            if(!first_part) result += " ";
        }
        result += `${minutes} minutos`
        first_part = false
    }

    if(seconds === 1){
        {
            if(!first_part) result += " ";
        }
        result += "1 segundo"
        first_part = false
    }
    else if(seconds > 1){
        {
            if(!first_part) result += " ";
        }
        result += `${seconds} segundos`
        first_part = false
    }

    return result;

}