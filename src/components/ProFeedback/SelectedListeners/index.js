import React from "react";
import "./styles.scss";
import content from "./content";
import Icon from "../../../common/IconComponent";
import Button from "../../../common/Button";

const SelectedListeners = ({ listeners, onSelectListeners }) => {
  return (
    <section className="selectedListenersContainer">
      <header className="selectedHeader">
        {content.SELECTED}
        <span className="listenersHeader">&nbsp;{content.LISTENERS}</span>
      </header>
      <label htmlFor="selectedListeners" className="selectedListenersLabel">
        {content.YOUR_SELECTED_LISTENERS}
      </label>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly"}}>
      {listeners.map(listener => (
        <div className="iconContainer">
          <Button isIcon className="closeIcon" iconName="close" />
          {listener.profile_image ? (
            <img
              src={listener.profile_image}
              className="selectedListenerPicture"
              alt=""
            />
          ) : (
            <Icon className="selectedListenerPicture" iconName="default_pro_pic_icon" />
          )}
          <label htmlFor="selectedListenerPicture" className="pictureLabel">
            {listener.display_name}
          </label>
        </div>
      ))}
      </div>
      <div className="buttonWrapper">
        <Button
          className="editListenersButton"
          onClick={onSelectListeners}
          buttonText={content.EDIT_LISTENERS}
        />
      </div>
    </section>
  );
};

export default SelectedListeners;
