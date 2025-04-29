const nodemailer=require("nodemailer")
const sendEmail = async ({to, subject, text,file}) => {
 
   
   //if (!to )
   //return res.status(400).json({error:true,message:"to is required",data:null})
    const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS   
    }
    });
    //${base64Image}
    const mailOptions = {
        from: 'hollandtest@gmail.com',
        to,//:'yehudit50402@gmail.com',
        subject,//: 'Sending Email using Node.js',
        text,//: 'That was easy!',
        // html:
        // `
        // <p>Hello,</p>
        // <p>Here is what you captured:</p>
      
        // `
        
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