import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"


export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={0}
      direction='column'
      alignItems='center'
      justifyContent='center'
      sx={{ minHeight: 'calc(100vh - 100px)', backgroundColor: 'primary.main', padding: 2, borderRadius: 2 }}
    >
      <Grid item xs={ 12 }>
         <StarOutline sx={{ fontSize: 100, color: 'white' }} /> 
      </Grid>

      <Grid item xs={ 12 }>
         <Typography color='white' variant='h5'> Seleccione o Cree una Entrada</Typography>
      </Grid>
    </Grid>
  )
}
