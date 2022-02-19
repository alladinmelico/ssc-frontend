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
import Carousel from 'react-material-ui-carousel'
import helloimage from '../../public/Hello-rafiki 1.png';
import { Paper, Button } from '@mui/material'


// Feature Icons
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WebhookIcon from '@mui/icons-material/Webhook';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CloudIcon from '@mui/icons-material/Cloud';
import HttpsIcon from '@mui/icons-material/Https';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

// Socmed icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { fontWeight } from '@mui/system';

const useStyles = makeStyles({
  primaryTextColor: {
    color: "#00838f",
    fontWeight: 400
  },
  whiteTextColor:{
    color: "white",
  },
  cardShadow: {
    boxShadow: "2px 3px",
    color: "#E5E5E5" 
  },
 blackTextColor:{
    color: "#000000"
  },
  blackBoldTextColor:{
    color: "#000000",
    fontWeight: 600
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
    textAlign: "center",
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
  signInBtn:{
    width:"180px",
    height: "40px", 
    backgroundColor:"#00838f", 
    borderRadius:"6px",
    boxShadow: "2px 3px ",
    color: "#E5E5E5", 
    border: '1px solid',
    borderColor: "#E5E5E5",
  },
  ourSysBox:{
    width: '200px', 
    backgroundColor: "white", 
    mb:"1rem", 
    borderRadius: '10px',
    boxShadow: "2px 3px",
    color: "#E5E5E5",
    borderColor: "#E5E5E5",
    border: '1px solid',
  },
  aboutLogo:{
    width: '400px', 
    maxHeight:'100%' , 
    maxWidth: '100%', 
    "@media (max-width: 576px)": {
      maxWidth: '100%',
      alignContent: "center",
   }
  },
  techstack:{
  maxHeight: '100%',
  maxWidth: 'none',
    "@media (max-width: 1024px)": {
    maxHeight: '350px',
    alignContent: "center",
    }
  },
});



const LandingPage = () => {
  const [value, setValue] = useState('one');
  const [selectedPrevention, setSelectedPrevention] = useState({label:"Step 1. Implements restrictions on schedules", 
  image:"/restrictions.png"});

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
      window.location.hash = newValue
    };

    const items = [
      [
       {
        name: "Laravel",
        image: "/laravel-logo.jpg"
       },
       {
        name: "Heroku",
        image: "/heroku-logo.png"
       },
       {
        name: "AWS Relational Database Service",
        image: "/aws-rds-logo.png"
       },
       {
        name: "Pusher",
        image: "/pusher-logo.jpg"
       },
      ],
      [
      {
       name: "React Js",
       image: "/react.png"
      },
      {
       name: "Netlify",
       image: "/netlify-logo.jpg"
      },
      {
       name: "React Material Design",
       image: "/mui-logo.png"
      },
      {
       name: "React Native",
       image: "/react.png"
      },
       ]
  ]

  return (
    <Box sx={{ width: '100vw'}}  >
     
      <Box style={{position:"sticky", top:0, zIndex: 999, display:"flex", 
      justifyContent:"center", }} sx={{ backgroundColor: "#EAF6F4", width:"100%" }}  >
        <Tabs centered  
        allowScrollButtonsMobile 
        variant="scrollable"
        scrollButtons="auto"
        sx={{ pt:"1rem"}}  
         
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >

          <Tab value="#home" label="Home" />
          <Tab value="#about" label="About" />
          <Tab value="#prevention" label="Prevention" />
          <Tab value="#sscsystem" label="SSC System" />
          <Tab value="#features" label="Features" />
          <Tab value="#techstack" label="Tech Stack" />
          <Tab value="#ourteam" label="Our Team" />
        </Tabs>
      
      </Box>
     

   {/* header */}
    <Box id="home" sx={{ maxHeight: "100%", maxWidth:"100%", backgroundColor: "#EAF6F4", pb:"1rem"}}>
    <Container sx={{ mx:"auto" }} >
      <Grid container sx={{ pt: "1rem", width: '100%', mx:"auto"  }}>
        <Grid item xs={12} sm={12} md={7} lg={6} >
        <Box sx={{ width: "500px", maxWidth: "100%", mx:"auto"}}>
          <Typography sx={{mt: "5rem"}} variant="h2" gutterBottom component="div" className={classes.primaryTextColor}>
          Safe F2F Class Amidst Pandemic
          </Typography>
          <Typography variant="body1" gutterBottom textAlign="justify">
            body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
            blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
            neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
            quasi quidem quibusdam.
          </Typography>
          </Box>
          <Box sx={{mt: "1rem", mx:"auto"}} className={classes.signInBtn} >
            <Link style={{ textDecoration: 'none' }} to="/signin"> 
              <Typography className={classes.whiteTextColor} sx={{pt:"5px", pb: "3px", textAlign: "center"}}  variant="subtitle1" gutterBottom>
                Sigin
              </Typography>
            </Link>
          </Box>
        </Grid>
        
        <Grid item xs={12} sm={12} md={5} lg={6}>
          <Box sx={{ mx:"auto" }} className={classes.aboutLogo}>
            <img sx={{ mx:"auto" }} className={classes.aboutLogo} height={400} width={400} src="/sched-gif.gif" alt="Schedule GIF"/>
          </Box>
        </Grid>
        
        
      </Grid>
    </Container>
    </Box>

    {/* 1st Section: About */}
    <Container id="about" sx={{mb:"2rem", mt: "2rem"}} >
      <Grid container sx={{ width: '100%', backgroundColor: "white" }} spacing={2}>
        {/* <Box sx={{ width: '300px', backgroundColor: "red"}}> */}
          <Grid item xs={12} sx={{mt: "3rem", mx:"auto"}} sm={12} md={5} lg={3}  >
            <Box sx={{ width: '300px', maxHeight:'100%' , maxWidth: '100%', mx:"auto" }}>
              <img id="about-logo" src="ssc-system-logo.jpg" height={300} width={300} alt="HelloImage"  />
            </Box>
          </Grid>
        {/* </Box> */}
        <Grid item xs={12} sm={12} md={7} lg={8}>
          <Box sx={{ width: '800', maxWidth:'100%', mx:"auto" }}>
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
    <Box id="prevention" sx={{ maxHeight:'100%', width:'400', maxWidth:'100%', mx: "2rem", backgroundColor: "#EAF6F4", pt: "1rem", pb:"1rem",  borderRadius: '30px', flexGrow: 1}} >
      <Container sx={{mt:"1rem"}}  >
        <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
          How Can I Protect Myself from Covid-19
        </Typography>
        <Typography sx={{mt:"1rem", mb:"1rem"}} variant="body2" color="text.secondary" align="center">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Grid container sx={{width: '100%'}} spacing={{ xs:2, sm:3, md:4}}  >
          {howTo.map(item => (
          <Grid item xs={12} sx={{p:"0"}} sm={4} md={3} lg={2}  >
            <Box sx={{backgroundColor: "white" , borderRadius: '10px'}} className={classes.cardShadow}>
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

    {/* 3rd Section: Our System */}
    <Container id="sscsystem" sx={{ mt: "5rem"}} >
      <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
            How Our System Can Help Prevent Covid-19?
      </Typography>
      <Grid container sx={{width: '100%', mt:"2rem"}}>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Box onClick={() => setSelectedPrevention({label:"Step 1: Implements restrictions on schedules", 
            image:"/restrictions.png"})} 
            sx={{cursor:"pointer", mb:"1rem", mx:"auto", mt:"1rem"}} className={classes.ourSysBox} >
              <img src="/restrictions.png" height={200} width={200} alt="HelloImage"/>
              <Typography  variant="body1" gutterBottom component="div" align="center" className={classes.blackBoldTextColor} >
                Step 1 
              </Typography>
            </Box>
            <Box onClick={() => setSelectedPrevention({label:"Step 2: Scanning of RFID for schedule checking", 
            image:"/scan-id.png"})}
            sx={{cursor:"pointer", mb:"1rem", mx:"auto", mt:"1rem"}} className={classes.ourSysBox}>
              <img src="/scan-id.png" height={200} width={200} alt="HelloImage"/>
              <Typography  variant="body1" gutterBottom component="div" align="center" className={classes.blackBoldTextColor} >
                Step 2 
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3}>
            <Box onClick={() => setSelectedPrevention({label:"Step 3:Scans temperature and storing it in the database", 
            image:"/temperature.png"})}
            sx={{cursor:"pointer", mb:"1rem", mx:"auto", mt:"1rem"}} className={classes.ourSysBox}>
              <img src="/temperature.png" height={200} width={200} alt="HelloImage"/>
              <Typography  variant="body1" gutterBottom component="div" align="center" className={classes.blackBoldTextColor} >
                Step 3 
              </Typography>
            </Box>
            <Box onClick={() => setSelectedPrevention({label:"Step 4: Notifies and warns  user when exceeding scheduled time of stay", 
            image:"/notify.png"})}
            sx={{cursor:"pointer", mb:"1rem", mx:"auto", mt:"1rem"}} className={classes.ourSysBox}>
              <img src="/notify.png" height={200} width={200} alt="HelloImage"/>
              <Typography  variant="body1" gutterBottom component="div" align="center" className={classes.blackBoldTextColor} >
                Step 4 
              </Typography>
            </Box>
            </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} >
            <Box sx={{width: "300px", mb:"1rem",mt:"1rem", mx:"auto",}} >
              <img src={selectedPrevention.image} height={300} width={300} alt="HelloImage"/>   
            </Box>
            <Box>
              <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
                {selectedPrevention.label}
              </Typography>
            </Box>
          </Grid>
      </Grid>
    </Container>


    {/* 4th Section: Features */}
    <Container id="features" sx={{ mt: "4rem"}} >
      <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
            Features
      </Typography>
      <Grid container sx={{width: '100%'}} >
        <Grid item xs={12} justifyContent="center" alignItems="center" sm={6} md={4} lg={3} >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <AccessTimeFilledIcon sx={{ fontSize: 50, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"2rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                  Real-time Data Stream.
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <WebhookIcon sx={{ fontSize: 50, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"1rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Seamless integration of web, mobile, raspberry application, and sensors 
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <HomeWorkIcon sx={{ my: "5px", mx: "6px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"1rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Smart Scheduling system that limits overcrowding of the campus
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <CloudIcon sx={{ my: "3px", mx: "4px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"1rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Reliable cloud infrastructures 
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <HttpsIcon sx={{ my: "3px", mx: "4px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"1rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Secured API endpoints and Request validations
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <MobileFriendlyIcon sx={{ my: "5px", mx: "5px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"1rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Consistent design system for mobile and web applications
              </Typography>
          </Box> 
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <DesignServicesIcon sx={{my: "5px", mx: "4px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"1rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Responsive web and mobile design
              </Typography>
          </Box> 
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={3} justifyContent="center" alignItems="center"  >
          <Box sx={{mx: "auto", mt:"2rem"}} className={classes.featuresBox}>
            <Box sx={{mx:"1rem", mt: "1rem"}} className={classes.smallIconShape}>
              <DeviceThermostatIcon sx={{ my: "5px", mx: "4px", fontSize: 40, align: "center" }} className={classes.smallIcon} alt="Feature One"/>
            </Box > 
              <Typography sx={{mt:"1rem", mx:"1rem"}} className= {classes.blackTextColor} variant="body1" gutterBottom component="div" >
                Utilizes industry standard temperature sensor
              </Typography>
          </Box> 
        </Grid>
      </Grid>
    </Container>

   {/* 5th Section: Tech Stack  */}
  <Container id="techstack" sx={{width:'400', maxWidth:"100%", mt:"4rem", pt: "1rem", pb:"1rem",  borderRadius: '30px',}}>
    <Typography sx={{mt:"1rem"}}  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
     Teck Stack
    </Typography>
    <Carousel 
      indicators={false}
      className="techstack"
      axis="horizontal|vertical"
    >{
      items.map( (item, i) => 
      <Grid container sx={{maxWidth: '100%',  mx:"auto" }} spacing={4} >
            {
              item.map( (tech, i) => 
              <Grid item xs={12} sx={{p:"0"}} sm={12} md={4} lg={3}>
                <Box sx={{width:"300px", maxWidth:"100%", background:"white", borderRadius:"10px"}}>
                  <Card sx={{maxWidth: 200, mx:"auto" }}  class="card-media">
                    <CardMedia sx={{borderRadius: '6px'}} 
                        component="img"
                        height="150px"
                        image={tech.image}
                        alt={tech.name}
                      />
                      <CardContent sx={{ height: "3rem"}} align="center" className={classes.blackTextColor}>
                        <Typography sx={{mt: "1rem"}} gutterBottom variant="body2" component="div">
                          {tech.name}
                        </Typography>
                    </CardContent>
                  </Card>
            </Box>
          </Grid> 
            )}
      </Grid>
       )}
    </Carousel>
  </Container>


   {/* 6th Section: Our Team */}
    <Container id="ourteam" sx={{ mt: "20px"}} >
      <Typography  variant="h4" gutterBottom component="div" align="center" className={classes.primaryTextColor} >
           Our Team
      </Typography>
      <Typography sx={{ mt: "2rem", mb:"1rem"}} variant="body2" gutterBottom component="div" align="center" className={classes.blackTextColor} >
        Est scelerisque purus tempor, arcu lorem dolor. Erat odio nisl, egestas ac phasellus orci. 
        Morbi in viverra pellentesque sit massa consequat adipiscing orci, lectus. 
        Iaculis pharetra non at consectetur urna mauris vestibulum amet. 
      </Typography>
      <Grid container sx={{maxWidth: '100%', mt:"2rem", mx:"1rem"}}>
          <Grid item xs={12} sm={4} md={6} lg={3} >
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
          <Grid xs={12} sm={4} md={6} lg={3} >
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
          <Grid item xs={12} sm={4} md={6} lg={3}>
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
          <Grid item xs={12} sm={4} md={6} lg={3} >
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

    {/* Footer */}
    <Box sx={{maxWidth:"100%", maxHeight:"100%", backgroundColor:"#00838f", mt:"2rem"}} >
      <Box sx={{
      pt:"1rem", 
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      }} 
      >
      <Typography sx={{mx:"1rem"}} ariant="caption" gutterBottom component="div">
            <a href="https://google.com" target="_blank"
            rel="noreferrer noopener" 
            style={{ textDecoration: 'none' }} 
            className={classes.whiteTextColor}>About Us
            </a>
          </Typography>
          <Typography sx={{mx:"1rem"}} ariant="caption" gutterBottom component="div">
            <a href="https://google.com" target="_blank"
            rel="noreferrer noopener" 
            style={{ textDecoration: 'none' }} 
            className={classes.whiteTextColor}>Terms and Conditions
            </a>
          </Typography>
          <Typography sx={{mx:"1rem"}} ariant="caption" gutterBottom component="div">
            <a href="https://google.com" target="_blank"
            rel="noreferrer noopener" 
            style={{ textDecoration: 'none' }} 
            className={classes.whiteTextColor}>Privacy Policy
            </a>
          </Typography>
          <Typography sx={{mx:"1rem"}} ariant="caption" gutterBottom component="div">
            <a href="https://google.com" target="_blank"
            rel="noreferrer noopener" 
            style={{ textDecoration: 'none' }} 
            className={classes.whiteTextColor}>Contact Us
            </a>
          </Typography>
        </Box>
      <Box textAlign="center">
        <footer>
          <Typography  sx={{mt:"6px"}} target="google.com" ariant="body2" className={classes.whiteTextColor}>
            Ⓒ Safe and Smart Campus, All rights reserved.
          </Typography>
        </footer>
    </Box>
  </Box>

     
</Box>

  )}

export default LandingPage