import React from 'react';
import content from "./content";
import "./styles.scss";
import InputField from "../../../common/InputField";
import Button from "../../../common/Button";

const AccountForm = ({ toggleExpand, email, password, onInputChange }) => {
    return (
        <section className="formContainer">
            <header onClick={(e) => toggleExpand(e)} className="formHeaderContainer">
                <span className="expandIcon">
                    +
                </span>
                <div className="formHeaderText">
                    {content.SUBCONTAINER2_LABEL}
                </div>
            </header>
            <div className="formInputContainer">
                <label for="email" className="formInputLabel">
                    {content.SUBCONTAINER2_SUBLABEL1}
                </label>
                <InputField 
                    id="email"
                    className="formInputField"
                    value={email}
                    onChange={onInputChange}
                    placeholder={content.SUBCONTAINER2_PLACEHOLDER1}
                    iconName="pencil"
                />
            </div>
            <div className="formInputContainer">
                <label for="password" className="formInputLabel">
                    {content.SUBCONTAINER2_SUBLABEL2}
                </label>
                <InputField 
                    id="password"
                    className="formInputField"
                    value={password}
                    onChange={onInputChange}
                    placeholder={content.SUBCONTAINER2_PLACEHOLDER2}
                    iconName="pencil"
                />
            </div>
            <div className="buttonWrapper">
                <Button className="launchButton" buttonText={content.SUBCONTAINER2_BUTTON_TEXT} ></Button>
            </div>
        </section>
    );
};

AccountForm.defaultProps = {
    email: "myemail@gmail.com",
    password: ""
};

export default AccountForm;