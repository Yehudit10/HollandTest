export const resultTemplate=(username)=>
`<!DOCTYPE html>
<html lang="he" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <title>תוצאות חדשות מחכות לך</title>
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
        background-color: #007ad9;
        color: #ffffff;
        text-align: center;
        padding: 20px;
      }
      .content {
        padding: 30px;
        font-size: 16px;
        color: #333333;
      }
      .button {
        display: inline-block;
        margin-top: 20px;
        background-color: #007ad9;
        color: white !important;   
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
        <h1>תוצאות מבחן הולנד זמינות עבורך</h1>
      </div>
      <div class="content">
        <p>שלום ${username},</p>
        <p>סיימת את מבחן הולנד, והתוצאות שלך מוכנות לצפייה.</p>
        <p>כדי לצפות בתוצאות שלך, הורד את הקובץ:</p>
        <a class="button" href=${window.location.href}>צפייה בתוצאות</a>
        <p>בהצלחה בהמשך הדרך,<br/>צוות HollandTest</p>
      </div>
      <div class="footer">
        מייל זה נשלח באופן אוטומטי. אין להשיב אליו.
      </div>
    </div>
   </body>
</html>`
