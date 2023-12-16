

export const setLastVisit = (req,res,next)=>{

    // 1. If cookie is set, add a local variable with last visit time data
    if(req.cookies.lastVisit){
        res.locals.Visit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    // 2. When cookie is not set.i.e. user is visiting for first time
    res.cookie('lastVisit' , new Date().toISOString(),{
        maxAge : 2*24*60*60*1000 // Specifying cookie life in milliseconds
    });
    next();
}