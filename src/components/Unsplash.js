import React, {useState} from 'react'
import axios from 'axios'
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

const Unsplash = ({selectedPhoto, setSelectedPhoto}) => {
  const [term, setTerm] = useState('')
  const [images, setImages] = useState([])

  async function search() {
    if (term.length) {
      try {
        const {data} = await axios.get(`https://api.unsplash.com/search/photos?query=${term}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`)
        await setImages(data.results)       
      } catch (error) {
        console.log(error)
      }        
    }
  }

  return (
    <Box sx={{ width: '100%', my: '1rem' }}>
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="Search cover photo"
          color="primary"
          value={term}
          sx={{ mr: '1rem' }}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button variant="contained" type="button" startIcon={<SearchOutlinedIcon />} onClick={() => search()}>Search</Button>
      </Box>
      <Box>
        {selectedPhoto && (
          <Card sx={{ maxWidth: 345, mx: 'auto', my: '0.5rem' }}>
            <CardMedia
              component="img"
              height="200"
              image={selectedPhoto.urls.small}
              alt={selectedPhoto.alt_description}
              loading="lazy"
            />
          </Card>
        )}
        {images.length !== 0 && (
          <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
            {images.map((item) => (
              <ImageListItem key={item.img} sx={{ cursor: 'pointer' }} onClick={() => {
                setSelectedPhoto(item)
                setImages([])
              }}>
                <img
                  src={item.urls.raw + '?w=164&h=164&fit=crop&auto=format'}
                  srcSet={item.urls.raw + '?w=164&h=164&fit=crop&auto=format&dpr=2 2x'}
                  alt={item.alt_description}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>        
        )}
      </Box>
    </Box>
  )
}

export default Unsplash