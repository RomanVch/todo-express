export const checkDateWithToday = (date:string):boolean=>{
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const taskCreat = new Date(date)
    
    return today.getDate() <= taskCreat.getDate()
    // const now = new Date()
    // const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    // const taskCreat = new Date(date)
    // return today <= taskCreat;
}