const nodemailer=require("nodemailer")

const path=require('path')

const sendEmail = async ({to, subject, text,file,emailTemplate,emailParams,html}) => {
 
   
   if (!to )
   return res.status(400).json({error:true,message:"to is required",data:null})
    const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS   
    }
    });
    
    const mailOptions = {
        from: 'hollandtest@gmail.com',
        to,
        subject,
        text,
       
        html
        
      };
      if(file)
      mailOptions.attachments= [
        {
          filename: file?.originalname,
          content: file?.buffer, 
        },
      ]

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }})
    
};

module.exports={sendEmail}