const User=require('../Models/User')
const UncompletedTest=require("../Models/UncompletedTest")
const Result=require('../Models/Result')
const addResult=async()=>{
    const {userId}=req.body
    const user=await User.findById(userId).lean()
    if(!user)
    return res.status(400).json({error:true,message:"user not found",data:null})
    const test=user.currentTest
    const result={
        R: { work: 0, capability: 0, interest: 0, select: false },
        I: { work: 0, capability: 0, interest: 0, select: false },
        A: { work: 0, capability: 0, interest: 0, select: false },
        S: { work: 0, capability: 0, interest: 0, select: false },
        E: { work: 0, capability: 0, interest: 0, select: false },
        C: { work: 0, capability: 0, interest: 0, select: false },
    }
    test.map((question)=>{
        const{questionType,questionChapter,answer}=question
        result[questionType][questionChapter]+=answer/4
    })
    ///select the index
    const categories = ['R', 'A', 'I', 'S', 'E', 'C']
    const sumResult={}
    let sumAll=0;
    categories.forEach((category)=>{
        sumResult[category]=result.work+result.capability+result.interest
        sumAll+=sumResult[category]
    })
    const temp=[]
    let highInNot=0
    categories.forEach((category)=>{
        if(sumResult[category]/sumAll>33&&sumResult[category]>21)
            result[category].select=true
    else if(sumResult[category]/sumAll>19.5||sumResult[category]>21)
        temp.push(category)
    else if(highInNot<sumResult[category])
    highInNot=sumResult[category]
       
    })
    temp.forEach((category)=>{
        if(sumResult[category]-highInNot>1&&sumResult[category]/sumAll-highInNotsumAll>=2)
        result[category].select=true
    })
    const newResult=await Result.create(result)
    if(!newResult)
    return res.status(400).json({error:true,message:"create failed",data:null})

}
const getResultsWithSentences=async()=>{
    const sentences=[]
    const result=await Result.findById()
    const selected=Object.entries(result).filter(([category,score])=>score.select)
    let sw=0,d=0
    const differences = {
        R: { I: 1, A: 4, S: 4, E: 4, C: 4 },
        I: { R: 1, A: 2, S: 4, E: 4, C: 3 },
        A: { R: 4, I: 2, S: 2, E: 4, C: 4 },
        S: { R: 4, I: 4, A: 2, E: 1, C: 3 },
        E: { R: 4, I: 4, A: 4, S: 1, C: 4 },
        C: { R: 4, I: 3, A: 4, S: 3, E: 4 }
      };
    switch(selected.length)
    {
        case 1:sw=null;break;
        case 2:d=differences[selected[0]][selected[1]];sw=(4-d)/4;break;
        case 3:d=(differences[selected[0]][selected[1]]+differences[selected[0]][selected[2]]+differences[selected[1]][selected[2]]);sw=(4-d)/4;break;
        case 4:sw=0;break;
    
    }
    if (sw >= 0.75 && sw < 1)
sentences.push("הסגנונות המאפיינים אותך קרובים זה לזה, דבר שעשוי להעיד על גיבוש בנוגע לצרכייך האישיים בעולם התעסוקה")
else if (SW >= 0.4 && SW < 0.75)
sn.Add("קיימת קרבה מסויימת בין תחומי העניין שנבחרו");
else if (SW >= 0.25 && SW < 0.4)
sentences.push("הסגנונות המאפיינים אותך משקפים חפיפה מועטה, דבר המעיד על פיזור מסוים בבחירת תחומי העניין ואי-בהירות בהעדפותיך.")
else if (SW >= 0 && SW < 0.25)
sentences.push("הסגנונות המאפיינים אותך שונים זה מזה באופן משמעותי, מה שעשוי להקשות על זיהוי כיוון מקצועי ברור.")


if(sumAll>110)
sentences.push()






}