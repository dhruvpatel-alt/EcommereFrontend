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
function TermCondition() {
    const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h4" component="h1" className={classes.heading}>
        Terms and Conditions
      </Typography>
      <Typography variant="body1" component="p">
        These terms and conditions apply to the use of our ecommerce website. By using our website, you agree to these terms and conditions. If you do not agree to these terms and conditions, please do not use our website.
      </Typography>
      <Typography variant="h5" component="h2" className={classes.sectionHeading}>
        Use of Our Website
      </Typography>
      <Typography variant="body1" component="p">
        You may use our website only for lawful purposes and in accordance with these terms and conditions. You agree not to use our website:
        <ul>
          <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
          <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information, or otherwise.</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
          <li>To impersonate or attempt to impersonate us, our employees, another user, or any other person or entity.</li>
          <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of our website, or which, as determined by us, may harm us or users of our website, or expose them to liability.</li>
        </ul>
      </Typography>
      <Typography variant="h5" component="h2" className={classes.sectionHeading}>
        Intellectual Property Rights
      </Typography>
      <Typography variant="body1" component="p">
        Our website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof), are owned by us, our licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
      </Typography>
      <Typography variant="h5" component="h2" className={classes.sectionHeading}>
        Disclaimer of Warranties
      </Typography>
      <Typography variant="body1" component="p">
        Our website is provided "as is" and "as available" without any representations or warranties, express or implied. We make no representations or warranties in relation to our website or the information and materials provided on our website.
      </Typography>
      <Typography variant="h5" component="h2" className={classes.sectionHeading}>
        Limitation of Liability
      </Typography>
      <Typography variant="body1" component="p">
        In no event will we be liable for any direct, indirect, incidental, consequential, special, exemplary, or typescript
Copy code
punitive damages, including but not limited to damages for loss of profits, revenue, data, or other intangible losses, resulting from your use of our website or any content posted on our website, even if we have been advised of the possibility of such damages.
      </Typography>
      <Typography variant="h5" component="h2" className={classes.sectionHeading}>
        Indemnification
      </Typography>
      <Typography variant="body1" component="p">
        You agree to indemnify, defend, and hold harmless us and our affiliates, licensors, and service providers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these terms and conditions or your use of our website, including, but not limited to, any use of our website's content, services, and products other than as expressly authorized in these terms and conditions.
      </Typography>
      <Typography variant="h5" component="h2" className={classes.sectionHeading}>
        Changes to These Terms and Conditions
      </Typography>
      <Typography variant="body1" component="p">
        We reserve the right, in our sole discretion, to update, modify, or replace these terms and conditions at any time without prior notice. Your continued use of our website after any such changes constitutes your acceptance of the new terms and conditions.
      </Typography>
      <Typography variant="h5" component="h2" className={classes.sectionHeading}>
        Contact Information
      </Typography>
      <Typography variant="body1" component="p">
        If you have any questions about these terms and conditions or our website, please contact us at varx4coder@gmail.com.
      </Typography>
    </div>
  )
}

export default TermCondition