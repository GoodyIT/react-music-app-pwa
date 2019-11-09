import React from "react";
import Popup from "reactjs-popup";
import { Typography } from "antd";

const { Text,  } = Typography;

export const PopUp = (props) => {
    return (
        <Popup trigger={props.trigger}
            modal
            contentStyle={{width: '336px', borderRadius: '20px'}}
            closeOnDocumentClick>
            <div className="modal">
                <div className={'modalHeader'}>
                    <Text className={'cardSectionHeaderTitle'}>{props.title}</Text>
                </div>
                <div className="modalBody">
                    {props.children}
                </div>
            </div>
        </Popup>
    )
}