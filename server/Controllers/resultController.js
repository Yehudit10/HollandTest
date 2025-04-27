const User=require('../Models/User')
const Result=require('../Models/Result')
const Type=require("../Models/Type")
const Test=require("../Models/Test")



const addResult=async(req,res)=>{




    // const {userId}=req.body
    // const user=await User.findById(userId).lean()
    // if(!user)
    // return res.status(400).json({error:true,message:"test not found",data:null})
    // const test=user.currentTest.populate('cpatherID','type')
     const {testId}=req.body
    // const test=await Test.findById(testId).lean().populate("answers.questionType").populate("answers.questionChapter")
     const test=await Test.findOne({_id:testId,userId:req.user._id}).lean().populate({path:"test.question",populate:[{path:"chapterID"},{path:"type"}]})
     if(!test) 
       return res.status(400).json({error:true,message:"test not found",data:null})
    const result={
        R: { work: 0, capability: 0, interest: 0, select: false },
        I: { work: 0, capability: 0, interest: 0, select: false },
        A: { work: 0, capability: 0, interest: 0, select: false },
        S: { work: 0, capability: 0, interest: 0, select: false },
        E: { work: 0, capability: 0, interest: 0, select: false },
        C: { work: 0, capability: 0, interest: 0, select: false },
    }
    const sumResult={R:0,I:0,A:0,S:0,E:0,C:0}
    let sumAll=0;
    // (test.answers).forEach((answer)=>{
    //     result[answer.questionType.type][answer.questionChapter.chapterName]+=answer.questionResult/4
    //     sumResult[answer.questionType.type]+=answer.questionResult/4
    //     sumAll+=answer.questionResult/4
    // })
    (test.test)?.forEach((answer)=>{
        result[answer.question.type.type][answer.question.chapterID.chapterName]+=answer.questionResult/4
        sumResult[answer.question.type.type]+=answer.questionResult/4
        sumAll+=answer.questionResult/4
    })

    ///select the index
    //const categories = ['R', 'A', 'I', 'S', 'E', 'C']
    // categories.forEach((category)=>{
    //     sumResult[category]=result.work+result.capability+result.interest
    //     sumAll+=sumResult[category]
    // })
    const temp=[]
    let highInNot=0
    for(const category in sumResult)
    { 
        if((sumResult[category]*100)/sumAll>33&&sumResult[category]>21)
    result[category].select=true
else if((sumResult[category]*100)/sumAll>19.5||sumResult[category]>21)
temp.push(category)
else if(highInNot<sumResult[category])
highInNot=sumResult[category]


    }
    //categories.forEach((category)=>{
    //     if(sumResult[category]/sumAll>33&&sumResult[category]>21)
    //         result[category].select=true
    // else if(sumResult[category]/sumAll>19.5||sumResult[category]>21)
    //     temp.push(category)
    // else if(highInNot<sumResult[category])
    // highInNot=sumResult[category]
       
   // })
    temp.forEach((category)=>{
        if(sumResult[category]-highInNot>1&&(sumResult[category]*100)/sumAll-highInNot*100/sumAll>=2)
        result[category].select=true
    })
    const newResult=await Result.create({userId:test.userId,result})
    if(!newResult)
    return res.status(400).json({error:true,message:"create failed",data:null})
    return res.status(201).json({error:false,message:null,data:newResult})
}
const getAllUserResult=async(req,res)=>{
    const results=await Result.find({userId:req.user._id}).lean();
    // if(!results)
    // return res.status(400).json({error:true,message:"results not found",data:null})
    return res.status(200).json({error:false,message:"",data:results})
}
const getResultsWithSentences=async(req,res)=>{
    const sentences=[]
    const {id}=req.params
    if(!id)
        return res.status(400).json({error:true,message:"id is required",data:null})
    const userResult=await Result.findOne({_id:id,userId:req.user._id})
    if(!userResult)
        return res.status(400).json({error:true,message:"test not found",data:null})
    const {result,userId}=userResult
    const selected=Object.entries(result).filter(([category,score])=>score.select)
    console.log(selected)
    const sums=Object.values(result).reduce((acc,{interest,capability,work})=>{
        acc.sumI+=interest
        acc.sumC+=capability
        acc.sumW+=work
        return acc
    },{sumI:0,sumC:0,sumW:0})
    const {sumI,sumC,sumW}=sums
 const sumAll=sumI+sumC+sumW
 const types=await Type.find().lean()
if(!types)
    return res.status(400).json({error:true,message:"types not found",data:null})
const typeMaps={}
types.forEach(({type,title})=>{
    typeMaps[type]=title 
 })
//  {
//     C: "מנהלי",
//     E: "יזמי",
//     S: "חברתי",
//     A: "אמנותי",
//     I: "חקרני",
//     R: "ביצועי"
// }
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
        case 2:d=differences[selected[0][0]][selected[1][0]];sw=(4-d)/4;break;
        case 3:d=(differences[selected[0][0]][selected[1][0]]+differences[selected[0][0]][selected[2][0]]+differences[selected[1][0]][selected[2][0]]);sw=(4-d)/4;break;
        case 4:sw=0;break;
    
    }
