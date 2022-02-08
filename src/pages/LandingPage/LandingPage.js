import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import helloimage from '../../public/Hello-rafiki 1.png';

// Feature Icons
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WebhookIcon from '@mui/icons-material/Webhook';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CloudIcon from '@mui/icons-material/Cloud';
import HttpsIcon from '@mui/icons-material/Https';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Socmed icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const useStyles = makeStyles({
  primaryTextColor: {
    color: "#00838f",
    fontWeight: 400
  },
  cardShadow: {
    boxShadow: "2px 3px",
    color: "#E5E5E5" 
  },
 blackTextColor:{
    color: "#000000"
  },
  iconShape: {
    width: '80px', 
    height: '80px', 
    borderRadius: '50%'
  },
  smallIconShape: {
    width: '50px', 
    height: '50px', 
    border: '2px solid',
    borderColor: "#00838f",
    borderRadius: '50%',
    alignContent: "center"
  },
  smallIcon:{
    color: "#00838f",
    fontSize: '50'
  },
  featuresBox:{
    backgroundColor: "white", 
    borderRadius: '8px',
    textAlign: "justify",
    boxShadow: "2px 3px ",
    color: "#E5E5E5", 
    border: '1px solid',
    borderColor: "#E5E5E5",
    width: '200px', 
    height: '200px'
  },
  ourTeamNameBox:{
    width: '200px', 
    height: "130px", 
    backgroundColor: "#EAF6F4", 
    borderRadius: '6px',
    
  },
  ourTeamMemBox:{
    width: '200px', 
    height: '200px',
    backgroundColor: "white", 
    borderRadius: '8px',
    
  },
  sectionText:{
    fontStyle: "italic",
    color: "black",
    textAlign: "center"
  },
  nameText:{
    color: "black",
    fontWeight:600,
    textAlign: "center"
  },
  socmedIcon:{
    color: "#00838f",
  },
  
});



