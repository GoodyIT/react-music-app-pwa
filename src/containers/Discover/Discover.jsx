import React, { Component } from "react";
import Cards, { Card } from 'react-swipe-card';
import { connect } from "react-redux";
import { Link }  from "react-router-dom";
import cx from "classnames";
import "./Discover.styles.scss";
import { Typography } from "antd";
import {TextSection} from '../../components/textSection';
import {RoundCard} from '../../components/roundCard'
import headerMenuIcon from "../../assets/img/discover/Group 147.png"
import profilePicture from "../../assets/img/discover/oh4js6qs.png"
import start from "../../assets/img/discover/play.png"
import pause from "../../assets/img/discover/pause.png"
import {BottomMenu} from "../../components/bottomMenu"
import axios from 'axios';
import {GroupButton} from "../../components/groupButton"

import api from '../../config';
const { Text } = Typography;



class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tracks:[],
      showLogout: false, 
    };
  }
  componentWillMount() {
    axios.get(`${api}/api/feedback/all`)
    .then((res) => {
      this.setState({ tracks : res.data.feedbacks})
      console.log("all submits",res.data.feedbacks)
    })
    .catch((e) => {
      console.log("submit error",e)
    })
  }

  changeShowDiv=(number, position)=>{
    console.log(number, position);
    
            
    fetch(`${api}/api/discover/add`, {
        method: "POST",
        body: JSON.stringify({feedbackId: number, status: position, email:this.props.email}),
        headers: {
            'x-access-token': this.props.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) =>{
        if(res.status===201){
          console.log('posted')
        }else{
          console.log('posted error')
        }
    })
  
  }

  getBlobUrlofTracks=(urlDrive)=>{
    var res = urlDrive.match(/[-\w]{25,}/)
    let url = `http://docs.google.com/uc?export=open&id=${res[0]}`;
    return url;
  }
  playSong=(id)=>{
    var music = document.getElementById(id);
    var playPause = document.getElementById(`img${id}`);
    if (music.paused) {
      music.play();
      playPause.src = pause
    } else {
      music.pause();
      playPause.src = start
    }    
  }

 render(){
  return (
    <div className="bg-colored">
      <section className="section-adjust flex-center">
        <div style={{ background: "white" }}>
            <div className="wrapperContainer">
              <div className={'headerMenu'}>
                <div className={'headerMenuLeft'}>
                  <div role="button" onClick={() => this.setState({ showLogout: !this.state.showLogout })}><img className={'headerMenuLeftIcon'} src={headerMenuIcon}/></div>
                  <div className={ "headerActionsContainer"}>
                    <Link to="/listener-feedback">
                      <Text className={'headerMenuLeftText'}>Submit</Text>
                    </Link>
                  </div>
                </div>
                <div>
                <GroupButton />
                </div>
              </div>
              {this.state.showLogout &&
                    <div className={cx('headerMenuLeftText', 'logoutText')}>
                      <Link to="/">Logout</Link>
                    </div>}
              <TextSection text="Discover & Rate New Tracks" paddingTop="25px" paddingBottom="5px" size="15px"/>
              <Cards
                alertRight={<h1 className="alert-right-text">HIT</h1>}
                alertTop={<h1 className="alert-right-text">COOL</h1>}
                alertLeft={<h1 className="alert-right-text">MISS</h1>}
                onEnd={() => console.log("Ënd")
                } className='master-root'>
                    {this.state.tracks.map((item, index) => 
                          <Card
                          key={item._id}
                          onSwipeTop={() => this.changeShowDiv(item._id, 1)}
                          onSwipeLeft={() => this.changeShowDiv(item._id, 0)} 
                          onSwipeRight={() => this.changeShowDiv(item._id, 2)}>
                              <RoundCard>
                                <div className="profileSection">
                                    <img className={'profileImage'} src={profilePicture}/>
                                    <Text className="profileSectionUserName">{item.userName}</Text>
                                </div>
                                <TextSection text={item.name} paddingTop="25px" paddingBottom="2px" size="20px" color="#1B3543" weight="bold"/>
                                <TextSection text={item.fullName} color="#1B3543" paddingTop="0px" paddingBottom="0px" size="12px"/>
                                <div className={'embededContainer'}>
                                    <iframe width="100%" height="166" scrolling="no" frameborder="no" src={item.trackId}></iframe>
                                </div>
                              </RoundCard>
                        </Card>
                    )}
              </Cards>
            </div>
            <BottomMenu/>
        </div>
      </section>
    </div>
  );
 }
};

const mapStateToProps = state => ({
  // blabla: state.blabla,
  token: state.auth.user.token,
  email: state.auth.user.email
});

const mapDispatchToProps = dispatch => ({
  // fnBlaBla: () => dispatch(action.name()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discover);
