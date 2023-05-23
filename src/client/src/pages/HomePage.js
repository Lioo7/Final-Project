import { Helmet } from 'react-helmet-async';
import { Typography, Box, Card, CardContent } from '@mui/material';
// import HomeForm from '../sections/home/HomeForm';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> Home </title>
      </Helmet>

      <Box sx={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h2" style={{ fontFamily: 'Ubuntu' }}>
          Your votes, your budget!
        </Typography>
        <CardContent>
          <img
            src={`${process.env.PUBLIC_URL}/img_bg/home.png`}
            alt="Logo"
            style={{
              width: '130px',
              marginTop: '-80px',
            }}
          />
        </CardContent>
      </Box>

      {/* <Card sx={{ width: 'auto', height: '100%', marginTop: '-10px' }}>
        <CardContent> */}
      <Box sx={{ width: '50%', height: '100%', float: 'right'}}>
        <Typography variant="body1" dir="rtl" style={{ fontFamily: 'Alef', fontSize: '20px', lineHeight: '1.5' }}>
          הצגת תקציב העם: עצמת האזרחים לעצב את העתיד.
          <br />
          ברוכים הבאים לתקציב העם, פלטפורמה פורצת דרך המעמידה את כוח קבלת ההחלטות בידי העם. האתר שלנו מספק גישה כוללת
          ודמוקרטית לקביעת אופן הקצאת תקציבי המדינה. אנחנו מאמינים שכל אזרח צריך להביע דעה בעיצוב עתיד הקהילה שלו, וזה
          בדיוק מה שאנחנו מציעים. בתקציב העם, אנו מבינים שלכל אדם יש סדרי עדיפויות ודאגות ייחודיים. לכן אנו מספקים מגוון
          מקיף של פרויקטים ויוזמות, כל אחד מלווה במידע מפורט, מבטיח שקיפות וקבלת החלטות מושכלת.
          <br /> בין אם זה חינוך, שירותי בריאות, תשתיות או תוכניות חברתיות, תמצא הכל כאן.
          <br />
          <br />
          הממשק הידידותי שלנו מאפשר לך לחקור ולהצביע בנושאים החשובים לך ביותר. אנו מעריכים את קולך ורוצים להבטיח שהקול
          שלך ייספר. על ידי השתתפות בתהליך קבלת ההחלטות, אתה הופך לתורם פעיל לפיתוח והתקדמות הקהילה שלך. אבל זה לא נגמר
          שם. אנו הולכים צעד קדימה על ידי מתן נתונים סטטיסטיים בזמן אמת על ההצבעות וחלוקת התקציב. הפלטפורמה שלנו משתמשת
          בשני אלגוריתמי הפצה מתקדמים המציעים תובנות לגבי אופן הקצאת התקציב על סמך הבחירות הקולקטיביות שנעשו על ידי
          האנשים. <br />
          <br />
          הישאר מעודכן בתוצאות האחרונות וראה ממקור ראשון את ההשפעה של ההצבעה שלך על חלוקת התקציב הכוללת. הצטרפו עוד היום
          לתקציב העם והפכו לסוכן שינוי. יחד, בואו נעצב עתיד מזהיר יותר על ידי השמעת קולנו, ספירת הקולות שלנו והקהילות
          שלנו משגשגות.
        </Typography>
      </Box>
      {/* </CardContent>
      </Card> */}
    </>
  );
}
