const counselorSignupTemplate=(username,password)=>
`<!DOCTYPE html>
<html lang="he" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <title>פרטי התחברות זמניים</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        margin: 0;
        padding: 0;
        direction: rtl;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        direction: rtl;
      }
      .header {
        background-color: #28a745;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .content {
        padding: 30px;
        font-size: 16px;
        color: #333333;
      }
      .credentials {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        padding: 15px;
        margin: 20px 0;
        border-radius: 6px;
      }
      .credentials p {
        margin: 5px 0;
        font-weight: bold;
      }
      .button {
        display: inline-block;
        margin-top: 20px;
        background-color: #28a745;
        color: #ffffff!important;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #999999;
        padding: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>פרטי התחברות זמניים</h1>
      </div>
      <div class="content">
        <p>שלום ${username},</p>
        <p>נוצר עבורך חשבון חדש במערכת HollandTest. להלן פרטי ההתחברות הזמניים שלך:</p>

        <div class="credentials">
          <p>📧 שם משתמש: ${username}</p>
          <p>🔑 סיסמה זמנית: ${password}</p>
        </div>

        <p>
          נא להתחבר למערכת ולשנות את הסיסמה שלך בהקדם האפשרי לשמירה על אבטחת המידע.
        </p>

        <a class="button" href="http://localhost:3000/login">התחברות למערכת</a>

        <p>אם לא אתה ביקשת את החשבון הזה – נא להתעלם מהודעה זו.</p>

        <p>בברכה,<br/>צוות HollandTest</p>
      </div>
      <div class="footer">
        הודעה זו נשלחה באופן אוטומטי. אין להשיב אליה.
      </div>
    </div>
  </body>
</html>`
module.exports=counselorSignupTemplate