if (sw >= 0.75 && sw < 1)
sentences.push("הסגנונות המאפיינים אותך קרובים זה לזה, דבר שעשוי להעיד על גיבוש בנוגע לצרכייך האישיים בעולם התעסוקה")
else if (sw >= 0.4 && sw < 0.75)
sentences.push("קיימת קרבה מסויימת בין תחומי העניין שנבחרו");
else if (sw >= 0.25 && sw < 0.4)
sentences.push("הסגנונות המאפיינים אותך משקפים חפיפה מועטה, דבר המעיד על פיזור מסוים בבחירת תחומי העניין ואי-בהירות בהעדפותיך.")
else if (sw >= 0 && sw < 0.25)
sentences.push("הסגנונות המאפיינים אותך שונים זה מזה באופן משמעותי, מה שעשוי להקשות על זיהוי כיוון מקצועי ברור.")


if(sumAll>110)
sentences.push("נבחרו מספר רב של פריטים בשאלון כולו, דבר שעשוי להצביע על תחומי עניין מרובים, ובשל כך על קושי במיקוד תחומי הבחירה")
if(sumAll<54)
sentences.push("נבחרו פריטים מעטים בשאלון כולו, דבר שעשוי להעיד על סלקטיביות רבה בבחירותייך באופן שמקשה על מיפוי העדפותייך ומקשה על מיקוד בבחירה")
if(sumI>40)
sentences.push("נבחרו מספר רב של פריטים בחלק מן הפעילויות, מה שמצביע על סקרנות ועל עניין בתחומים רבים ומגוונים")
if(sumC>=40)
sentences.push("נבחרו מספר רב של פריטים בחלק הכשרים, על כן ניכר שאת/ה מעריך/ה את כישורייך כגבוהים בתחומים רבים") 
if(sumW>35)
sentences.push("ישנם תחומים רבים שאת/ה שואף/ת להשתלב בהם בעתיד, וקיים קושי למקד את בחירתך")
if(sumI>0&&sumI<=16)
sentences.push("נבחרו פריטים מעטים בחלק מן הפעילויות, דבר שיכול להעיד על קושי בזיהוי תחומי העניין והסיפוק האישיים שלך")
if(sumI===0)
sentences.push("לא נבחרו פריטים בחלק מן הפעילויות, דבר שיכול להעיד על קושי בזיהוי תחומי העניין והסיפוק האישיים שלך")
if(sumC>0&&sumC<=16)
sentences.push("נבחרו פריטים מעטים בחלק מן הכשרים, דבר שעשוי להצביע על שימוש בביקורת עצמית רבה, המשפיעה על הערכתך את יכולתך להצליח בתחומים שונים")
if(sumC===0)
sentences.push("לא נבחרו פריטים בחלק הכשרים, דבר שעשוי להעיד על הערכה עצמית נמוכה לגבי יכולתך להצליח בתחומים שונים ואשר מקשה עלייך בבחירת כיווני לימודים ותעסוקה")
if(sumW>0&&sumW<9)
sentences.push("נבחרו פריטים מעטים בחלק מן המקצועות. ייתכן שהדבר נובע מהיכרות מועטה עם עולם התעסוקה ו/ או מרמת נכונות נמוכה לבחירה עכשווית")
if(sumW===0)
sentences.push("לא נבחרו פריטים בחלק מן המקצועות. ייתכן שהדבר נובע מהיכרות מועטה עם עולם התעסוקה ו/ או מרמת נכונות נמוכה לבחירה עכשווית")
const s=""
if (sumAll > 48)
{
    
}
//...continue

const chaptersDiff = {
    C: { IC: 5, IW: 5, CW: 6, CI: 6, WI: 3, WC: 4 }, 
    E: { IC: 5, IW: 5, CW: 5, CI: 3, WI: 4, WC: 5 }, // יזמי
    S: { IC: 3, IW: 7, CW: 8, CI: 4, WI: 3, WC: 3 }, // חברתי
    A: { IC: 7, IW: 5, CW: 3, CI: 3, WI: 3, WC: 6 }, // אמנותי
    I: { IC: 4, IW: 5, CW: 5, CI: 4, WI: 3, WC: 4 }, // חקרני
    R: { IC: 4, IW: 6, CW: 7, CI: 5, WI: 3, WC: 3 }  // ביצועי
}

