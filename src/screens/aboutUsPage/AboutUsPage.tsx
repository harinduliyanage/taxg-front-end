import ContentPageTemplate from "../templates/ContentPageTemplate";
import "./_about-us.scss";
const AboutUsPage = () => {
  return (
    <ContentPageTemplate className="about-us">
      <p className="display-6">
        TaxGlobal is a centralized, AI-powered platform that connects users to
        the right tax service providers for their needs. We also help users find
        answers to questions about tax laws via our proprietary NLP engine and
        our community of members. Our diversified business revenue comes from
        membership subscriptions, advertising sales, services and recruitment
        solutions.
      </p>
      <div className="vimeo_video">
        <iframe
          title="ABOUT US"
          src="https://player.vimeo.com/video/792132837?h=1d204fb277&title=0&byline=0&portrait=0"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
      <section className="vision">
        <h2>Vision</h2>
        <p>To be the primary destination for all tax needs globally.</p>
      </section>
      <section className="mission">
        <h2>Mission</h2>
        <p>
          To connect every individual in the world with the right tax expert for
          their situation and empower all to succeed.
        </p>
      </section>
    </ContentPageTemplate>
  );
};

export default AboutUsPage;
