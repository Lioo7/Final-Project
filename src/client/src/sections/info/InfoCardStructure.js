import PropTypes from 'prop-types';
import { Card, Typography } from '@mui/material';

export default function InfoCardStructure({ val, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 5,
        textAlign: 'center',
        marginLeft: 1,
        marginRight: 3,
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >

      <Typography variant="h3">{val}</Typography>

    </Card>
  );
}

InfoCardStructure.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};