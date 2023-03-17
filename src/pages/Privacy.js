import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
  sectionHeading: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
}));

function Privacy() {
    const classes = useStyles();
  return (
    <div className={classes.container}>
    <Typography variant="h4" component="h1" className={classes.heading}>
      Privacy Policy
    </Typography>
    <Typography variant="body1" component="p">
      This privacy policy applies to the use of our ecommerce website. We take your privacy seriously and are committed to protecting your personal information. Please read this privacy policy carefully to understand how we collect, use, and share your information.
    </Typography>
    <Typography variant="h5" component="h2" className={classes.sectionHeading}>
      Information We Collect
    </Typography>
    <Typography variant="body1" component="p">
      We collect information about you when you register on our website, place an order, or subscribe to our newsletter. This information may include your name, email address, phone number, shipping address, billing address, and payment information.
    </Typography>
    <Typography variant="h5" component="h2" className={classes.sectionHeading}>
      How We Use Your Information
    </Typography>
    <Typography variant="body1" component="p">
      We use your information to process your orders, communicate with you about your orders, and send you promotional emails if you have opted in to our newsletter. We may also use your information to improve our website and services.
    </Typography>
    <Typography variant="h5" component="h2" className={classes.sectionHeading}>
      Sharing Your Information
    </Typography>
    <Typography variant="body1" component="p">
      We may share your information with third-party service providers who help us operate our website and process your orders. We may also share your information if required by law or in response to a court order or other legal request.
    </Typography>
    <Typography variant="h5" component="h2" className={classes.sectionHeading}>
      Security
    </Typography>
    <Typography variant="body1" component="p">
      We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, we cannot guarantee that your information will be completely secure.
    </Typography>
    <Typography variant="h5" component="h2" className={classes.sectionHeading}>
      Changes to This Privacy Policy
    </Typography>
    <Typography variant="body1" component="p">
      We may update this privacy policy from time to time. Any changes will be posted on our website, and we encourage you to review this policy periodically.
    </Typography>
    <Typography variant="h5" component="h2" className={classes.sectionHeading}>
      Contact Us
    </Typography>
    <Typography variant="body1" component="p">
      If you have any questions or concerns about this privacy policy or our use of your information, please contact us at varx4code@gmail.com.
    </Typography>
    </div>
  )
}

export default Privacy