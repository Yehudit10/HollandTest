const sendEmail = async (req,res) => {
    const { to, subject, text } = req.body;
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
        to: 'yehudit50402@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }})
    
};

export default sendEmail;