import React from 'react';
import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '550px',
  height: '250px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};

const colors = ['rgb(255,0,0,0.1)', 'rgb(255,255,0,0.1)', 'rgb(0,0,255,0.1)', 'rgb(0,255,255,0.1)'];

export default function InfoCards(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(props.key);
  console.log(props.value);
  return (
    <div>
      <Grid container spacing={3} sx={{ display: 'flex'}}>
        <Button
          item
          xs={12}
          sm={6}
          md={3}
          sx={{ ...props.styleCards, backgroundColor: colors[props.index % colors.length] }}
          onClick={handleOpen}
        >
          {props.keys}
        </Button>
      </Grid>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        lang="he"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h4" component="h2" sx={{ textAlign: 'center' }}>
          {props.keys}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2, textAlign: 'right' }}>
            {props.value}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
// import React from 'react';
// import { Grid } from '@mui/material';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '550px',
//   height: '250px',
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
//   overflowY: 'auto',
// };

// const styleCards = {
//   // py: 10,
//   px: 10,
//   boxShadow: 3,
//   textAlign: 'center',
//   marginLeft: 4,
//   marginRight: 1,
//   marginBottom: 4,
//   fontSize: '18px',
//   borderRadius: '50%',
//   backgroundColor: '#007bff',
//   color: 'black',
//   width: '200px',
//   height: '200px',
//   fontFamily: ' system-ui',

//   // color: 'text.primary',
//   // bgcolor: 'primary.main',
//   '&:hover': {
//     color: 'rgb(0,0,205,0.7)',
//     fontSize: '23px',
//   },
// };

// export default function InfoCards() {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   return (
//     <div>
//       <Grid container spacing={3} display="flex">
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,0,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           חינוך
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           מדע, תרבות וספורט
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,0,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           העברות לביטוח לאומי
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           בריאות
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           רווחה
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,0,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           השכלה גבוהה
//         </Button>

//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           ביטחון
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,0,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           ביטחון פנים
//         </Button>

//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           קרן/ביטוח לאומי
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           ריבית
//         </Button>

//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,0,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           תחבורה
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           בינוי ושיכון
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,0,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           אנרגיה
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           משק המים
//         </Button>

//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           תקשורת
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,0,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           תיירות
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           חקלאות
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,0,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           הגנת הסביבה
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           כלכלה ותעשיה
//         </Button>

//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           ראש הממשלה
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,0,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           שירותי דת
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           משפטים
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,0,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           אוצר
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           חוץ
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           פנים ושלטון מקומי
//         </Button>

//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,0,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           גמלאות
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(255,255,0,0.1)' }}
//           onClick={handleOpen}
//         >
//           רזרבה
//         </Button>
//         <Button
//           item
//           xs={12}
//           sm={6}
//           md={3}
//           sx={{ ...styleCards, backgroundColor: 'rgb(0,0,255,0.1)' }}
//           onClick={handleOpen}
//         >
//           הוצאות שונות
//         </Button>
//       </Grid>

//       <Modal
//         keepMounted
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="keep-mounted-modal-title"
//         aria-describedby="keep-mounted-modal-description"
//         lang="he"
//       >
//         <Box sx={style}>
//           <Typography id="keep-mounted-modal-title" variant="h4" component="h2" sx={{ textAlign: 'center' }}>
//             חינוך
//           </Typography>
//           <Typography id="keep-mounted-modal-description" sx={{ mt: 2, textAlign: 'right' }}>
//             משרד החינוך אחראי להקניית ידע לילדים וזכאים לחינוך בהתאם לחוק לימוד חובה. המשרד אחראי לקידום המצוינות,
//             לשיפור ההישגים ולרמת האיכות החינוכית, תוך צמצום הפערים החברתיים ; ליצירת מערכת חינוך אפקטיבית ויעילה שתשרת
//             את צורכי הפרט ואת צרכיה המשתנים של מדינת ישראל; ולקידום ערכים ציוניים, יהודיים, דמוקרטיים וחברתיים. המשרד
//             פועל ברמה הארצית באמצעות המטרה וברמה המחוזית - באמצעות שמונה מחוזות שהם הזרוע הביצועית של מטה המשרד. משרד
//             החינוך ממונה על מוסדות החינוך, ובכלל זה גנים, בתי ספר והחינוך הבלתי פורמאלי.{' '}
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }