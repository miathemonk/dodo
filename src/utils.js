let currentId = 10;
export function GenerateId(){
    currentId += 1;
    return String(currentId);
}