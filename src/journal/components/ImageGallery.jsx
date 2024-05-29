import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({images =[]})=> {




  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {images.map((item) => (
        <ImageListItem key={item}>
          <img
            srcSet={`${item}`}
            src={`${item}?w=164&h=164&fit=crop&auto=format`}
            alt='Imagen de la nota'
            loading="lazy"
            style={{maxHeight: '207px'}}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
