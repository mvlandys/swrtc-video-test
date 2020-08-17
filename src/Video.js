// Core Libs
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import * as SWRTC from '@andyet/simplewebrtc';

// Constants
const API_KEY = 'CODE_HERE';
const CONFIG_URL = `https://api.simplewebrtc.com/config/guest/${API_KEY}`;
const store = SWRTC.createStore();

export default class VetchatVideo extends Component {
  constructor(props) {
    super(props);


    this.state = {
      isLoading: true,
      consultation_id: 409,
      consultation: {},
    };
  }


  render() {
    const { isLoading, consultation, consultation_id } = this.state;
    return (
      <Provider store={store}>
      <SWRTC.Provider configUrl={CONFIG_URL}>
        <h1>Video Consultation</h1>
        <SWRTC.RequestUserMedia audio video auto />
        <SWRTC.Connected>
          <SWRTC.Room name='chau'>
            {({ room, peers, localMedia, remoteMedia, ...rest }) => {
              console.log(localMedia)

              const remoteVideos = remoteMedia.filter((m) => m.kind === "video");
              const remoteVideoKey = remoteVideos.length > 0 ? remoteVideos.length - 1 : 0;
              const remoteVideo = remoteVideos[remoteVideoKey];
              const localVideos = localMedia.filter((m) => m.kind === "video" && m.shared);
              const localVideoKey = localVideos.length > 0 ? localVideos.length - 1 : 0;
              const localVideo = localVideos[localVideoKey];

              return (
                <div className='videos here' style={{ width: '100%' }}>
                  <div style={{ display: 'inline-block', width: '50%' }}>
                    <h2>Participating Video</h2>
                  </div>
                  <div style={{ display: 'inline-block', width: '50%' }}>
                    <h2>Local Video: {localMedia.length}</h2>
                    <SWRTC.Video media={localVideo} />
                  </div>
                </div>
              );
            }}
          </SWRTC.Room>
        </SWRTC.Connected>
      </SWRTC.Provider>
    </Provider>
    );
  }
}
