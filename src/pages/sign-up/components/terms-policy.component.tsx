import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Link from '@mui/material/Link';
import React from 'react';

export default function TermsPolicy() {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState('terms');
  const handleClickOpen = (contentType: string) => () => {
    setOpen(true);
    setContent(contentType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ textAlign: 'left' }}>
      <span>I accept the </span>
      <Link sx={{ mx: 0.2 }} onClick={handleClickOpen('terms')}>
        Terms of Service
      </Link>
      <span>and</span>
      <Link sx={{ mx: 0.2 }} onClick={handleClickOpen('policy')}>
        Privacy Policy
      </Link>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {/* <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle> */}
        <DialogContent dividers>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
            {content === 'terms' ? <Terms /> : <Policy />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Terms() {
  return (
    <div data-mercury="full" id="terms_page_content">
      <h1>Terms of Service</h1>
      <p>Last updated:&nbsp;April 28, 2023.</p>
      <p>
        Please read these terms of service carefully before using Our Service.
      </p>
      <h1>1 - Interpretation and Definitions</h1>
      <h2>1.1 - Interpretation</h2>
      <p>
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in the singular
        or in the plural.
      </p>
      <h2>1.2 - Definitions</h2>
      <p>For the purposes of these Terms of Service:</p>
      <ul>
        <li>
          <p>
            Account&nbsp;means a unique account created for You to access our
            Service or parts of our Service.
          </p>
        </li>
        <li>
          <p>
            Affiliate&nbsp;means an entity that controls, is controlled by, or
            is under common control with a party, where "control" means
            ownership of 50% or more of the shares, equity interest, or other
            securities entitled to vote for the election of directors or other
            managing authority.
          </p>
        </li>
        <li>
          <p>
            Application&nbsp;means the software program provided by the Company
            or Operator downloaded by You on any electronic device, named
            Feliciti.
          </p>
        </li>
        <li>
          <p>
            Buyer&nbsp;refers to users of the Service who are placing Orders for
            Goods.
          </p>
        </li>
        <li>
          <p>Country&nbsp;refers to&nbsp;United States of America.</p>
        </li>
        <li>
          <p>
            Company&nbsp;(referred to as either "the Company", "We", "Us" or
            "Our" in this Agreement) refers to&nbsp;Feliciti, www.feliciti.co.
          </p>
        </li>
        <li>
          <p>
            Content&nbsp;refers to content such as text, images, or other
            information that can be posted, uploaded, linked to, or otherwise
            made available by You, regardless of the form of that content.
          </p>
        </li>
        <li>
          <p>
            Device&nbsp;means any device that can access the Service such as a
            computer, a cell phone, or a digital tablet.
          </p>
        </li>
        <li>
          <p>
            Feedback&nbsp;means feedback, innovations, or suggestions sent by
            You regarding the attributes, performance, or features of our
            Service.
          </p>
        </li>
        <li>
          <p>
            Good&nbsp;refers to the items or services offered for sale, rental,
            auction, contact, or any other means of trading on the Service.
          </p>
        </li>
        <li>
          <p>
            Operator&nbsp;(referred to as either "the Operator", "We", "Us" or
            "Our" in this Agreement) refers to&nbsp;Feliciti.
          </p>
        </li>
        <li>
          <p>
            Order&nbsp;means a request by You to purchase or trade by any means
            Goods on the Application or Website.
          </p>
        </li>
        <li>
          <p>
            Seller&nbsp;refers to users of the Service who are listing Goods and
            making them available for trade by any means.
          </p>
        </li>
        <li>
          <p>Service&nbsp;refers to the Application or the Website or both.</p>
        </li>
        <li>
          <p>
            Terms of Service&nbsp;(also referred to as "Terms") mean these Terms
            of Service that form the entire agreement between You and the
            Company or Operator regarding the use of the Service. This Terms of
            Service agreement was generated by&nbsp;
            <a href="https://www.termsfeed.com/">TermsFeed</a>&nbsp;and
            fine-tuned by Sharetribe.
          </p>
        </li>
        <li>
          <p>
            Third-party Social Media Service&nbsp;means any services or content
            (including data, information, products, or services) provided by a
            third party that may be displayed, included, or made available by
            the Service.
          </p>
        </li>
        <li>
          <p>
            Website&nbsp;refers to&nbsp;Feliciti, accessible
            from&nbsp;www.feliciti.co.
          </p>
        </li>
        <li>
          <p>
            You&nbsp;means the individual accessing or using the Service, or the
            company, or other legal entity on behalf of which such individual is
            accessing or using the Service, as applicable.
          </p>
        </li>
      </ul>
      <h1>2 - Contact Us</h1>
      <p>
        If you have any questions about these Terms of Service, You can contact
        us:
      </p>
      <ul>
        <li>
          <p>By email:&nbsp;oskar.at.feliciti@gmail.com</p>
        </li>
        <li>
          <p>
            By visiting this page on our
            website:&nbsp;https://feliciti.com/user_feedbacks/new
          </p>
        </li>
      </ul>
      <h1>3 - Acknowledgment</h1>
      <p>
        These are the Terms of Service governing the use of this Service and the
        agreement that operates between You and the Company or Operator. These
        Terms of Service set out the rights and obligations of all users
        regarding the use of the Service.
      </p>
      <p>
        Your access to and use of the Service is conditioned on Your acceptance
        of and compliance with these Terms of Service. These Terms of Service
        apply to all visitors, users, and others who access or use the Service.
      </p>
      <p>
        By accessing or using the Service You agree to be bound by these Terms
        of Service. If You disagree with any part of these Terms of Service then
        You may not access the Service.
      </p>
      <p>
        You represent that you are over the age of majority according to the
        laws of your country or the Country, whichever is higher. The Company or
        Operator does not permit those under that age to use the Service.
      </p>
      <p>
        Your access to and use of the Service is also conditioned on Your
        acceptance of and compliance with the Privacy Policy of the Company or
        Operator. Our Privacy Policy describes Our policies and procedures on
        the collection, use, and disclosure of Your personal information when
        You use the Application or Website and tells You about Your privacy
        rights and how the law protects You. Please read Our Privacy Policy
        carefully before using Our Service.
      </p>
      <h1>4 - Governing Law</h1>
      <p>
        The laws of the Country, excluding its conflicts of law rules, shall
        govern these Terms and Your use of the Service. Your use of the
        Application or Website may also be subject to other local, state,
        national, or international laws.
      </p>
      <h2>4.1 - For European Union (EU) Users</h2>
      <p>
        If You are a European Union consumer, you will benefit from any
        mandatory provisions of the law of the country in which you are
        resident.
      </p>
      <h2>4.2 - United States Legal Compliance</h2>
      <p>
        You represent and warrant that (i) You are not located in a country that
        is subject to the United States government embargo, or that has been
        designated by the United States government as a "terrorist supporting"
        country, and (ii) You are not listed on any United States government
        list of prohibited or restricted parties.
      </p>
      <h2>4.3 - Severability</h2>
      <p>
        If any provision of these Terms is held to be unenforceable or invalid,
        such provision will be changed and interpreted to accomplish the
        objectives of such provision to the greatest extent possible under
        applicable law and the remaining provisions will continue in full force,
        and effect.
      </p>
      <h2>4.4 - Waiver</h2>
      <p>
        Except as provided herein, the failure to exercise a right or to require
        the performance of an obligation under these Terms shall not affect a
        party's ability to exercise such right or require such performance at
        any time thereafter nor shall the waiver of a breach constitute a waiver
        of any subsequent breach.
      </p>
      <h1>5 - User Accounts</h1>
      <h2>5.1 - Account Creation</h2>
      <p>
        When You create an account with Us, You must provide Us with information
        that is accurate, complete, and current at all times. Failure to do so
        constitutes a breach of the Terms, which may result in immediate
        termination of Your account on Our Service.
      </p>
      <p>
        You may not use as a username the name of another person or entity or
        that is not lawfully available for use, a name or trademark that is
        subject to any rights of another person or entity other than You without
        appropriate authorization, or a name that is otherwise offensive, vulgar
        or obscene.
      </p>
      <h2>5.2 - Account Information</h2>
      <p>
        You may be asked to supply certain information relevant to Your Account
        including, without limitation, Your name, Your email, Your phone number,
        and Your address.
      </p>
      <p>
        You may have to provide documents to comply with identity verification.
      </p>
      <p>
        Before or during posting Goods, you may be asked to supply, without
        limitation, Your bank account details, and Your identity documents.
      </p>
      <p>
        Before or during placing an Order, you may be asked to supply, without
        limitation, Your credit card number, the expiration date of Your credit
        card, Your billing address, and Your shipping information.
      </p>
      <h2>5.3 - Account Review</h2>
      <p>
        Unless part of a feature of the Service, We do not perform background
        checks or endorse any users. We do not accept any responsibility for the
        reliability, accuracy, and completeness of any information provided by
        users.
      </p>
      <h2>5.4 - Account Password</h2>
      <p>
        You are responsible for safeguarding the password that You use to access
        the Service and for any activities or actions under Your password,
        whether Your password is with Our Service or a Third-Party Social Media
        Service.
      </p>
      <p>
        You agree not to disclose Your password to any third party. You must
        notify Us immediately upon becoming aware of any breach of security or
        unauthorized use of Your account.
      </p>
      <h2>5.5 - Account Termination</h2>
      <p>
        We may terminate or suspend Your Account immediately, without prior
        notice or liability, for any reason whatsoever, including without
        limitation if You breach these Terms of Service. Upon termination, Your
        right to use the Service will cease immediately.
      </p>
      <p>
        If You wish to terminate Your Account, You may simply discontinue using
        the Service or delete Your Account from the Service, or contact Us for
        help.
      </p>
      <h1>6 - Content</h1>
      <h2>6.1 - Your Right to Post Content</h2>
      <p>
        Our Service allows You to post Content. You are responsible for the
        Content that You post to the Service, including its legality,
        reliability, and appropriateness.
      </p>
      <p>
        By posting Content to the Service, You grant Us the right and license to
        use, modify, publicly perform, publicly display, reproduce, and
        distribute such Content on and through the Service. You retain any and
        all of Your rights to any Content You submit, post, or display on or
        through the Service and You are responsible for protecting those rights.
        You agree that this license includes the right for Us to make Your
        Content available to other users of the Service, who may also use Your
        Content subject to these Terms.
      </p>
      <p>
        You represent and warrant that: (i) the Content is Yours (You own it) or
        You have the right to use it and grant Us the rights and license as
        provided in these Terms, and (ii) the posting of Your Content on or
        through the Service does not violate the privacy rights, publicity
        rights, copyrights, contract rights or any other rights of any person.
      </p>
      <h2>6.2 - Content Restrictions</h2>
      <p>
        The Company or Company or Operator is not responsible for the content of
        the Service's users. You expressly understand and agree that You are
        solely responsible for the Content and for all activity that occurs
        under your account, whether done so by You or any third person using
        Your account.
      </p>
      <p>
        You may not transmit any Content that is unlawful, offensive, upsetting,
        intended to disgust, threatening, libelous, defamatory, obscene, or
        otherwise objectionable. Examples of such objectionable Content include,
        but are not limited to, the following:
      </p>
      <ul>
        <li>
          <p>Unlawful or promoting unlawful activity.</p>
        </li>
        <li>
          <p>
            Defamatory, discriminatory, or mean-spirited content, including
            references or commentary about religion, race, sexual orientation,
            gender, national/ethnic origin, or other targeted groups.
          </p>
        </li>
        <li>
          <p>
            Spam, machine, or randomly–generated, constituting unauthorized or
            unsolicited advertising, chain letters, any other form of
            unauthorized solicitation, or any form of lottery or gambling.
          </p>
        </li>
        <li>
          <p>
            Containing or installing any viruses, worms, malware, trojan horses,
            or other content that is designed or intended to disrupt, damage, or
            limit the functioning of any software, hardware, or
            telecommunications equipment or to damage or obtain unauthorized
            access to any data or other information of a third person.
          </p>
        </li>
        <li>
          <p>
            Infringing on any proprietary rights of any party, including patent,
            trademark, trade secret, copyright, right of publicity, or other
            rights.
          </p>
        </li>
        <li>
          <p>
            Impersonating any person or entity including the Company or Operator
            and its employees or representatives.
          </p>
        </li>
        <li>
          <p>Violating the privacy of any third person.</p>
        </li>
        <li>
          <p>False information and features.</p>
        </li>
      </ul>
      <p>
        The Company or Operator reserves the right, but not the obligation, to,
        in its sole discretion, determine whether or not any Content is
        appropriate and complies with these Terms, refuse or remove this
        Content. The Company or Operator further reserves the right to make
        formatting and edits and change the manner of any Content. The Company
        or Operator can also limit or revoke the use of the Service if You post
        such objectionable Content. As the Company or Operator cannot control
        all content posted by users and/or third parties on the Service, you
        agree to use the Service at your own risk. You understand that by using
        the Service You may be exposed to content that You may find offensive,
        indecent, incorrect, or objectionable, and You agree that under no
        circumstances will the Company or Operator be liable in any way for any
        content, including any errors or omissions in any content, or any loss
        or damage of any kind incurred as a result of your use of any content.
      </p>
      <h2>6.3 - Content Backups</h2>
      <p>
        Although regular backups of Content are performed, the Company or
        Operator does not guarantee there will be no loss or corruption of data.
      </p>
      <p>
        Corrupt or invalid backup points may be caused by, without limitation,
        Content that is corrupted prior to being backed up or that changes
        during the time a backup is performed.
      </p>
      <p>
        The Company or Operator will provide support and attempt to troubleshoot
        any known or discovered issues that may affect the backups of Content.
        But You acknowledge that the Company or Operator has no liability
        related to the integrity of Content or the failure to successfully
        restore Content to a usable state.
      </p>
      <p>
        You agree to maintain a complete and accurate copy of any Content in a
        location independent of the Service.
      </p>
      <h2>6.4 - Intellectual Property of Others and Copyright Infringement</h2>
      <p>
        We respect the intellectual property and copyrights of others. You may
        be held accountable for damages (including costs and attorneys' fees)
        for misrepresenting that any Content is infringing Your copyright. It is
        Our policy to respond to any claim that Content posted on the Service
        infringes a copyright or other intellectual property infringement of any
        person.
      </p>
      <p>
        We are ready to comply with local regulations in that matter (Digital
        Millennium Copyright Act (DMCA), EU Copyright Directive, ...).
      </p>
      <p>
        If You are a copyright owner or authorized on behalf of one, and You
        believe that the copyrighted work has been copied in a way that
        constitutes copyright infringement that is taking place through the
        Service, You must submit Your notice in writing to the attention of our
        copyright agent via email (see 3 - Contact Us) and include in Your
        notice the following information related to the alleged infringement:
      </p>
      <ul>
        <li>
          <p>
            An electronic or physical signature of the person authorized to act
            on behalf of the owner of the copyright's interest.
          </p>
        </li>
        <li>
          <p>
            A description of the copyrighted work that You claim has been
            infringed, including the URL (i.e., web page address) of the
            location where the copyrighted work exists or a copy of the
            copyrighted work.
          </p>
        </li>
        <li>
          <p>
            Identification of the URL or other specific location on the Service
            where the material that You claim is infringing is located.
          </p>
        </li>
        <li>
          <p>Your address, telephone number, and email address.</p>
        </li>
        <li>
          <p>
            A statement by You that You have a good faith belief that the
            disputed use is not authorized by the copyright owner, its agent, or
            the law.
          </p>
        </li>
        <li>
          <p>
            A statement by You, made under penalty of perjury, that the above
            information in Your notice is accurate and that You are the
            copyright owner or authorized to act on the copyright owner's
            behalf.
          </p>
        </li>
      </ul>
      <p>
        Upon receipt of a notification, the Company or Operator will take
        whatever action, in its sole discretion, it deems appropriate, including
        removal of the challenged content from the Service.
      </p>
      <h1>7 - Orders of Goods</h1>
      <p>
        By placing an Order for Goods through the Service, You warrant that You
        are legally capable of entering into binding contracts.
      </p>
      <h2>7.1 - Position of the Service in Orders</h2>
      <p>
        Our role is one of a facilitator between You and the Sellers, using the
        Service. We are, therefore, a third party in Orders, which limits Our
        liabilities in any disputes between You and the Sellers.
      </p>
      <p>
        <br />
      </p>
      <p>
        We are not a party to any agreement You have with the Sellers. Any
        agreement You enter with the Sellers does not form a part of any
        agreement We have with you.
      </p>
      <h2>7.2 - Your Information as Buyer</h2>
      <p>
        If You wish to place an Order for Goods available on the Service, You
        may be asked to supply certain information relevant to Your Order
        including, without limitation, Your name, Your email, Your phone number,
        Your credit card number, the expiration date of Your credit card, Your
        billing address, and Your shipping information.
      </p>
      <p>
        You represent and warrant that: (i) You have the legal right to use any
        credit or debit card(s) or other payment method(s) in connection with
        any Order; and that (ii) the information You supply to us is true,
        correct, and complete.
      </p>
      <p>
        By submitting such information, You grant us the right to provide the
        information to payment processing third parties for purposes of
        facilitating the completion of Your Order.
      </p>
      <h2>7.3 - Availability, Errors, and Inaccuracies</h2>
      <p>
        We and Sellers are constantly updating Our offerings of Goods on the
        Service. The Goods available on the Service may be mispriced, described
        inaccurately, or unavailable, and Sellers and We may experience delays
        in updating information regarding the Goods on the Service and in Our
        advertising on other websites.
      </p>
      <p>
        We and Sellers cannot and do not guarantee the accuracy or completeness
        of any information, including prices, product images, specifications,
        availability, and services. We reserve the right to change or update
        information and to correct errors, inaccuracies, or omissions at any
        time without prior notice.
      </p>
      <h2>7.4 - Prices Policy</h2>
      <p>
        The Company or Operator and Seller reserve the right to revise their
        prices at any time prior to accepting an Order.
      </p>
      <p>
        The prices quoted may be revised by the Company or Operator subsequent
        to accepting an Order in the event of any occurrence affecting delivery
        caused by government action, variation in customs duties, increased
        shipping charges, higher foreign exchange costs, and any other matter
        beyond the control of the Company or Operator or the Seller. In that
        event, You will have the right to cancel Your Order.
      </p>
      <h2>7.5 - Payments</h2>
      <p>
        Payment can be made through various payment methods we have available.
        We rely on payment gateways that have their own terms of service and
        their own limitations.
      </p>
      <p>
        Payment cards (credit cards or debit cards) are subject to validation
        checks and authorization by Your card issuer. If we do not receive the
        required authorization, We will not be liable for any delay or
        non-delivery of Your Order.
      </p>
      <h2>7.6 - Service Fees</h2>
      <p>
        We may charge You some fees (and applicable Taxes) for the right to use
        the Service. More information about when service fees apply and how they
        are calculated is displayed during your Order. We reserve the right to
        change the service fees at any time.
      </p>
      <h2>7.7 - Order Modification</h2>
      <p>
        You and the Sellers are responsible for any Order modifications you
        agree to make via the Service and agree to pay any additional amounts,
        fees, or taxes associated with any Order modification.
      </p>
      <h2>7.8 - Order Cancellation</h2>
      <h3>7.8.1 - Our Order Cancellation Rights</h3>
      <p>
        We reserve the right to refuse or cancel Your Order at any time for
        certain reasons including but not limited to:
      </p>
      <ul>
        <li>
          <p>Goods availability</p>
        </li>
        <li>
          <p>Errors in the description or prices for Goods</p>
        </li>
        <li>
          <p>Errors in Your Order</p>
        </li>
        <li>
          <p>Mistakes from the Seller</p>
        </li>
      </ul>
      <p>
        We reserve the right to refuse or cancel Your Order if fraud or an
        unauthorized or illegal transaction or trade is suspected.
      </p>
      <h3>7.8.2 - Order Cancellation by Buyers</h3>
      <p>
        If You as a Buyer cancel an Order, the amount You paid (including the
        Service fees) is not refunded.
      </p>
      <p>
        If something outside Your control requires You to cancel an Order, or if
        You think your Order should be refunded, contact Us.
      </p>
      <h3>7.8.3 - Order Cancellation by Sellers</h3>
      <p>
        If You as a Seller cancel an Order, the amount the Buyer paid (including
        the Service fees) will be refunded to the Buyer and will not be
        transferred to the Seller.
      </p>
      <p>
        If something outside Your control requires You to cancel an Order, or if
        You think your Order should be refunded, contact Us.
      </p>
      <h2>7.9 - Order Dispute</h2>
      <p>
        If a Buyer or a Seller disputes an Order, the Company or Operator should
        be notified. The dispute will be resolved at Our sole discretion.
      </p>
      <h1>8 - Disclaimer of Warranties and Limitation of Liability</h1>
      <h2>8.1 - Limitation of Liability</h2>
      <p>
        Notwithstanding any damages that You might incur, the entire liability
        of the Company or Operator and any of its suppliers under any provision
        of this Terms and Your exclusive remedy for all of the foregoing shall
        be limited to the amount actually paid by You through the Service or 100
        USD (or its equivalent in the Service local currency)&nbsp; if You
        haven't purchased anything through the Service.
      </p>
      <p>
        To the maximum extent permitted by applicable law, in no event shall the
        Company or Operator or its suppliers be liable for any special,
        incidental, indirect, or consequential damages whatsoever (including,
        but not limited to, damages for loss of profits, loss of data or other
        information, for business interruption, for personal injury, loss of
        privacy arising out of or in any way related to the use of or inability
        to use the Service, third-party software and/or third-party hardware
        used with the Service, or otherwise in connection with any provision of
        this Terms), even if the Company or Operator or any supplier has been
        advised of the possibility of such damages and even if the remedy fails
        of its essential purpose.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion of implied warranties or
        limitation of liability for incidental or consequential damages, which
        means that some of the above limitations may not apply. In these
        jurisdictions, each party's liability will be limited to the greatest
        extent permitted by law.
      </p>
      <h2>8.2 - "AS IS" and "AS AVAILABLE" Disclaimer</h2>
      <p>
        The Service is provided to You "AS IS" and "AS AVAILABLE" and with all
        faults and defects without warranty of any kind. To the maximum extent
        permitted under applicable law, the Company or Operator, on its own
        behalf and on behalf of its Affiliates and its and their respective
        licensors and service providers, expressly disclaims all warranties,
        whether express, implied, statutory, or otherwise, with respect to the
        Service, including all implied warranties of merchantability, fitness
        for a particular purpose, title and non-infringement, and warranties
        that may arise out of the course of dealing, performance, usage or trade
        practice. Without limitation to the foregoing, the Company or Operator
        provides no warranty or undertaking, and makes no representation of any
        kind that the Service will meet Your requirements, achieve any intended
        results, be compatible or work with any other software, applications,
        systems, or services, operate without interruption, meet any performance
        or reliability standards or be error-free or that any errors or defects
        can or will be corrected.
      </p>
      <p>
        Without limiting the foregoing, neither the Company nor Operator nor any
        of the company's providers makes any representation or warranty of any
        kind, express or implied: (i) as to the operation or availability of the
        Service, or the information, content, and materials or products included
        thereon; (ii) that the Service will be uninterrupted or error-free;
        (iii) as to the accuracy, reliability, or currency of any information or
        content provided through the Service; or (iv) that the Service, its
        servers, the content, or e-mails sent from or on behalf of the Company
        or Operator are free of viruses, scripts, trojan horses, worms, malware,
        timebombs or other harmful components.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion of certain types of
        warranties or limitations on applicable statutory rights of a consumer,
        so some or all of the above exclusions and limitations may not apply to
        You. But in such a case the exclusions and limitations set forth in this
        section shall be applied to the greatest extent enforceable under
        applicable law.
      </p>
      <h2>8.3 - Links to Other Websites</h2>
      <p>
        Our Service may contain links to third-party websites or services that
        are not owned or controlled by the Company or Operator.
      </p>
      <p>
        The Company or Operator has no control over and assumes no
        responsibility for, the content, privacy policies, or practices of any
        third-party websites or services. You further acknowledge and agree that
        the Company or Operator shall not be responsible or liable, directly or
        indirectly, for any damage or loss caused or alleged to be caused by or
        in connection with the use of or reliance on any such content, goods, or
        services available on or through any such web sites or services.
      </p>
      <p>
        We strongly advise You to read the terms of service and privacy policies
        of any third-party websites or services that You visit.
      </p>
      <h2>8.4 - Translation Interpretation</h2>
      <p>
        These Terms of Service may have been translated if We have made them
        available to You on our Service. You agree that the original English
        text shall prevail in the case of a dispute.
      </p>
      <h1>9 - Disputes Resolution about the Service</h1>
      <p>
        If You have any concerns or disputes about the Service, You agree to
        first try to resolve the dispute informally by contacting the Company or
        Operator.
      </p>
      <h1>10 - Intellectual Property of the Service</h1>
      <p>
        The Service and its original content (excluding Content provided by You
        or other users), features, and functionality are and will remain the
        exclusive property of the Company or Operator and its licensors.
      </p>
      <p>
        The Service is protected by copyright, trademark, and other laws of both
        the Country and foreign countries.
      </p>
      <p>
        Our trademarks and trade dress may not be used in connection with any
        product or service without the prior written consent of the Company or
        Operator.
      </p>
      <h1>11 - Your feedback to Us</h1>
      <p>
        You assign all rights, title, and interest in any Feedback You provide
        the Company or Operator. If for any reason such assignment is
        ineffective, You agree to grant the Company or Operator a non-exclusive,
        perpetual, irrevocable, royalty-free, worldwide right and license to
        use, reproduce, disclose, sub-license, distribute, modify and exploit
        such Feedback without restriction.
      </p>
      <h1>12 - Changes to these Terms of Service</h1>
      <p>
        We reserve the right, at Our sole discretion, to modify or replace these
        Terms at any time. If a revision is material We will make reasonable
        efforts to provide at least 30 days notice prior to any new terms taking
        effect. What constitutes a material change will be determined at Our
        sole discretion.
      </p>
      <p>
        By continuing to access or use Our Service after those revisions become
        effective, You agree to be bound by the revised terms. If You do not
        agree to the new terms, in whole or in part, please stop using the
        Application or Website and the Service.
      </p>
    </div>
  );
}

function Policy() {
  return (
    <div>
      <h1>
        <span>Privacy Policy</span>
      </h1>
      <p>
        <span>Last updated:&nbsp;</span>April 28, 2023<span>.</span>
      </p>
      <p>
        <span>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </span>
      </p>
      <p>
        <span>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy. This Privacy Policy was generated
          by{' '}
        </span>
        <a href="https://www.termsfeed.com/%20rel=nofollow">
          <span>TermsFeed</span>
        </a>
        <span> and fine-tuned by Sharetribe.</span>
      </p>
      <p>
        <span>
          Please read this Privacy Policy carefully before using Our Service.
        </span>
      </p>
      <h1>
        <span>1 - Interpretation and Definitions</span>
      </h1>
      <h2>
        <span>1.1 - Interpretation</span>
      </h2>
      <p>
        <span>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in the
          singular or in the plural.
        </span>
      </p>
      <h2>
        <span>1.2 - Definitions</span>
      </h2>
      <p>
        <span>For the purposes of this Privacy Policy:</span>
      </p>
      <ul>
        <li>
          <p>
            <span>Account</span>
            <span>
              {' '}
              means a unique account created for You to access our Service or
              parts of our Service.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Affiliate</span>
            <span>
              means an entity that controls, is controlled by, or is under
              common control with a party, where "control" means ownership of
              50% or more of the shares, equity interest, or other securities
              entitled to vote for the election of directors or other managing
              authority.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Application</span>
            <span>
              {' '}
              means the software program provided by the Company or Operator
              downloaded by You on any electronic device, named{' '}
            </span>
            <span>Feliciti</span>
            <span>.</span>
          </p>
        </li>
        <li>
          <p>
            <span>Business</span>
            <span>
              refers to the Company or Operator as the legal entity that
              collects Consumers' personal information and determines the
              purposes and means of the processing of Consumers' personal
              information, or on behalf of which such information is collected
              and that alone, or jointly with others, determines the purposes
              and means of the processing of consumers' personal information.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Company</span>
            <span>
              {' '}
              (referred to as either "the Company", "We", "Us" or "Our" in this
              Agreement) refers to{' '}
            </span>
            <span>Feliciti</span>
            <span>, www.feliciti.co</span>
            <span>
              . For the purpose of the GDPR, the Company or Operator is the Data
              Controller.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Consumer</span>
            <span>, refers to You.</span>
          </p>
        </li>
        <li>
          <p>
            <span>Cookies</span>
            <span>
              {' '}
              are small files that are placed on Your computer, mobile device or
              any other device by a website, containing the details of Your
              browsing history on that website among its many uses.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Country</span>
            <span> refers to United States of America.</span>
            <span></span>
          </p>
        </li>
        <li>
          <p>
            <span>Data Controller</span>
            <span>
              , for the purposes of the GDPR (General Data Protection
              Regulation), refers to the Company or Operator as the legal person
              which alone or jointly with others determines the purposes and
              means of the processing of Personal Data.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Device</span>
            <span>
              {' '}
              means any device that can access the Service such as a computer, a
              cellphone, or a digital tablet.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Do Not Track</span>
            <span>
              (DNT) is a concept that has been promoted by US regulatory
              authorities, in particular the U.S. Federal Trade Commission
              (FTC), for the Internet industry to develop and implement a
              mechanism for allowing internet users to control the tracking of
              their online activities across websites.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Operator</span>
            <span>
              {' '}
              (referred to as either "the Operator", "We", "Us" or "Our" in this
              Agreement) refers to Feliciti
            </span>
            <span>
              . For the purpose of the GDPR, the Company or Operator is the Data
              Controller.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Personal Data</span>
            <span>
              {' '}
              is any information that relates to an identified or identifiable
              individual.
            </span>
            <span>
              <br />
            </span>
            <span>
              For the purposes of GDPR, Personal Data means any information
              relating to You such as a name, an identification number, location
              data, online identifier or to one or more factors specific to the
              physical, physiological, genetic, mental, economic, cultural or
              social identity. For the purposes of the CCPA, Personal Data means
              any information that identifies, relates to, describes or is
              capable of being associated with, or could reasonably be linked,
              directly or indirectly, with You.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Sale</span>
            <span>
              , means selling, renting, releasing, disclosing, disseminating,
              making available, transferring, or otherwise communicating orally,
              in writing, or by electronic or other means, a Consumer's personal
              information to another business or a third party for monetary or
              other valuable consideration.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Service</span>
            <span> refers to the Application or the Website or both.</span>
          </p>
        </li>
        <li>
          <p>
            <span>Service Provider</span>
            <span>
              means any natural or legal person who processes the data on behalf
              of the Company or Operator. It refers to third-party companies or
              individuals employed by the Company or Operator to facilitate the
              Service, to provide the Service on behalf of the Company or
              Operator, to perform services related to the Service or to assist
              the Company or Operator in analyzing how the Service is used. For
              the purpose of the GDPR, Service Providers are considered Data
              Processors.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Third-party Social Media Service</span>
            <span>
              {' '}
              refers to any website or any social network website through which
              a User can log in or create an account to use the Service.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Usage Data</span>
            <span>
              {' '}
              refers to data collected automatically, either generated by the
              use of the Service or from the Service infrastructure itself (for
              example, the duration of a page visit).
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Website</span>
            <span> refers to </span>
            <span>Feliciti</span>
            <span>, accessible from </span>
            <span>www.feliciti.co</span>
            <span>.</span>
          </p>
        </li>
        <li>
          <p>
            <span>You</span>
            <span>
              {' '}
              means the individual accessing or using the Service, or the
              company, or other legal entity on behalf of which such individual
              is accessing or using the Service, as applicable.
            </span>
            <span>
              <br />
            </span>
            <span>
              Under GDPR (General Data Protection Regulation), You can be
              referred to as the Data Subject or as the User as you are the
              individual using the Service.
            </span>
          </p>
        </li>
      </ul>
      <h1>
        <span>2 - Contact Us</span>
      </h1>
      <p>
        <span>
          If you have any questions about this Privacy Policy, You can contact
          us:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>By email: </span>
            <span>
              {/* {-- INSERT HERE THE EMAIL ADDRESS TO MESSAGE YOU --} */}
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>By visiting this page on our website: </span>
            <span>
              {/* {-- INSERT HERE THE URL OF YOUR CONTACT PAGE --} */}
            </span>
          </p>
        </li>
      </ul>
      <h1>
        <span>3 - Collecting and Using Your Personal Data</span>
      </h1>
      <h2>
        <span>3.1 - Types of Data Collected</span>
      </h2>
      <h3>
        <span>3.1.1 - Personal Data</span>
      </h3>
      <p>
        <span>
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is
          not limited to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Email address</span>
          </p>
        </li>
        <li>
          <p>
            <span>First name and last name</span>
          </p>
        </li>
        <li>
          <p>
            <span>Phone number</span>
          </p>
        </li>
        <li>
          <p>
            <span>Address, State, Province, ZIP/Postal code, City</span>
          </p>
        </li>
        <li>
          <p>
            <span>Bank account information</span>
          </p>
        </li>
        <li>
          <p>
            <span>Credit card number and expiration date</span>
          </p>
        </li>
        <li>
          <p>
            <span>Usage Data</span>
          </p>
        </li>
      </ul>
      <h3>
        <span>3.1.2 - Usage Data</span>
      </h3>
      <p>
        <span>
          Usage Data is collected automatically when using the Service.
        </span>
      </p>
      <p>
        <span>
          Usage Data may include information such as Your Device's Internet
          Protocol address (e.g. IP address), browser type, browser version, the
          pages of our Service that You visit, the time and date of Your visit,
          the time spent on those pages, unique device identifiers and other
          diagnostic data.
        </span>
      </p>
      <p>
        <span>
          When You access the Service by or through a mobile device, We may
          collect certain information automatically, including, but not limited
          to, the type of mobile device You use, Your mobile device unique ID,
          the IP address of Your mobile device, Your mobile operating system,
          the type of mobile Internet browser You use, unique device identifiers
          and other diagnostic data.
        </span>
      </p>
      <p>
        <span>
          We may also collect information that Your browser sends whenever You
          visit our Service or when You access the Service by or through a
          mobile device.
        </span>
      </p>
      <h3>
        <span>3.1.3 - Information from Third-Party Social Media Services</span>
      </h3>
      <p>
        <span>
          The Company or Operator may allow You to create an account and log in
          to use the Service through the following Third-party Social Media
          Services. These Third-party Social Media Services, may include, but is
          not limited to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Google</span>
          </p>
        </li>
        <li>
          <p>
            <span>Facebook</span>
          </p>
        </li>
        <li>
          <p>
            <span>Twitter</span>
          </p>
        </li>
        <li>
          <p>
            <span>LinkedIn</span>
          </p>
        </li>
        <li>
          <p>
            <span>Apple</span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          If You decide to register through or otherwise grant us access to a
          Third-Party Social Media Service, We may collect Personal data that is
          already associated with Your Third-Party Social Media Service's
          account, such as Your name, Your email address, Your activities or
          Your contact list associated with that account.
        </span>
      </p>
      <p>
        <span>
          You may also have the option of sharing additional information with
          the Company or Operator through Your Third-Party Social Media
          Service's account. If You choose to provide such information and
          Personal Data, during registration or otherwise, You are giving the
          Company or Operator permission to use, share, and store it in a manner
          consistent with this Privacy Policy.
        </span>
      </p>
      <h3>
        <span>3.1.4 - Tracking Technologies and Cookies</span>
      </h3>
      <p>
        <span>
          We use Cookies and similar tracking technologies to track the activity
          on Our Service and store certain information. Tracking technologies
          used are beacons, tags, and scripts to collect and track information
          and to improve and analyze Our Service. The technologies We use may
          include:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Cookies or Browser Cookies.</span>
            <span>
              A cookie is a small file placed on Your Device. You can instruct
              Your browser to refuse all Cookies or to indicate when a Cookie is
              being sent. However, if You do not accept Cookies, You may not be
              able to use some parts of our Service. Unless you have adjusted
              Your browser setting so that it will refuse Cookies, our Service
              may use Cookies.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Web Beacons.</span>
            <span>
              Certain sections of our Service and our emails may contain small
              electronic files known as web beacons (also referred to as clear
              gifs, pixel tags, and single-pixel gifs) that permit the Company
              or Operator, for example, to count users who have visited those
              pages or opened an email and for other related application or
              website statistics (for example, recording the popularity of a
              certain section and verifying system and server integrity).
            </span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies
          remain on Your personal computer or mobile device when You go offline,
          while Session Cookies are deleted as soon as You close Your web
          browser.
        </span>
      </p>
      <p>
        <span>
          We use both Session and Persistent Cookies for the purposes set out
          below:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Necessary / Essential Cookies</span>
            <span>
              <br />
            </span>
            <span>Type: Session Cookies</span>
            <span>
              <br />
            </span>
            <span>Administered by: Us</span>
            <span>
              <br />
            </span>
            <span>
              Purpose: These Cookies are essential to provide You with services
              available through the Application or Website and to enable You to
              use some of its features. They help to authenticate users and
              prevent fraudulent use of user accounts. Without these Cookies,
              the services that You have asked for cannot be provided, and We
              only use these Cookies to provide You with those services.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Cookies Policy / Notice Acceptance Cookies</span>
            <span>
              <br />
            </span>
            <span>Type: Persistent Cookies</span>
            <span>
              <br />
            </span>
            <span>Administered by: Us</span>
            <span>
              <br />
            </span>
            <span>
              Purpose: These Cookies identify if users have accepted the use of
              cookies on the Application or Website.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Functionality Cookies</span>
            <span>
              <br />
            </span>
            <span>Type: Persistent Cookies</span>
            <span>
              <br />
            </span>
            <span>Administered by: Us</span>
            <span>
              <br />
            </span>
            <span>
              Purpose: These Cookies allow us to remember choices You make when
              You use the Application or Website, such as remembering your login
              details or language preference. The purpose of these Cookies is to
              provide You with a more personal experience and to avoid You
              having to re-enter your preferences every time You use the
              Application or Website.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Tracking and Performance Cookies</span>
            <span>
              <br />
            </span>
            <span>Type: Persistent Cookies</span>
            <span>
              <br />
            </span>
            <span>Administered by: Third-Parties</span>
            <span>
              <br />
            </span>
            <span>
              Purpose: These Cookies are used to track information about traffic
              to the Application or Website and how users use the Application or
              Website. The information gathered via these Cookies may directly
              or indirectly identify you as an individual visitor. This is
              because the information collected is typically linked to a
              pseudonymous identifier associated with the device you use to
              access the Application or Website. We may also use these Cookies
              to test new pages, features or new functionality of the
              Application or Website to see how our users react to them.
            </span>
          </p>
        </li>
      </ul>
      <h2>
        <span>3.2 - Use of Your Personal Data</span>
      </h2>
      <p>
        <span>
          The Company or Operator may use Personal Data for the following
          purposes:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>To provide and maintain our Service</span>
            <span>, including to monitor the usage of our Service.</span>
          </p>
        </li>
        <li>
          <p>
            <span>To manage Your Account:</span>
            <span>
              {' '}
              to manage Your registration as a user of the Service. The Personal
              Data You provide can give You access to different functionalities
              of the Service that are available to You as a registered user.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>For the performance of a contract:</span>
            <span>
              {' '}
              the development, compliance and undertaking of the purchase
              contract for the products, items or services You have purchased or
              of any other contract with Us through the Service.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>To contact You:</span>
            <span>
              To contact You by email, telephone calls, SMS, or other equivalent
              forms of electronic communication, such as a mobile application's
              push notifications regarding updates or informative communications
              related to the functionalities, products or contracted services,
              including the security updates, when necessary or reasonable for
              their implementation.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>To provide You</span>
            <span>
              with news, special offers and general information about other
              goods, services and events which we offer that are similar to
              those that you have already purchased or enquired about unless You
              have opted not to receive such information.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>To manage Your requests:</span>
            <span> To attend and manage Your requests to Us.</span>
          </p>
        </li>
        <li>
          <p>
            <span>To deliver targeted advertising to You</span>
            <span>
              : We may use Your information to develop and display content and
              advertising (and work with third-party vendors who do so) tailored
              to Your interests and/or location and to measure its
              effectiveness.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>For business transfers:</span>
            <span>
              We may use Your information to evaluate or conduct a merger,
              divestiture, restructuring, reorganization, dissolution, or other
              sale or transfer of some or all of Our assets, whether as a going
              concern or as part of bankruptcy, liquidation, or similar
              proceeding, in which Personal Data held by Us about our Service
              users is among the assets transferred.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>For other purposes</span>
            <span>
              : We may use Your information for other purposes, such as data
              analysis, identifying usage trends, determining the effectiveness
              of our promotional campaigns and to evaluate and improve our
              Service, products, services, marketing and your experience.
            </span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          We may share Your personal information in the following situations:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>With Service Providers:</span>
            <span>
              We may share Your personal information with Service Providers to
              monitor and analyze the use of our Service, to advertise on third
              party websites to You after You visited our Service, for payment
              processing, to contact You.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>For business transfers:</span>
            <span>
              We may share or transfer Your personal information in connection
              with, or during negotiations of, any merger, sale of Company or
              Operator assets, financing, or acquisition of all or a portion of
              Our business to another company.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>With Affiliates:</span>
            <span>
              We may share Your information with Our affiliates, in which case
              we will require those affiliates to honor this Privacy Policy.
              Affiliates include Our parent company and any other subsidiaries,
              joint venture partners or other companies that We control or that
              are under common control with Us.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>With business partners:</span>
            <span>
              {' '}
              We may share Your information with Our business partners to offer
              You certain products, services or promotions.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>With other users:</span>
            <span>
              when You share personal information or otherwise interact in the
              public areas with other users, such information may be viewed by
              all users and may be publicly distributed outside. If You interact
              with other users or register through a Third-Party Social Media
              Service, Your contacts on the Third-Party Social Media Service may
              see Your name, profile, pictures and description of Your activity.
              Similarly, other users will be able to view descriptions of Your
              activity, communicate with You and view Your profile.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>With Your consent</span>
            <span>
              : We may disclose Your personal information for any other purpose
              with Your consent.
            </span>
          </p>
        </li>
      </ul>
      <h2>
        <span>3.3 - Retention of Your Personal Data</span>
      </h2>
      <p>
        <span>
          The Company or Operator will retain Your Personal Data only for as
          long as is necessary for the purposes set out in this Privacy Policy.
          We will retain and use Your Personal Data to the extent necessary to
          comply with our legal obligations (for example, if we are required to
          retain your data to comply with applicable laws), resolve disputes,
          and enforce our legal agreements and policies.
        </span>
      </p>
      <p>
        <span>
          The Company or Operator will also retain Usage Data for internal
          analysis purposes. Usage Data is generally retained for a shorter
          period of time, except when this data is used to strengthen the
          security or to improve the functionality of Our Service, or We are
          legally obligated to retain this data for longer time periods.
        </span>
      </p>
      <p>
        <span>
          When Your Personal Data is no longer required by law or rights or
          obligations by Us or You, We will delete the Personal Data. In most
          cases, Personal Data will be deleted upon termination or expiry of the
          agreement between the You and the Company or Operator or upon Your
          written request.
        </span>
      </p>
      <h2>
        <span>3.4 - Transfer of Your Personal Data</span>
      </h2>
      <p>
        <span>
          Your information, including Personal Data, is processed at the
          Company’s or Operator's operating offices and in any other places
          where the parties involved in the processing are located. It means
          that this information may be transferred to — and maintained on —
          computers located outside of Your state, province, country or other
          governmental jurisdiction where the data protection laws may differ
          from those from Your jurisdiction.
        </span>
      </p>
      <p>
        <span>
          Your consent to this Privacy Policy followed by Your submission of
          such information represents Your agreement to that transfer.
        </span>
      </p>
      <p>
        <span>
          The Company or Operator will take all steps reasonably necessary to
          ensure that Your data is treated securely and in accordance with this
          Privacy Policy and no transfer of Your Personal Data will take place
          to an organization or a country unless there are adequate controls in
          place including the security of Your data and other personal
          information.
        </span>
      </p>
      <h2>
        <span>3.5 - Delete Your Personal Data</span>
      </h2>
      <p>
        <span>
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You.
        </span>
      </p>
      <p>
        <span>
          Our Service may give You the ability to delete certain information
          about You from within the Service.
        </span>
      </p>
      <p>
        <span>
          You may update, amend, or delete Your information at any time by
          signing in to Your Account, if you have one, and visiting the account
          settings section that allows you to manage Your personal information.
          You may also contact Us to request access to, correct, or delete any
          personal information that You have provided to Us.
        </span>
      </p>
      <p>
        <span>
          Please note, however, that We may need to retain certain information
          when we have a legal obligation or lawful basis to do so.
        </span>
      </p>
      <h2>
        <span>3.6 - Disclosure of Your Personal Data</span>
      </h2>
      <h3>
        <span>3.6.1 - Business Transactions</span>
      </h3>
      <p>
        <span>
          If the Company or Operator is involved in a merger, acquisition or
          asset sale, Your Personal Data may be transferred. We will provide
          notice before Your Personal Data is transferred and becomes subject to
          a different Privacy Policy.
        </span>
      </p>
      <h3>
        <span>3.6.2 - Law enforcement</span>
      </h3>
      <p>
        <span>
          Under certain circumstances, the Company or Operator may be required
          to disclose Your Personal Data if required to do so by law or in
          response to valid requests by public authorities (e.g. a court or a
          government agency).
        </span>
      </p>
      <h3>
        <span>3.6.3 - Other legal requirements</span>
      </h3>
      <p>
        <span>
          The Company or Operator may disclose Your Personal Data in the good
          faith belief that such action is necessary to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Comply with a legal obligation</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Protect and defend the rights or property of the Company or
              Operator
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Prevent or investigate possible wrongdoing in connection with the
              Service
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Protect the personal safety of Users of the Service or the public
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Protect against legal liability</span>
          </p>
        </li>
      </ul>
      <h2>
        <span>3.7 - Security of Your Personal Data</span>
      </h2>
      <p>
        <span>
          The security of Your Personal Data is important to Us, but remember
          that no method of transmission over the Internet, or method of
          electronic storage is 100% secure. While We strive to use commercially
          acceptable means to protect Your Personal Data, We cannot guarantee
          its absolute security.
        </span>
      </p>
      <h1>
        <span>
          4 - Detailed Information on the Processing of Your Personal Data
        </span>
      </h1>
      <p>
        <span>
          The Service Providers We use may have access to Your Personal Data.
          These third-party vendors collect, store, use, process and transfer
          information about Your activity on Our Service in accordance with
          their Privacy Policies.
        </span>
      </p>
      <h2>
        <span>4.1 - Analytics</span>
      </h2>
      <p>
        <span>
          We may use third-party Service providers to monitor and analyze the
          use of our Service. They may include, but are not limited to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Google Analytics</span>
            <span>
              <br />
            </span>
            <span>
              Google Analytics is a web analytics service offered by Google that
              tracks and reports website traffic. Google uses the data collected
              to track and monitor the use of our Service. This data is shared
              with other Google services. Google may use the collected data to
              contextualize and personalize the ads of its own advertising
              network.
            </span>
            <span>
              <br />
            </span>
            <span>
              You can opt-out of having made your activity on the Service
              available to Google Analytics by installing the Google Analytics
              opt-out browser add-on. The add-on prevents the Google Analytics
              JavaScript (ga.js, analytics.js and dc.js) from sharing
              information with Google Analytics about visits activity.
            </span>
            <span>
              <br />
            </span>
            <span>
              You may opt-out of certain Google Analytics features through your
              mobile device settings, such as your device advertising settings
              or by following the instructions provided by Google in their
              Privacy Policy:{' '}
            </span>
            <a href="https://policies.google.com/privacy">
              <span>https://policies.google.com/privacy</span>
              <span>
                <br />
              </span>
            </a>
            <span>
              For more information on the privacy practices of Google, please
              visit the Google Privacy &amp; Terms web page:{' '}
            </span>
            <a href="https://policies.google.com/privacy">
              <span>https://policies.google.com/privacy</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>Matomo</span>
            <span>
              <br />
            </span>
            <span>
              Matomo is a web analytics service. You can visit their Privacy
              Policy page here:{' '}
            </span>
            <a href="https://matomo.org/privacy-policy">
              <span>https://matomo.org/privacy-policy</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>Fathom</span>
            <span>
              <br />
            </span>
            <span>
              Fathom is a web analytics service. You can visit their Privacy
              Policy page here:{' '}
            </span>
            <a href="https://www.fathomhq.com/privacy">
              <span>https://www.fathomhq.com/privacy</span>
            </a>
          </p>
        </li>
      </ul>
      <h2>
        <span>4.2 - Email Marketing</span>
      </h2>
      <p>
        <span>
          We may use Your Personal Data to contact You with newsletters,
          marketing or promotional materials and other information that may be
          of interest to You. You may opt-out of receiving any, or all, of these
          communications from Us by following the unsubscribe link or
          instructions provided in any email We send or by contacting Us.
        </span>
      </p>
      <p>
        <span>
          We may use Email Marketing Service Providers to manage and send emails
          to You. They may include, but are not limited to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Mailchimp</span>
            <span>
              <br />
            </span>
            <span>
              Mailchimp is an email marketing sending service provided by The
              Rocket Science Group LLC.
            </span>
            <span>
              <br />
            </span>
            <span>
              For more information on the privacy practices of Mailchimp, please
              visit their Privacy policy:{' '}
            </span>
            <a href="https://mailchimp.com/legal/privacy/">
              <span>https://mailchimp.com/legal/privacy/</span>
            </a>
          </p>
        </li>
      </ul>
      <h2>
        <span>4.3 - Payments</span>
      </h2>
      <p>
        <span>
          We may provide paid products and/or services within the Service. In
          that case, we may use third-party services for payment processing
          (e.g. payment processors).
        </span>
      </p>
      <p>
        <span>
          We will not store or collect Your payment card details. That
          information is provided directly to Our third-party payment processors
          whose use of Your personal information is governed by their Privacy
          Policy. These payment processors adhere to the standards set by
          PCI-DSS as managed by the PCI Security Standards Council, which is a
          joint effort of brands like Visa, Mastercard, American Express and
          Discover. PCI-DSS requirements help ensure the secure handling of
          payment information.
        </span>
      </p>
      <p>
        <span>They may include, but are not limited to:</span>
      </p>
      <ul>
        <li>
          <p>
            <span>Stripe</span>
            <span>
              <br />
            </span>
            <span>Their Privacy Policy can be viewed at </span>
            <a href="https://stripe.com/us/privacy">
              <span>https://stripe.com/us/privacy</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>PayPal</span>
            <span>
              <br />
            </span>
            <span>Their Privacy Policy can be viewed at </span>
            <a href="https://www.paypal.com/us/webapps/mpp/ua/privacy-full">
              <span>https://www.paypal.com/us/webapps/mpp/ua/privacy-full</span>
            </a>
          </p>
        </li>
      </ul>
      <h2>
        <span>4.4 - Behavioral Remarketing</span>
      </h2>
      <p>
        <span>
          The Company or Operator uses remarketing services to advertise to You
          after You accessed or visited our Service. We and Our third-party
          vendors use cookies and non-cookie technologies to help Us recognize
          Your Device and understand how You use our Service so that We can
          improve our Service to reflect Your interests and serve You
          advertisements that are likely to be of more interest to You.
        </span>
      </p>
      <p>
        <span>
          These third-party vendors collect, store, use, process and transfer
          information about Your activity on Our Service in accordance with
          their Privacy Policies and to enable Us to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>
              Measure and analyze traffic and browsing activity on Our Service
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Show advertisements for our products and/or services to You on
              third-party websites or apps
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Measure and analyze the performance of Our advertising campaigns
            </span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          Some of these third-party vendors may use non-cookie technologies that
          may not be impacted by browser settings that block cookies. Your
          browser may not permit You to block such technologies. You can use the
          following third-party tools to decline the collection and use of
          information for the purpose of serving You interest-based advertising:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>The NAI's opt-out platform: </span>
            <a href="http://www.networkadvertising.org/choices/">
              <span>http://www.networkadvertising.org/choices/</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>The EDAA's opt-out platform </span>
            <a href="http://www.youronlinechoices.com/">
              <span>http://www.youronlinechoices.com/</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>The DAA's opt-out platform: </span>
            <a href="http://optout.aboutads.info/?c=2&amp;lang=EN">
              <span>http://optout.aboutads.info/?c=2&amp;lang=EN</span>
            </a>
          </p>
        </li>
      </ul>
      <p>
        <span>
          You may opt-out of all personalized advertising by enabling privacy
          features on Your mobile device such as Limit Ad Tracking (iOS) and Opt
          Out of Ads Personalization (Android). See Your mobile device Help
          system for more information.
        </span>
      </p>
      <p>
        <span>
          We may share information, such as hashed email addresses (if
          available) or other online identifiers collected on Our Service with
          these third-party vendors. This allows Our third-party vendors to
          recognize and deliver You ads across devices and browsers. To read
          more about the technologies used by these third-party vendors and
          their cross-device capabilities please refer to the Privacy Policy of
          each vendor listed below.
        </span>
      </p>
      <p>
        <span>
          The third-party vendors We may use are, but are not limited to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Google Ads (AdWords)</span>
            <span>
              <br />
            </span>
            <span>
              Google Ads (AdWords) remarketing service is provided by Google
              Inc.
            </span>
            <span>
              <br />
            </span>
            <span>
              You can opt-out of Google Analytics for Display Advertising and
              customise the Google Display Network ads by visiting the Google
              Ads Settings page:{' '}
            </span>
            <a href="http://www.google.com/settings/ads">
              <span>http://www.google.com/settings/ads</span>
              <span>
                <br />
              </span>
            </a>
            <span>
              Google also recommends installing the Google Analytics Opt-out
              Browser Add-on -{' '}
            </span>
            <a href="https://tools.google.com/dlpage/gaoptout">
              <span>https://tools.google.com/dlpage/gaoptout</span>
            </a>
            <span>
              {' '}
              - for your web browser. Google Analytics Opt-out Browser Add-on
              provides visitors with the ability to prevent their data from
              being collected and used by Google Analytics.
            </span>
            <span>
              <br />
            </span>
            <span>
              For more information on the privacy practices of Google, please
              visit the Google Privacy &amp; Terms web page:{' '}
            </span>
            <a href="https://policies.google.com/privacy">
              <span>https://policies.google.com/privacy</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>Twitter</span>
            <span>
              <br />
            </span>
            <span>Twitter remarketing service is provided by Twitter Inc.</span>
            <span>
              <br />
            </span>
            <span>
              You can opt-out from Twitter's interest-based ads by following
              their instructions:{' '}
            </span>
            <a href="https://support.twitter.com/articles/20170405">
              <span>https://support.twitter.com/articles/20170405</span>
              <span>
                <br />
              </span>
            </a>
            <span>
              You can learn more about the privacy practices and policies of
              Twitter by visiting their Privacy Policy page:{' '}
            </span>
            <a href="https://twitter.com/privacy">
              <span>https://twitter.com/privacy</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>Facebook / Meta</span>
            <span>
              <br />
            </span>
            <span>
              Facebook or Meta remarketing service is provided by Facebook Inc.
              and Meta Inc.
            </span>
            <span>
              <br />
            </span>
            <span>
              You can learn more about interest-based advertising from Facebook
              by visiting this page:{' '}
            </span>
            <a href="https://www.facebook.com/help/516147308587266">
              <span>https://www.facebook.com/help/516147308587266</span>
              <span>
                <br />
              </span>
            </a>
            <span>
              To opt-out from Facebook's interest-based ads, follow these
              instructions from Facebook:{' '}
            </span>
            <a href="https://www.facebook.com/help/568137493302217">
              <span>https://www.facebook.com/help/568137493302217</span>
              <span>
                <br />
              </span>
            </a>
            <span>
              Facebook adheres to the Self-Regulatory Principles for Online
              Behavioural Advertising established by the Digital Advertising
              Alliance. You can also opt-out from Facebook and other
              participating companies through the Digital Advertising Alliance
              in the USA
            </span>
            <a href="http://www.aboutads.info/choices/">
              <span>http://www.aboutads.info/choices/</span>
            </a>
            <span>, the Digital Advertising Alliance of Canada in Canada </span>
            <a href="http://youradchoices.ca/">
              <span>http://youradchoices.ca/</span>
            </a>
            <span>
              {' '}
              or the European Interactive Digital Advertising Alliance in Europe{' '}
            </span>
            <a href="http://www.youronlinechoices.eu/">
              <span>http://www.youronlinechoices.eu/</span>
            </a>
            <span>, or opt-out using your mobile device settings.</span>
            <span>
              <br />
            </span>
            <span>
              For more information on the privacy practices of Facebook, please
              visit Facebook's Data Policy:{' '}
            </span>
            <a href="https://www.facebook.com/privacy/explanation">
              <span>https://www.facebook.com/privacy/explanation</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>Pinterest</span>
            <span>
              <br />
            </span>
            <span>
              Pinterest remarketing service is provided by Pinterest Inc.
            </span>
            <span>
              <br />
            </span>
            <span>
              You can opt-out from Pinterest's interest-based ads by enabling
              the "Do Not Track" functionality of your web browser or by
              following Pinterest instructions:{' '}
            </span>
            <a href="http://help.pinterest.com/en/articles/personalization-and-data">
              <span>
                http://help.pinterest.com/en/articles/personalization-and-data
              </span>
              <span>
                <br />
              </span>
            </a>
            <span>
              You can learn more about the privacy practices and policies of
              Pinterest by visiting their Privacy Policy page:{' '}
            </span>
            <a href="https://about.pinterest.com/en/privacy-policy">
              <span>https://about.pinterest.com/en/privacy-policy</span>
            </a>
          </p>
        </li>
      </ul>
      <h2>
        <span>4.5 - Usage, Performance and Miscellaneous</span>
      </h2>
      <p>
        <span>
          We may use third-party Service Providers to provide better improvement
          of our Service. They may include, but are not limited to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Intercom</span>
            <span>
              <br />
            </span>
            <span>Their Privacy Policy can be viewed at </span>
            <a href="https://www.intercom.com/legal/privacy">
              <span>https://www.intercom.com/legal/privacy</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>Facebook Messenger</span>
            <span>
              <br />
            </span>
            <span>Their Privacy Policy can be viewed at </span>
            <a href="https://www.facebook.com/privacy/policy">
              <span>https://www.facebook.com/privacy/policy</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>Zendesk</span>
            <span>
              <br />
            </span>
            <span>Their Privacy Policy can be viewed at </span>
            <a href="https://www.zendesk.com/company/agreements-and-terms/privacy-notice/">
              <span>
                https://www.zendesk.com/company/agreements-and-terms/privacy-notice/
              </span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>Tawk</span>
            <span>
              <br />
            </span>
            <span>Their Privacy Policy can be viewed at </span>
            <a href="https://www.tawk.to/privacy-policy/">
              <span>https://www.tawk.to/privacy-policy/</span>
            </a>
          </p>
        </li>
      </ul>
      <h1>
        <span>5 - Links to Other Websites</span>
      </h1>
      <p>
        <span>
          Our Service may contain links to other websites that are not operated
          by Us. If You click on a third party link, You will be directed to
          that third party's site. We strongly advise You to review the Privacy
          Policy of every site You visit.
        </span>
      </p>
      <p>
        <span>
          We have no control over and assume no responsibility for the content,
          privacy policies or practices of any third party sites or services.
        </span>
      </p>
      <h1>
        <span>6 - GDPR Privacy</span>
      </h1>
      <h2>
        <span>6.1 - Legal Basis for Processing Personal Data under GDPR</span>
      </h2>
      <p>
        <span>
          We may process Personal Data under the following conditions:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Consent:</span>
            <span>
              {' '}
              You have given Your consent for processing Personal Data for one
              or more specific purposes.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Performance of a contract:</span>
            <span>
              {' '}
              Provision of Personal Data is necessary for the performance of an
              agreement with You and/or for any pre-contractual obligations
              thereof.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Legal obligations:</span>
            <span>
              {' '}
              Processing Personal Data is necessary for compliance with a legal
              obligation to which the Company or Operator is subject.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Vital interests:</span>
            <span>
              {' '}
              Processing Personal Data is necessary in order to protect Your
              vital interests or of another natural person.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Public interests:</span>
            <span>
              {' '}
              Processing Personal Data is related to a task that is carried out
              in the public interest or in the exercise of official authority
              vested in the Company or Operator.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Legitimate interests:</span>
            <span>
              {' '}
              Processing Personal Data is necessary for the purposes of the
              legitimate interests pursued by the Company or Operator.
            </span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          In any case, the Company or Operator will gladly help to clarify the
          specific legal basis that applies to the processing, and in particular
          whether the provision of Personal Data is a statutory or contractual
          requirement, or a requirement necessary to enter into a contract.
        </span>
      </p>
      <h2>
        <span>6.2 - Your Rights under the GDPR</span>
      </h2>
      <p>
        <span>
          The Company or Operator undertakes to respect the confidentiality of
          Your Personal Data and to guarantee You can exercise Your rights.
        </span>
      </p>
      <p>
        <span>
          You have the right under this Privacy Policy, and by law if You are
          within the EU, to:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Request access to Your Personal Data.</span>
            <span>
              The right to access, update or delete the information We have on
              You. Whenever made possible, you can access, update or request
              deletion of Your Personal Data directly within Your account
              settings section. If you are unable to perform these actions
              yourself, please contact Us to assist You. This also enables You
              to receive a copy of the Personal Data We hold about You.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Request correction of the Personal Data that We hold about You.
            </span>
            <span>
              {' '}
              You have the right to have any incomplete or inaccurate
              information We hold about You corrected.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Object to processing of Your Personal Data.</span>
            <span>
              This right exists where We are relying on a legitimate interest as
              the legal basis for Our processing and there is something about
              Your particular situation, which makes You want to object to our
              processing of Your Personal Data on this ground. You also have the
              right to object where We are processing Your Personal Data for
              direct marketing purposes.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Request erasure of Your Personal Data.</span>
            <span>
              {' '}
              You have the right to ask Us to delete or remove Personal Data
              when there is no good reason for Us to continue processing it.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Request the transfer of Your Personal Data.</span>
            <span>
              We will provide to You, or to a third-party You have chosen, Your
              Personal Data in a structured, commonly used, machine-readable
              format. Please note that this right only applies to automated
              information which You initially provided consent for Us to use or
              where We used the information to perform a contract with You.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Withdraw Your consent.</span>
            <span>
              {' '}
              You have the right to withdraw Your consent on using your Personal
              Data. If You withdraw Your consent, We may not be able to provide
              You with access to certain specific functionalities of the
              Service.
            </span>
          </p>
        </li>
      </ul>
      <h2>
        <span>6.3 - Exercising of Your GDPR Data Protection Rights</span>
      </h2>
      <p>
        <span>
          You may exercise Your rights of access, rectification, cancellation
          and opposition by contacting Us. Please note that we may ask You to
          verify Your identity before responding to such requests. If You make a
          request, We will try our best to respond to You as soon as possible.
        </span>
      </p>
      <p>
        <span>
          You have the right to complain to a Data Protection Authority about
          Our collection and use of Your Personal Data. For more information, if
          You are in the European Economic Area (EEA), please contact Your local
          data protection authority in the EEA.
        </span>
      </p>
      <h1>
        <span>7 - CCPA, CalOPPA, and California Privacy Rights</span>
      </h1>
      <p>
        <span>
          This privacy notice section for California residents supplements the
          information contained in Our Privacy Policy and it applies solely to
          all visitors, users, and others who reside in the State of California.
        </span>
      </p>
      <h2>
        <span>7.1 - Categories of Personal Information Collected</span>
      </h2>
      <p>
        <span>
          We collect information that identifies, relates to, describes,
          references, is capable of being associated with, or could reasonably
          be linked, directly or indirectly, with a particular Consumer or
          Device. The following is a list of categories of personal information
          which we may collect or may have been collected from California
          residents within the last twelve (12) months.
        </span>
      </p>
      <p>
        <span>
          Please note that the categories and examples provided in the list
          below are those defined in the CCPA. This does not mean that all
          examples of that category of personal information were in fact
          collected by Us, but reflects our good faith belief to the best of our
          knowledge that some of that information from the applicable category
          may be and may have been collected. For example, certain categories of
          personal information would only be collected if You provided such
          personal information directly to Us.
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Category A: Identifiers.</span>
            <span>
              <br />
            </span>
            <span>
              Examples: A real name, alias, postal address, unique personal
              identifier, online identifier, Internet Protocol address, email
              address, account name, driver's license number, passport number,
              or other similar identifiers.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: Yes.</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Category B: Personal information categories listed in the
              California Customer Records statute (Cal. Civ. Code § 1798.80(e)).
            </span>
            <span>
              <br />
            </span>
            <span>
              Examples: A name, signature, Social Security number, physical
              characteristics or description, address, telephone number,
              passport number, driver's license or state identification card
              number, insurance policy number, education, employment, employment
              history, bank account number, credit card number, debit card
              number, or any other financial information, medical information,
              or health insurance information. Some personal information
              included in this category may overlap with other categories.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: Yes.</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Category C: Protected classification characteristics under
              California or federal law.
            </span>
            <span>
              <br />
            </span>
            <span>
              Examples: Age (40 years or older), race, color, ancestry, national
              origin, citizenship, religion or creed, marital status, medical
              condition, physical or mental disability, sex (including gender,
              gender identity, gender expression, pregnancy or childbirth and
              related medical conditions), sexual orientation, veteran or
              military status, genetic information (including familial genetic
              information).
            </span>
            <span>
              <br />
            </span>
            <span>Collected: No.</span>
          </p>
        </li>
        <li>
          <p>
            <span>Category D: Commercial information.</span>
            <span>
              <br />
            </span>
            <span>
              Examples: Records and history of products or services purchased or
              considered.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: Yes.</span>
          </p>
        </li>
        <li>
          <p>
            <span>Category E: Biometric information.</span>
            <span>
              <br />
            </span>
            <span>
              Examples: Genetic, physiological, behavioral, and biological
              characteristics, or activity patterns used to extract a template
              or other identifier or identifying information, such as,
              fingerprints, faceprints, and voiceprints, iris or retina scans,
              keystroke, gait, or other physical patterns, and sleep, health, or
              exercise data.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: No.</span>
          </p>
        </li>
        <li>
          <p>
            <span>Category F: Internet or other similar network activity.</span>
            <span>
              <br />
            </span>
            <span>
              Examples: Interaction with our Service or advertisement.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: Yes.</span>
          </p>
        </li>
        <li>
          <p>
            <span>Category G: Geolocation data.</span>
            <span>
              <br />
            </span>
            <span>Examples: Approximate physical location.</span>
            <span>
              <br />
            </span>
            <span>Collected: No.</span>
          </p>
        </li>
        <li>
          <p>
            <span>Category H: Sensory data.</span>
            <span>
              <br />
            </span>
            <span>
              Examples: Audio, electronic, visual, thermal, olfactory, or
              similar information.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: No.</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Category I: Professional or employment-related information.
            </span>
            <span>
              <br />
            </span>
            <span>
              Examples: Current or past job history or performance evaluations.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: No.</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Category J: Non-public education information (per the Family
              Educational Rights and Privacy Act (20 U.S.C. Section 1232g, 34
              C.F.R. Part 99)).
            </span>
            <span>
              <br />
            </span>
            <span>
              Examples: Education records directly related to a student
              maintained by an educational institution or party acting on its
              behalf, such as grades, transcripts, class lists, student
              schedules, student identification codes, student financial
              information, or student disciplinary records.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: No.</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Category K: Inferences drawn from other personal information.
            </span>
            <span>
              <br />
            </span>
            <span>
              Examples: Profile reflecting a person's preferences,
              characteristics, psychological trends, predispositions, behavior,
              attitudes, intelligence, abilities, and aptitudes.
            </span>
            <span>
              <br />
            </span>
            <span>Collected: No.</span>
          </p>
        </li>
      </ul>
      <p>
        <span>Under CCPA, personal information does not include:</span>
      </p>
      <ul>
        <li>
          <p>
            <span>Publicly available information from government records</span>
          </p>
        </li>
        <li>
          <p>
            <span>Deidentified or aggregated consumer information</span>
          </p>
        </li>
        <li>
          <p>
            <span>Information excluded from the CCPA's scope, such as:</span>
          </p>
        </li>
        <ul>
          <li>
            <p>
              <span>
                Health or medical information covered by the Health Insurance
                Portability and Accountability Act of 1996 (HIPAA) and the
                California Confidentiality of Medical Information Act (CMIA) or
                clinical trial data
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Personal Information covered by certain sector-specific privacy
                laws, including the Fair Credit Reporting Act (FRCA), the
                Gramm-Leach-Bliley Act (GLBA) or California Financial
                Information Privacy Act (FIPA), and the Driver's Privacy
                Protection Act of 1994
              </span>
            </p>
          </li>
        </ul>
      </ul>
      <h2>
        <span>7.2 - Sources of Personal Information</span>
      </h2>
      <p>
        <span>
          We obtain the categories of personal information listed above from the
          following categories of sources:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Directly from You</span>
            <span>
              . For example, from the forms You complete on our Service,
              preferences You express or provide through our Service, or from
              Your purchases on our Service.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Indirectly from You</span>
            <span>
              . For example, from observing Your activity on our Service.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Automatically from You</span>
            <span>
              . For example, through cookies We or our Service Providers set on
              Your Device as You navigate through our Service.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>From Service Providers</span>
            <span>
              . For example, third-party vendors to monitor and analyze the use
              of our Service, third-party vendors to deliver targeted
              advertising to You, third-party vendors for payment processing, or
              other third-party vendors that We use to provide the Service to
              You.
            </span>
          </p>
        </li>
      </ul>
      <h2>
        <span>
          7.3 - Use of Personal Information for Business Purposes or Commercial
          Purposes
        </span>
      </h2>
      <p>
        <span>
          We may use or disclose personal information We collect for "business
          purposes" or "commercial purposes" (as defined under the CCPA), which
          may include the following examples:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>
              To operate our Service and provide You with our Service.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              To provide You with support and to respond to Your inquiries,
              including to investigate and address Your concerns and monitor and
              improve our Service.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              To fulfill or meet the reason You provided the information. For
              example, if You share Your contact information to ask a question
              about our Service, We will use that personal information to
              respond to Your inquiry. If You provide Your personal information
              to purchase a product or service, We will use that information to
              process Your payment and facilitate delivery.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              To respond to law enforcement requests and as required by
              applicable law, court order, or governmental regulations.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              As described to You when collecting Your personal information or
              as otherwise set forth in the CCPA.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>For internal administrative and auditing purposes.</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              To detect security incidents and protect against malicious,
              deceptive, fraudulent or illegal activity, including, when
              necessary, to prosecute those responsible for such activities.
            </span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          Please note that the examples provided above are illustrative and not
          intended to be exhaustive. For more details on how we use this
          information, please refer to the "Use of Your Personal Data" section.
        </span>
      </p>
      <p>
        <span>
          If We decide to collect additional categories of personal information
          or use the personal information We collected for materially different,
          unrelated, or incompatible purposes We will update this Privacy
          Policy.
        </span>
      </p>
      <h2>
        <span>
          7.4 - Disclosure of Personal Information for Business Purposes or
          Commercial Purposes
        </span>
      </h2>
      <p>
        <span>
          We may use or disclose and may have used or disclosed in the last
          twelve (12) months the following categories of personal information
          for business or commercial purposes:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Category A: Identifiers</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Category B: Personal information categories listed in the
              California Customer Records statute (Cal. Civ. Code § 1798.80(e))
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Category D: Commercial information</span>
          </p>
        </li>
        <li>
          <p>
            <span>Category F: Internet or other similar network activity</span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          Please note that the categories listed above are those defined in the
          CCPA. This does not mean that all examples of that category of
          personal information were in fact disclosed, but reflects our good
          faith belief to the best of our knowledge that some of that
          information from the applicable category may be and may have been
          disclosed.
        </span>
      </p>
      <p>
        <span>
          When We disclose personal information for a business purpose or a
          commercial purpose, We enter a contract that describes the purpose and
          requires the recipient to both keep that personal information
          confidential and not use it for any purpose except performing the
          contract.
        </span>
      </p>
      <h2>
        <span>7.5 - Sale of Personal Information</span>
      </h2>
      <p>
        <span>
          As defined in the CCPA, "sell" and "sale" mean selling, renting,
          releasing, disclosing, disseminating, making available, transferring,
          or otherwise communicating orally, in writing, or by electronic or
          other means, a consumer's personal information by the business to a
          third party for valuable consideration. This means that We may have
          received some kind of benefit in return for sharing personal
          information, but not necessarily a monetary benefit.
        </span>
      </p>
      <p>
        <span>
          Please note that the categories listed below are those defined in the
          CCPA. This does not mean that all examples of that category of
          personal information were in fact sold, but reflects our good faith
          belief to the best of our knowledge that some of that information from
          the applicable category may be and may have been shared for value in
          return.
        </span>
      </p>
      <p>
        <span>
          We may sell and may have sold in the last twelve (12) months the
          following categories of personal information:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Category A: Identifiers</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Category B: Personal information categories listed in the
              California Customer Records statute (Cal. Civ. Code § 1798.80(e))
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>Category D: Commercial information</span>
          </p>
        </li>
        <li>
          <p>
            <span>Category F: Internet or other similar network activity</span>
          </p>
        </li>
      </ul>
      <h2>
        <span>7.6 - Share of Personal Information</span>
      </h2>
      <p>
        <span>
          We may share Your personal information identified in the above
          categories with the following categories of third parties:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Service Providers</span>
          </p>
        </li>
        <li>
          <p>
            <span>Payment processors</span>
          </p>
        </li>
        <li>
          <p>
            <span>Our affiliates</span>
          </p>
        </li>
        <li>
          <p>
            <span>Our business partners</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Third party vendors to whom You or Your agents authorize Us to
              disclose Your personal information in connection with products or
              services We provide to You
            </span>
          </p>
        </li>
      </ul>
      <h2>
        <span>
          7.7 - Sale of Personal Information of Minors Under 16 Years of Age
        </span>
      </h2>
      <p>
        <span>
          We do not knowingly collect personal information from minors under the
          age of 16 through our Service, although certain third party websites
          that we link to may do so. These third-party websites have their own
          terms of use and privacy policies and we encourage parents and legal
          guardians to monitor their children's Internet usage and instruct
          their children to never provide information on other websites without
          their permission.
        </span>
      </p>
      <p>
        <span>
          We do not sell the personal information of Consumers We actually know
          are less than 16 years of age, unless We receive affirmative
          authorization (the "right to opt-in") from either the Consumer who is
          between 13 and 16 years of age, or the parent or guardian of a
          Consumer less than 13 years of age. Consumers who opt-in to the sale
          of personal information may opt-out of future sales at any time. To
          exercise the right to opt-out, You (or Your authorized representative)
          may submit a request to Us by contacting Us.
        </span>
      </p>
      <p>
        <span>
          If You have reason to believe that a child under the age of 13 (or 16)
          has provided Us with personal information, please contact Us with
          sufficient detail to enable Us to delete that information.
        </span>
      </p>
      <h2>
        <span>7.8 - Your Rights under the CCPA</span>
      </h2>
      <p>
        <span>
          The CCPA provides California residents with specific rights regarding
          their personal information. If You are a resident of California, You
          have the following rights:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>The right to notice.</span>
            <span>
              {' '}
              You have the right to be notified which categories of Personal
              Data are being collected and the purposes for which the Personal
              Data is being used.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>The right to request.</span>
            <span>
              Under CCPA, You have the right to request that We disclose
              information to You about Our collection, use, sale, disclosure for
              business purposes and share of personal information. Once We
              receive and confirm Your request, We will disclose to You:
            </span>
          </p>
        </li>
        <ul>
          <li>
            <p>
              <span>
                The categories of personal information We collected about You
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                The categories of sources for the personal information We
                collected about You
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Our business or commercial purpose for collecting or selling
                that personal information
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                The categories of third parties with whom We share that personal
                information
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                The specific pieces of personal information We collected about
                You
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                If we sold Your personal information or disclosed Your personal
                information for a business purpose, We will disclose to You:
              </span>
            </p>
          </li>
          <ul>
            <li>
              <p>
                <span>
                  The categories of personal information categories sold
                </span>
              </p>
            </li>
            <li>
              <p>
                <span>
                  The categories of personal information categories disclosed
                </span>
              </p>
            </li>
          </ul>
        </ul>
        <li>
          <p>
            <span>
              The right to say no to the sale of Personal Data (opt-out).
            </span>
            <span>
              {' '}
              You have the right to direct Us to not sell Your personal
              information. To submit an opt-out request please contact Us.
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>The right to delete Personal Data.</span>
            <span>
              You have the right to request the deletion of Your Personal Data,
              subject to certain exceptions. Once We receive and confirm Your
              request, We will delete (and direct Our Service Providers to
              delete) Your personal information from our records, unless an
              exception applies. We may deny Your deletion request if retaining
              the information is necessary for Us or Our Service Providers to:
            </span>
          </p>
        </li>
        <ul>
          <li>
            <p>
              <span>
                Complete the transaction for which We collected the personal
                information, provide a good or service that You requested, take
                actions reasonably anticipated within the context of our ongoing
                business relationship with You, or otherwise perform our
                contract with You.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Detect security incidents, protect against malicious, deceptive,
                fraudulent, or illegal activity, or prosecute those responsible
                for such activities.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Debug products to identify and repair errors that impair
                existing intended functionality.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Exercise free speech, ensure the right of another consumer to
                exercise their free speech rights, or exercise another right
                provided for by law.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Comply with the California Electronic Communications Privacy Act
                (Cal. Penal Code § 1546 et. seq.).
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Engage in public or peer-reviewed scientific, historical, or
                statistical research in the public interest that adheres to all
                other applicable ethics and privacy laws, when the information's
                deletion may likely render impossible or seriously impair the
                research's achievement, if You previously provided informed
                consent.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Enable solely internal uses that are reasonably aligned with
                consumer expectations based on Your relationship with Us.
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>Comply with a legal obligation.</span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Make other internal and lawful uses of that information that are
                compatible with the context in which You provided it.
              </span>
            </p>
          </li>
        </ul>
        <li>
          <p>
            <span>The right not to be discriminated against.</span>
            <span>
              {' '}
              You have the right not to be discriminated against for exercising
              any of Your consumer's rights, including by:
            </span>
          </p>
        </li>
        <ul>
          <li>
            <p>
              <span>Denying goods or services to You</span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Charging different prices or rates for goods or services,
                including the use of discounts or other benefits or imposing
                penalties
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Providing a different level or quality of goods or services to
                You
              </span>
            </p>
          </li>
          <li>
            <p>
              <span>
                Suggesting that You will receive a different price or rate for
                goods or services or a different level or quality of goods or
                services
              </span>
            </p>
          </li>
        </ul>
      </ul>
      <h2>
        <span>7.9 - Exercising Your CCPA Data Protection Rights</span>
      </h2>
      <p>
        <span>
          In order to exercise any of Your rights under the CCPA, and if You are
          a California resident, You can contact Us.
        </span>
      </p>
      <p>
        <span>
          Only You, or a person registered with the California Secretary of
          State that You authorize to act on Your behalf, may make a verifiable
          request related to Your personal information.
        </span>
      </p>
      <p>
        <span>Your request to Us must:</span>
      </p>
      <ul>
        <li>
          <p>
            <span>
              Provide sufficient information that allows Us to reasonably verify
              You are the person about whom We collected personal information or
              an authorized representative
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>
              Describe Your request with sufficient detail that allows Us to
              properly understand, evaluate, and respond to it
            </span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          We cannot respond to Your request or provide You with the required
          information if We cannot:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>Verify Your identity or authority to make the request</span>
          </p>
        </li>
        <li>
          <p>
            <span>
              And confirm that the personal information relates to You
            </span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          We will disclose and deliver the required information free of charge
          within 45 days of receiving Your verifiable request. The time period
          to provide the required information may be extended once by an
          additional 45 days when reasonably necessary and with prior notice.
        </span>
      </p>
      <p>
        <span>
          Any disclosures We provide will only cover the 12-month period
          preceding the verifiable request's receipt.
        </span>
      </p>
      <p>
        <span>
          For data portability requests, We will select a format to provide Your
          personal information that is readily usable and should allow You to
          transmit the information from one entity to another entity without
          hindrance.
        </span>
      </p>
      <h2>
        <span>7.10 - Do Not Sell My Personal Information</span>
      </h2>
      <p>
        <span>
          You have the right to opt-out of the sale of Your personal
          information. Once We receive and confirm a verifiable consumer request
          from You, we will stop selling Your personal information. To exercise
          Your right to opt-out, please contact Us.
        </span>
      </p>
      <p>
        <span>
          The Service Providers we partner with (for example, our analytics or
          advertising partners) may use technology on the Service that sells
          personal information as defined by the CCPA law. If you wish to opt
          out of the use of Your personal information for interest-based
          advertising purposes and these potential sales as defined under CCPA
          law, you may do so by following the instructions below.
        </span>
      </p>
      <p>
        <span>
          Please note that any opt out is specific to the browser You use. You
          may need to opt out on every browser that You use.
        </span>
      </p>
      <h3>
        <span>7.10.1 - Website</span>
      </h3>
      <p>
        <span>
          You can opt out of receiving ads that are personalized as served by
          our Service Providers by following our instructions presented on the
          Service:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>The NAI's opt-out platform: </span>
            <a href="http://www.networkadvertising.org/choices/">
              <span>http://www.networkadvertising.org/choices/</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>The EDAA's opt-out platform </span>
            <a href="http://www.youronlinechoices.com/">
              <span>http://www.youronlinechoices.com/</span>
            </a>
          </p>
        </li>
        <li>
          <p>
            <span>The DAA's opt-out platform: </span>
            <a href="http://optout.aboutads.info/?c=2&amp;lang=EN">
              <span>http://optout.aboutads.info/?c=2&amp;lang=EN</span>
            </a>
          </p>
        </li>
      </ul>
      <p>
        <span>
          The opt out will place a cookie on Your computer that is unique to the
          browser You use to opt out. If you change browsers or delete the
          cookies saved by your browser, You will need to opt out again.
        </span>
      </p>
      <h3>
        <span>7.10.2 - Mobile Devices</span>
      </h3>
      <p>
        <span>
          Your mobile device may give You the ability to opt out of the use of
          information about the apps You use in order to serve You ads that are
          targeted to Your interests:
        </span>
      </p>
      <ul>
        <li>
          <p>
            <span>
              "Opt out of Interest-Based Ads" or "Opt out of Ads
              Personalization" on Android devices
            </span>
          </p>
        </li>
        <li>
          <p>
            <span>"Limit Ad Tracking" on iOS devices</span>
          </p>
        </li>
      </ul>
      <p>
        <span>
          You can also stop the collection of location information from Your
          mobile device by changing the preferences on Your mobile device.
        </span>
      </p>
      <h2>
        <span>
          7.11 - "Do Not Track" Policy as Required by California Online Privacy
          Protection Act (CalOPPA)
        </span>
      </h2>
      <p>
        <span>Our Service does not respond to Do Not Track signals.</span>
      </p>
      <p>
        <span>
          However, some third party websites do keep track of Your browsing
          activities. If You are visiting such websites, You can set Your
          preferences in Your web browser to inform websites that You do not
          want to be tracked. You can enable or disable DNT by visiting the
          preferences or settings page of Your web browser.
        </span>
      </p>
      <h2>
        <span>
          7.12 - Your California Privacy Rights (California's Shine the Light
          law)
        </span>
      </h2>
      <p>
        <span>
          Under California Civil Code Section 1798 (California's Shine the Light
          law), California residents with an established business relationship
          with us can request information once a year about sharing their
          Personal Data with third parties for the third parties' direct
          marketing purposes.
        </span>
      </p>
      <p>
        <span>
          If you'd like to request more information under the California Shine
          the Light law, and if You are a California resident, You can contact
          Us using the contact information provided below.
        </span>
      </p>
      <h1>
        <span>8 - Children's and Minor Users Privacy Rights</span>
      </h1>
      <h2>
        <span>8.1 - General Privacy Rights for Children</span>
      </h2>
      <p>
        <span>
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from anyone
          under the age of 13. If You are a parent or guardian and You are aware
          that Your child has provided Us with Personal Data, please contact Us.
          If We become aware that We have collected Personal Data from anyone
          under the age of 13 without verification of parental consent, We take
          steps to remove that information from Our servers.
        </span>
      </p>
      <p>
        <span>
          If We need to rely on consent as a legal basis for processing Your
          information and Your country requires consent from a parent, We may
          require Your parent's consent before We collect and use that
          information.
        </span>
      </p>
      <h2>
        <span>
          8.2 - California Privacy Rights for Minor Users (California Business
          and Professions Code Section 22581)
        </span>
      </h2>
      <p>
        <span>
          California Business and Professions Code Section 22581 allows
          California residents under the age of 18 who are registered users of
          online sites, services or applications to request and obtain removal
          of content or information they have publicly posted.
        </span>
      </p>
      <p>
        <span>
          To request removal of such data, and if You are a California resident,
          You can contact Us using the contact information provided below, and
          include the email address associated with Your account.
        </span>
      </p>
      <p>
        <span>
          Be aware that Your request does not guarantee complete or
          comprehensive removal of content or information posted online and that
          the law may not permit or require removal in certain circumstances.
        </span>
      </p>
      <h1>
        <span>9 - Changes to this Privacy Policy</span>
      </h1>
      <p>
        <span>
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page.
        </span>
      </p>
      <p>
        <span>
          We will let You know via email and/or a prominent notice on Our
          Service, prior to the change becoming effective and update the "Last
          updated" date at the top of this Privacy Policy.
        </span>
      </p>
      <p>
        <span>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </span>
      </p>
      <p></p>
      <div>
        <span>
          <br />
        </span>
      </div>
      <p></p>
    </div>
  );
}