selected.forEach(([cat,{work,capability,interest}])=>{
    const category=typeMaps[cat] 
    if(interest-capability>chaptersDiff[cat].IC&&interest-work>chaptersDiff[cat].IW)
    sentences.push("בתחום ה" +category+"בולטת בחירה מרובה בפעילויות ביחס להערכה נמוכה של כישורים וביחס לבחירה מועטת במקצועות. כלומר, ניכר העניין הרב שהתחום מספק לך, אולם יש לך נטייה לא להעריך את יכולתך להצליח בתחום זה, לכן נכונותך לבחור בו בפועל נמוכה")
else if(interest-capability>chaptersDiff[cat].IC)
sentences.push("בתחום ה"+category+" בולטת בחירה מרובה בפעילויות ביחס להערכה נמוכה של כישורים. ניכר העניין הרב שהתחום מספק לך, אולם יש לך נטייה לא להעריך את יכולתך להצליח בתחום זה, דבר שעשוי להשפיע על הנכונות שלך לבחור בו בפועל")
else if(interest-work>chaptersDiff[cat].IW)
sentences.push("בתחום ה"+category+" בולטת בחירה מרובה בפעילויות ביחס לבחירה מועטת במקצועות, דבר שיכול להעיד על נכונות נמוכה לעסוק בתחום זה, אף על פי שאתה נהנה מעיסוקים הקשורים בו ומתעניין בו")

if(capability-work>chaptersDiff[cat].CW&&capability-interest>chaptersDiff[cat].CI)
sentences.push("בתחום ה"+category+"בולטת הערכה גבוהה של כישורים ביחס לבחירה מועטת במקצועות ובפעילויות, דבר שיכול להעיד על עניין מועט שהתחום מספק לך ועל נכונות נמוכה לעסוק במקצועות מתחום זה למרות הערכה עצמית גבוהה לגבי יכולתך להצליח בו")
else if(capability-work>chaptersDiff[cat].CW)
sentences.push("בתחום ה"+category+"בולטת הערכה גבוהה של כישורים ביחס לבחירה מועטת במקצועות, דבר שיכול להעיד על הערכה עצמית גבוהה לגבי יכולתך להצליח בתחום ,אך על נכונות נמוכה לעסוק בו בפועל")
else if(capability-interest>chaptersDiff[cat].CI)
sentences.push("בתחום ה"+category+" בולטת הערכה גבוהה של כישורים ביחס לבחירה מועטת בפעילויות, דבר שיכול להעיד על הערכה עצמית גבוהה שלך בתחום למרות רמת עניין נמוכה, שעשייה בתחום זה מספקת לך")

if(work-interest>chaptersDiff[cat].WI&&work-capability>chaptersDiff[cat].WC)
sentences.push("בתחום ה"+category+"בולטת בחירה מרובה במקצועות ביחס להערכה נמוכה של כישורים וביחס לבחירה מועטת בפעילויות, דבר שיכול להעיד על רצון ועל מוטיבציה גבוהה לעסוק במקצועות מתחום זה בעתיד למרות רמת עניין נמוכה והערכה עצמית נמוכה של יכולותיך בו כיום")
else if(work-interest>chaptersDiff[cat].WI)
sentences.push("בתחום ה"+category+"בולטת בחירה מרובה במקצועות ביחס לבחירה מועטת בפעילויות, דבר שיכול להעיד על רצון ועל מוטיבציה גבוהה לעסוק במקצועות מתחום זה בעתיד למרות רמת עניין וסיפוק נמוכה מפעילויות בו כיום")
else if(work-capability>chaptersDiff[cat].WC)
 sentences.push("בתחום ה"+category+"בולטת בחירה מרובה במקצועות ביחס להערכה נמוכה של כישורים, דבר שיכול להעיד על רצון ועל מוטיבציה גבוהה לעסוק במקצועות מתחום זה בעתיד למרות הערכה עצמית נמוכה של יכולותיך בו כיום")
// sentences.push("בתחום ה"+category+"")
// sentences.push("בתחום ה"+category+"")
 
})
return res.status(200).json({error:false,message:null,data:{result,sentences}})

}

module.exports={addResult,getResultsWithSentences,getAllUserResult}