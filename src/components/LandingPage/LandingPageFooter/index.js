import React from "react";
import "./LandingPageFooter.styles.scss";
import content from "./content";
import IconComponent from "../../../common/IconComponent";

const LandingPageFooter = () => {
  return (
    <div className="landingPageFooterContainer">
      <div className="socialMediaActionContainer">
        <IconComponent iconName="facebook" className="socialMediaIcon" />
        <IconComponent iconName="twitter" className="socialMediaIcon" />
        <IconComponent iconName="youtube" className="socialMediaIcon" />
      </div>
      <div className="footerMenuContainer">
        <div className="footerMenuColumn">
          <a
            href="https://hearbk.com/hq/about-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.ABOUT_US}
          </a>
          <a
            href="https://hearbk.com/hq/manage-preferences/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.MANAGE_PREFERENCES}
          </a>
          <a
            href="https://hearbk.com/hq/terms-conditions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.TERMS_AND_CONDITIONS}
          </a>
        </div>
        <div className="footerMenuColumn">
          <a
            href="https://hearbk.com/hq/cookie-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.COOKIE_POLICY}
          </a>
          <a
            href="https://hearbk.com/hq/privacy-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.PRIVACY_POLICY}
          </a>
          <a
            href="https://hearbk.com/hq/refund-policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.REFUND_POLICY}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPageFooter;
