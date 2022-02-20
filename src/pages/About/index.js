import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import Page from 'material-ui-shell/lib/containers/Page'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import Link from '@mui/material/Link';

import LinkIcon from '@mui/icons-material/Link';
// Socmed icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { fontSize } from '@mui/system'

const About = () => {
  const [source, setSource] = useState(null)
  const intl = useIntl()
  

  const loadData = async () => {
    const data = await fetch(
      // 'https://raw.githubusercontent.com/TarikHuber/react-most-wanted/master/README.md'
    )
    const text = await data.text()
    setSource(text)
  }

  useEffect(() => {
    loadData()
  }, [])

  const useStyles = makeStyles({
    linkIcon:{
      color: "#00838f",
     
    },
    linkText:{
      color: "#00838f",
      textDecoration: "none",
      fontSize: "14px"
    },
    socmedIcon:{
      color: "#00838f",
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
  });

  const classes = useStyles();

  return (
    
    <Page
      pageTitle={intl.formatMessage({ id: 'about', defaultMessage: 'About' })}
    >
      <Scrollbar>
        
        <div >
          {source && (
            <ReactMarkdown className="markdown-body" children={source} />
          )}
            <Box textAlign="center">
              <Typography sx={{mt: "2rem"}} variant="h4" gutterBottom component="div">
              About
              </Typography>
            </Box>
            <Box textAlign="justify" sx={{mx: "3rem"}}>
              <Typography sx={{mt: "1rem", mx:"auto"}} variant="body2" gutterBottom component="div">
              Eventually, face-to-face classes will be gradually reimplemented. The reopening of face-to-face classes must be carefully planned to protect the health of students and faculties (Sarmiento et al., 2021). 
              According to the recommendation of the Department of Education, the COVID-19 risk factors should be highly considered on reopening of classes. 
              Areas with Modified General Community Quarantine (MGCQ) may have some level of opening of face to-face classes. 
              However, Secretary Briones added that quarantine classification should be the only considerations (Briones, 2020, p. 4). 
              The Commission on Higher Education (CHED) released a joint memorandum with the Department of Health (DOH) stating that the face-to- face class must meet the minimum public health standards. 
              It includes the reduction of transmission, contact, and duration of infection. They also emphasized that the face-to-face classes are not mandatory. 
              The students have the right to choose flexible learning (Briones, 2020). Furthermore, the distribution of Covid-19 vaccines may contribute to the possibility of gradually implementing limited face-to-face classes.
              </Typography>
              <Typography sx={{mt: "1rem", mx:"auto"}} variant="body2" gutterBottom component="div">
              HEIs that will conduct limited face-to-face classes should have reliable system that the faculties and students could rely on. Managing hundreds or even thousands of students could be challenging for the institutions. 
              Thus, this system aims to provide technologies to help on systematically implementing minimum public health standards and face-to-face classes specific protocols from various recognized institutions. 
              </Typography>
              <Typography sx={{mt: "1rem", mx:"auto"}} variant="body2" gutterBottom component="div">
              The scheduling and monitoring system of this study aims to reduce the contact. With limited number of people inside a room or establishment, the rate of transmission is significantly reduced in case one of the persons inside caries a virus. 
              It could also serve as a tool for the administrators of the campus to have an overview on the status of implementing health protocols for face-to-face classes. 
              </Typography>
              </Box>
              <Box 
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  mx:"3rem"
                }}
              >
                <Box sx={{mt: "1rem"}}>
                  <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                  }}>
                      <LinkIcon className={classes.linkIcon} sx={{mr:"1rem"}} />
                      <span><a href="https://www.sscsystem.tech/privacy-policy.pdf" target="_blank"
                      rel="noreferrer noopener" className={classes.linkText}>Privacy Policy
                      </a></span>
                  </div>  
                </Box>
                <Box sx={{mt: "1rem"}}>
                  <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                  }}>
                      <LinkIcon className={classes.linkIcon} sx={{mr:"1rem"}} />
                      <span><a href="https://www.sscsystem.tech/terms-of-service.pdf" target="_blank"
                      rel="noreferrer noopener"className={classes.linkText}>Terms of Service
                      </a></span> 
                  </div>  
                </Box>
              </Box>
              <Box textAlign="center">
              <Typography sx={{mt: "2rem"}} variant="h4" gutterBottom component="div">
              Developers
              </Typography>
              </Box>
              <Container sx={{ mt: "20px"}} >
                <Grid container sx={{maxWidth: "100%", mt:"2rem", mx:"auto"}}>
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
          <Box textAlign="center" sx={{mt: "2rem"}}>
            <Typography sx={{mt: "2rem"}} variant="h4" gutterBottom component="div">
            Our Repository Links
            </Typography>
          </Box>
          <Box 
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  mx:"3rem",
                  mb:"2rem"
                }}
              >
                <Box sx={{mt: "1rem" }}>
                  <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                  }}>
                      <LinkIcon className={classes.linkIcon} sx={{mr:"1rem"}} />
                      <span><a href="https://github.com/alladinmelico/ssc-frontend" target="_blank"
                      rel="noreferrer noopener" className={classes.linkText}>Front-end
                      </a></span>
                  </div>  
                </Box>
                <Box sx={{mt: "1rem"}}>
                  <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                  }}>
                      <LinkIcon className={classes.linkIcon} sx={{mr:"1rem"}} />
                      <span><a href="https://github.com/alladinmelico/capstone" target="_blank"
                      rel="noreferrer noopener"className={classes.linkText}>Back-end
                      </a></span> 
                  </div>  
                </Box>
                <Box sx={{mt: "1rem"}}>
                  <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                  }}>
                      <LinkIcon className={classes.linkIcon} sx={{mr:"1rem"}} />
                      <span><a href="https://github.com/alladinmelico/capstone-raspberry" target="_blank"
                      rel="noreferrer noopener"className={classes.linkText}>Raspberry Pi
                      </a></span> 
                  </div>  
                </Box>
                <Box sx={{mt: "1rem"}}>
                  <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                  }}>
                      <LinkIcon className={classes.linkIcon} sx={{mr:"1rem"}} />
                      <span><a href="https://github.com/alladinmelico/Capstone-Android" target="_blank"
                      rel="noreferrer noopener"className={classes.linkText}>Mobile
                      </a></span> 
                  </div>  
                </Box>
                
              </Box>
              
              
              

                      
               
                
  
        </div>

      </Scrollbar>

      
    </Page>
  )
}
export default About