const LandingPage = () => {
  const [value, setValue] = useState('one');
  const classes = useStyles();

  const howTo = [
    {
      label: "Wear a Facemask",
      image: "face-mask.png"
    },
    {
      label: "Cover mouth when coughing",
      image: "cover-mouth.png"
    },
    {
      label: "Wash your Hands",
      image: "wash-hands.png"
    },
    {
      label: "Clean and Disinfect",
      image: "disinfect.png"
    },
    {
      label: "Maintain Social Distancing",
      image: "distancing.png"
    },
    {
      label: "Stay at Home when sick",
      image: "stay-at-home.png"
    }
  ]

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
  return (
    
    <Box sx={{ width: '100vw'}}>
      <Box sx={{ backgroundColor: "#EAF6F4"}}>
      <Container> 
        <Tabs centered 
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >

          <Tab value="one" label="Home" />
          <Tab value="two" label="About" />
          <Tab value="three" label="Prevention" />
          <Tab value="four" label="SSC System" />
          <Tab value="five" label="Tech Stack" />
        </Tabs>
      </Container>
      </Box>

   {/* header */}
    <Box sx={{ backgroundColor: "#EAF6F4"}}>
    <Container >
      <Grid container sx={{ width: '100%', m:0,  }}>
        <Grid item xs={6}>
          <Typography sx={{mt: "5rem"}} variant="h2" gutterBottom component="div"  className={classes.primaryTextColor}>
          Safe F2F Class Amidst Pandemic
          </Typography>
          <Typography variant="body1" gutterBottom>
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
            neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
            quasi quidem quibusdam.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img src={helloimage} height={504} width={429} alt="HelloImage"/>
        </Grid>
      </Grid>
    </Container>
    </Box>

    {/* 1st Section: About */}
    <Container sx={{mb:"3rem", mt: "3rem"}} >
      <Grid container sx={{ width: '100%', m:0,  backgroundColor: "white" }}>
        {/* <Box sx={{ width: '300px', backgroundColor: "red"}}> */}
          <Grid item xs={3} sx={{mt: "3rem"}}  >
            <img src="ssc-system-logo.jpg" height={300} width={300} alt="HelloImage"  />
          </Grid>
        {/* </Box> */}
        <Grid item xs={8} sx={{ml: "3rem"}}>
          <Box sx={{ width: '800px'}}>
            <Typography sx={{mt:"2rem"}} variant="h2" gutterBottom component="div" className={classes.primaryTextColor}>
            Smart and Safe Campus
            </Typography>
            <Typography variant="body1" gutterBottom align="justify">
            This system's scheduling method could substantially benefit the school's management in implementing safe face-to-face classes. 
            The scheduling system will incorporate the protocols provided by the IATF. One to those protocols is the restrictions in terms of the number of people allowed inside a room. 
            This system will utilize notifications and real-time data onto the applications to keep the users updated. It will also take advantage of the TUP email and Google Classroom.
            </Typography>
            <Typography  variant="body1" gutterBottom align="justify">
            The researchers also recognize the importance of integrating body temperature scanning and hand sanitization into the system. 
            Since this method automates the procedure, security staff may have less contact with most students that access the school. 
            Furthermore, having digital logs of the students’ temperatures could be utilized to produce insights or analytics.
            </Typography>
          </Box>
          
        </Grid>
      </Grid>
    </Container>

    {/* 2nd section: Prevention */}
    <Box sx={{ height: '450px', mx: "2rem", backgroundColor: "#EAF6F4", pt: "1rem", borderRadius: '30px'}}>
      <Container sx={{mt:"1rem"}} >
        <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
          How Can I Protect Myself from Covid-19
        </Typography>
        <Typography sx={{mt:"1rem", mb:"1rem"}} variant="body2" color="text.secondary" align="center">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Grid container sx={{width: '100%'}} >
          {howTo.map(item => (
          <Grid item xs={2} sx={{p:"0"}} >
            <Box sx={{backgroundColor: "white" , borderRadius: '10px', mx:"1rem"  }} className={classes.cardShadow}>
            <Card sx={{maxWidth: 300 }}  class="card-media">
              <CardMedia sx={{borderRadius: '6px'}}
                  component="img"
                  height="150"
                  image={item.image}
                  alt={item.label}
                />
                <CardContent sx={{ height: "3rem"}} align="center" className={classes.blackTextColor}>
                  <Typography sx={{mt: "1rem"}} gutterBottom variant="body2" component="div">
                    {item.label}
                  </Typography>
              </CardContent>
            </Card>
            </Box>
          </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    {/* 3rd Section: Features */}
    <Container sx={{ mt: "4rem"}} >
      <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
            Features
      </Typography>
      <Grid container sx={{width: '100%'}} >
        <Grid item xs={3} justifyContent="center" alignItems="center">
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <AccessTimeFilledIcon sx={{ fontSize: 50, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                  Real-time Data Stream.
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <WebhookIcon sx={{ fontSize: 50, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Seamless integration of web, mobile, raspberry application, and sensors 
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={3} justifyContent="center" alignItems="center" >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <HomeWorkIcon sx={{ my: "5px", mx: "6px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Smart Scheduling system that limits overcrowding of the campus
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={3} justifyContent="center" alignItems="center" >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <CloudIcon sx={{ my: "3px", mx: "4px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Reliable cloud infrastructures 
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <HttpsIcon sx={{ my: "3px", mx: "4px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Secured API endpoints and Request validations
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={3} justifyContent="center" alignItems="center" >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <MobileFriendlyIcon sx={{ my: "5px", mx: "5px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Consistent design system for mobile and web applications
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={3} justifyContent="center" alignItems="center" >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <DesignServicesIcon sx={{my: "5px", mx: "4px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Responsive web and mobile design
              </Typography>
          </Box> 
        </Grid>
        {/* sx={{display: "flex"}} */}
        <Grid item xs={3} justifyContent="center" alignItems="center" >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <DeviceThermostatIcon sx={{ my: "5px", mx: "4px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Utilizes industry standard temperature sensor
              </Typography>
          </Box> 
        </Grid>
      </Grid>
    </Container>

    {/* 4th Section: Our System */}
    <Container sx={{ mt: "5rem"}} >
      <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
            How Our System Can Help Prevent Covid-19?
      </Typography>
      <Grid container sx={{width: '100%', mt:"2rem"}}>
          <Grid item xs={3}>
            <Box sx={{width: '200px', backgroundColor: "white", mb:"1rem", mx:"4px", mt:"1rem", borderRadius: '10px'}} >
              <img src={helloimage} height={200} width={200} alt="HelloImage"/>
            </Box>
            <Box sx={{width: '200px', backgroundColor: "white", mx:"4px", mt:"1rem", borderRadius: '10px'}}>
              <img src={helloimage} height={200} width={200} alt="HelloImage"/>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box sx={{width: '200px', backgroundColor: "white", mb:"1rem", mx:"4px", mt:"1rem", borderRadius: '10px'}}>
              <img src={helloimage} height={200} width={200} alt="HelloImage"/>
            </Box>
            <Box sx={{width: '200px', backgroundColor: "white", mx:"4px", mt:"1rem", borderRadius: '10px'}}>
              <img src={helloimage} height={200} width={200} alt="HelloImage"/>
            </Box>
            </Grid>
          <Grid item xs={6} sx={{justifyContent: "center"}}>
            <img src={helloimage} height={500} width={500} alt="HelloImage"/>
          </Grid>
      </Grid>
    </Container>

   
    <Container sx={{ mt: "20px"}} >
      <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
           Our Team
      </Typography>
      <Typography sx={{ mt: "2rem", mb:"1rem"}} variant="body2" gutterBottom component="div" align="center" className={classes.blackTextColor} >
        Est scelerisque purus tempor, arcu lorem dolor. Erat odio nisl, egestas ac phasellus orci. 
        Morbi in viverra pellentesque sit massa consequat adipiscing orci, lectus. 
        Iaculis pharetra non at consectetur urna mauris vestibulum amet. 
      </Typography>
      <Grid container sx={{width: '100%', mt:"2rem", mx:"1rem"}}>
          <Grid item xs={3} >
            <Box sx={{mb:"1rem", mt:"1rem", mx:"auto"}} className={classes.ourTeamMemBox}>
              <img src="patricia-espenida.jpg" height={200} width={200} id="member-image" alt="HelloImage"/>
            </Box>
            <Box sx={{ mx:"auto"}} className={classes.ourTeamNameBox}>
              <Typography pt={2} px={2} variant="body2" gutterBottom component="div" className={classes.nameText} >
                Patricia Mae C. Espenida
              </Typography>
              <Typography pt={1} px={2} variant="body2" gutterBottom component="div" className={classes.sectionText} >
                patriciamae.espenida
                @tup.edu.ph
              </Typography>
              <Box textAlign="center">
                <IconButton className={classes.socmedIcon} aria-label="Facebook">
                  <FacebookIcon onClick={() => window.open('https://stackoverflow.com/')}/>
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="Google">
                  <GoogleIcon />
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{mx:"auto"}}>
          <Box sx={{mb:"1rem", mt:"1rem", mx:"auto"}} className={classes.ourTeamMemBox}>
              <img src="alladin-melico.jpg" height={200} width={200} id="member-image" alt="HelloImage"/>
            </Box>
            <Box sx={{mt:"1rem", mx:"auto"}} className={classes.ourTeamNameBox}>
              <Typography pt={2} px={2} variant="body2" gutterBottom component="div" className={classes.nameText} >
                Alladin M. Melico 
              </Typography>
              <Typography pt={1} px={2} variant="body2" gutterBottom component="div" className={classes.sectionText} >
                alladin.melico@tup.edu.ph
              </Typography>
              <Box textAlign="center">
                <IconButton className={classes.socmedIcon} aria-label="Facebook">
                  <FacebookIcon onClick={() => window.open('https://stackoverflow.com/')}/>
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="Google">
                  <GoogleIcon />
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{mx:"auto"}}>
          <Box sx={{mb:"1rem", mt:"1rem", mx:"auto"}} className={classes.ourTeamMemBox}>
              <img src="joanna-saba.jpg" height={200} width={200} id="member-image" alt="HelloImage"/>
            </Box>
            <Box sx={{mt:"1rem", mx:"auto"}} className={classes.ourTeamNameBox}>
              <Typography pt={2} px={2} variant="body2" gutterBottom component="div" className={classes.nameText} >
                Joanna Marie N. Saba 
              </Typography>
              <Typography pt={1} px={2} variant="body2" gutterBottom component="div" className={classes.sectionText} >
                joannamarie.saba
                @tup.edu.ph
              </Typography>
              <Box textAlign="center">
                <IconButton className={classes.socmedIcon} aria-label="Facebook">
                  <FacebookIcon onClick={() => window.open('https://stackoverflow.com/')}/>
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="Google">
                  <GoogleIcon />
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3} sx={{mx:"auto"}}>
          <Box sx={{mb:"1rem", mt:"1rem", mx:"auto"}} className={classes.ourTeamMemBox}>
              <img src="elaine-tongson.jpg" height={200} width={200} id="member-image" alt="HelloImage"/>
            </Box>
            <Box sx={{mt:"1rem", mx:"auto"}} className={classes.ourTeamNameBox}>
              <Typography pt={2} px={2} variant="body2" gutterBottom component="div" className={classes.nameText} >
                Elaine M. Tongson
              </Typography>
              <Typography pt={1} px={2} variant="body2" gutterBottom component="div" className={classes.sectionText} >
                elaine.tongson@tup.edu.ph
              </Typography>
              <Box textAlign="center">
                <IconButton className={classes.socmedIcon} aria-label="Facebook">
                  <FacebookIcon onClick={() => window.open('https://stackoverflow.com/')}/>
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="Twitter">
                  <TwitterIcon />
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="Google">
                  <GoogleIcon />
                </IconButton>
                <IconButton className={classes.socmedIcon} aria-label="LinkedIn">
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
      </Grid>
    </Container>
    

</Box>

  )
}
export default LandingPage