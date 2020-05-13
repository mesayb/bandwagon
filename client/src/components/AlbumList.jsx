import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/globalContext";
// import logo from "../assets/img/reactlogo.png"
import API from "../utils/API";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, CardColumns, Card, Button, Form, FormControl, Col, Row, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Details from "./DetailsModal";
import "../App.css";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

import ReactDOM from 'react-dom'
// import ReactWOW from 'react-wow'

import { isAuth } from "./helper";
import { toast } from "react-toastify";

function AlbumList() {
  // access global state of albums
  // const [state, dispatch] = useStoreContext();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState({});

  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [art, setArt] = useState('');

  const [modalShow, setModalShow] = React.useState(false);







  // const [modalShow, setModalShow] = React.useState(false);
  // const [currentSong, updateCurrentSong] = React.useState({ modalShow: false, currentSongList: {} })

  //   console.log(state)

  // const getAlbums = () => {
  //   dispatch({ type: "LOADING" });
  //   API.getAlbums()
  //     .then((results) => {
  //       console.log("all albums from db:", results.data);
  //       dispatch({
  //         type: "LOAD_ALBUMS",
  //         albums: results.data,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  const getSongs = () => {
    API.getSongs()
      .then((results) => {
        console.log("all songs from db:", results.data);
        setSongs(results.data);
        setSearchResults(results.data)

        // setCurrentSong(results.data[4])
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // getAlbums();
    getSongs();

    // console.log("useEffect State:", songs)
  }, []);

  // const getAlbumId = (event) => {
  // let idVariable = state.albums.filter(album => album._id === event.target.value)[0]
  // console.log("EVENT: ***********", {...currentSong, ...idVariable[0]})
  // updateCurrentSong({ currentSongList: idVariable, modalShow: true })

  // console.log("CURRENT SONG: ", currentSong)
  // }

  const getCurrentSong = (song) => {
    console.log("CLICKED SONG", song.id);
    let clickedSongId = song.id;
    let clickedSongTitle = song.title.replace(/%20/g, " ");
    let clickedSongUrl = song.fileUrl;
    setModalShow(true)




    setUrl(clickedSongUrl)
    setTitle(clickedSongTitle)
    // setArt(clickedSongArt)

    setCurrentSong({
      currentSong: {
        id: clickedSongId,
        title: clickedSongTitle,
        url: clickedSongUrl
      }
    });
    // console.log(currentSong);
  };

  console.log("art: ", art)
  console.log("title: ", title)
  console.log("URL:", url)

  console.log(currentSong);

  // useEffect(() => {setCurrentSong({currentSong : clickedSong})})

  const albumFunction = (event) => {
    getCurrentSong(event);

    // updateCurrentSong({...currentSong, modalShow: true})

    console.log("CLICKED", event);
  };

  const audioListTest = [
    {
      name: title,
      singer: title,
      cover: art,
      musicSrc: () => {
        // console.log(currentSong.fileUrl, "currentSong.fileUrl");
        return Promise.resolve(`${url}`);
      },
    },
  ];

  const options = {
    audioLists: audioListTest,
    //default play index of the audio player  [type `number` default `0`]
    defaultPlayIndex: 0,

    //if you want dynamic change current play audio you can change it [type `number` default `0`]
    // playIndex: 0,

    //color of the music player theme    [ type `string: 'light' or 'dark'  ` default 'dark' ]
    theme: "dark",

    // Specifies movement boundaries. Accepted values:
    // - `parent` restricts movement within the node's offsetParent
    //    (nearest node with position relative or absolute), or
    // - a selector, restricts movement within the targeted node
    // - An object with `left, top, right, and bottom` properties.
    //   These indicate how far in each direction the draggable
    //   can be moved.
    // Ref: https://github.com/STRML/react-draggable#draggable-api
    bounds: "body",

    // Replace a new playlist with the first loaded playlist
    // instead of adding it at the end of it.
    // [type `boolean`, default `false`]
    clearPriorAudioLists: true,

    // Play your new play list right after your new play list is loaded turn false.
    // [type `boolean`, default `false`]
    autoPlayInitLoadPlayList: true,

    //Whether to load audio immediately after the page loads.  [type `Boolean | String`, default `false`]
    //"auto|metadata|none" "true| false"
    preload: false,

    //Whether the player's background displays frosted glass effect  [type `Boolean`, default `false`]
    glassBg: true,

    //The next time you access the player, do you keep the last state  [type `Boolean` default `false`]
    remember: false,

    //The Audio Can be deleted  [type `Boolean`, default `true`]
    remove: false,

    //audio controller initial position    [ type `Object` default '{top:0,left:0}' ]
    defaultPosition: {
      top: 300,
      left: 120,
    },

    defaultPlayMode: "order",

    //audio mode        mini | full          [type `String`  default `mini`]
    mode: "full",

    /**
     * [ type `Boolean` default 'false' ]
     * The default audioPlay handle function will be played again after each pause, If you only want to trigger it once, you can set 'true'
     */
    once: false,

    //Whether the audio is played after loading is completed. [type `Boolean` default 'true']
    autoPlay: true,

    //Whether you can switch between two modes, full => mini  or mini => full   [type 'Boolean' default 'true']
    toggleMode: true,

    //audio cover is show of the "mini" mode [type `Boolean` default 'true']
    showMiniModeCover: false,

    //audio playing progress is show of the "mini"  mode
    showMiniProcessBar: true,

    //audio controller is can be drag of the "mini" mode     [type `Boolean` default `true`]
    drag: true,

    //drag the audio progress bar [type `Boolean` default `true`]
    seeked: true,

    //Display chrome media session.  [type `Boolean` default `false`]
    showMediaSession: false,

    //Displays the audio load progress bar.  [type `Boolean` default `true`]
    showProgressLoadBar: true,

    //play button display of the audio player panel   [type `Boolean` default `true`]
    showPlay: true,

    //reload button display of the audio player panel   [type `Boolean` default `true`]
    showReload: true,

    //download button display of the audio player panel   [type `Boolean` default `true`]
    showDownload: false,

    //loop button display of the audio player panel   [type `Boolean` default `true`]
    showPlayMode: true,

    //theme toggle switch  display of the audio player panel   [type `Boolean` default `true`]
    showThemeSwitch: false,

    //lyric display of the audio player panel   [type `Boolean` default `false`]
    showLyric: false,

    //destroy player button display  [type `Boolean` default `false`]
    showDestroy: false,

    //Extensible custom content       [type 'Array' default '-' ]
    extendsContent: null,

    //default volume of the audio player [type `Number` default `1` range `0-1`]
    defaultVolume: .5,

    //playModeText show time [type `Number(ms)` default `700`]
    playModeShowTime: 600,

    //Whether to try playing the next audio when the current audio playback fails [type `Boolean` default `true`]
    loadAudioErrorPlayNext: true,

    // Auto hide the cover photo if no cover photo is available [type `Boolean` default `false`]
    autoHiddenCover: true,

    // Play and pause audio through blank space [type `Boolean` default `false`]
    spaceBar: true,
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const handleChange = e => {
  //   setSearchTerm(e.target.value);

  // };
  // React.useEffect(() => {
  //   const results = songs.filter(song =>
  //     song.title.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  //   console.log(searchResults)
  // }, [searchTerm]);

  const searchFilter = (e) => {
    const filter = e.target.value;
    const filteredUserList = songs.filter(song => {
      let values = Object.values(song).join("").toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    setSearchResults(filteredUserList);

    console.log("LOOK HERE:" + searchResults)
  }


  // if (currentSong.fileUrl) {
  //   console.log("audioListTest", audioListTest);
  //   options.audioLists = audioListTest;
  // }

  // const [listenerInfo, updateListenerInfo] = React.useState({
  //   subscriptionToken: 0,
  //   currentListenerData: {},
  //   paused: false,
  // });

  // React.useEffect(() => {
  //   //get current user and set subscription token and user info
  //   API.getUsers()
  //     .then((result) => {
  //       const email = isAuth().email;
  //       const currentUser = result.data.filter((user) => user.email === email);
  //       listenerInfo.subscriptionToken = currentUser[0].subscriptionToken;
  //       updateListenerInfo({
  //         ...listenerInfo,
  //         subscriptionToken: currentUser[0].subscriptionToken,
  //         currentListenerData: currentUser[0],
  //       });
  //     })
  //     .catch((err) => {
  //       toast.error("Failed to Get User info");
  //     });
  // }, ["subscriptionToken"]);

  // const chargeListenerToken = () => {
  //   if (listenerInfo.paused === false) {
  //     const token = Number(listenerInfo.subscriptionToken) - 1;
  //     API.getUsers().then((result) => {
  //       const email = isAuth().email;
  //       const currentUser = result.data.filter((user) => user.email === email);
  //       //calculate subscriptionToken
  //       const userSubscriptionToken = token;

  //       //update user payment required to false after intial signup
  //       const data = {
  //         ...currentUser[0],
  //         paymentRequired: false,
  //         subscriptionToken: userSubscriptionToken,
  //       };
  //       API.updateUser(data._id, data).then(() => {
  //         updateListenerInfo({
  //           ...listenerInfo,
  //           subscriptionToken: data.subscriptionToken,
  //           currentListenerData: data,
  //         });
  //       });
  //     });
  //   } else if (listenerInfo.paused === true) {
  //     updateListenerInfo({
  //       ...listenerInfo,
  //       paused: false,
  //     });
  //   }
  // };

  // const skipChargeOnResume = () => {
  //   updateListenerInfo({
  //     ...listenerInfo,
  //     paused: true,
  //   });
  // };

  return (

    <div>
      <Row className="justify-content-md-center">
        <Col md={5}>

          <Form inline>
            <FormControl
              style={{ textAlign: "center", width: "100%" }}
              type="text"
              placeholder="Search here..."
              className="mr-md-5"
              type="text"
              id="inputID"

              onChange={e => searchFilter(e)}
            />

          </Form>
        </Col>
      </Row>


      <div className="cardContainer">

        <h1 className="albumHeader"></h1>
        {songs.length ? (
          <div className="card-group">
            {searchResults.map((song) => (
              <div class="row">
                <Card
                  className="albumCard wow animate__animated animate__zoomIn col-10"
                  style={{ width: "18rem", padding: "2%" }}
                  key={song._id}
                >
                  <Card.Title style={{textAlign: "center"}}>Artist Name Here</Card.Title>
                  <Card.Text style={{textAlign: "center"}}>Song Name Here</Card.Text>
                  <Card.Img
                    variant="top"
                    src={song.art}
                    style={{ height: "300px" }}
                    className="albumCardImage"
                  />
                  <Card.Body>


                    <Details />
                    <Button

                      value={song._id}
                      className="albumBtn"
                      id={song._id}
                      title={song.title}
                      url={song.fileUrl}
                      name="currentSong"
                      onClick={() => getCurrentSong(song)}
                    >

                      {" "}
                      <span><i class="far fa-play-circle fa-3x playRotate"></i></span>{" "}
                    </Button>
                    {/* <Link to={"/albums/" + album._id}> */}
                    {/* <Details id={album._id} show={currentSong.modalShow} onHide={() => updateCurrentSong({ ...currentSong, modalShow: false })} /> */}
                    {/* </Link> */}
                  </Card.Body>
                  <Card.Footer>
                    {/* <small className="text-muted">Added {album.date}</small> */}
                    {/* {song._id} */}
                  </Card.Footer>

                </Card>
              </div>

            ))}
          </div>
        ) : (
            <h3>No albums available.</h3>
          )}

        <ReactJkMusicPlayer

          {...options}
        // onAudioPlay={chargeListenerToken}
        // onAudioPause={skipChargeOnResume}
        />

      </div>
      
    </div>
    

    //   {state.albums.length ? (
    //     <CardColumns>
    //       {state.albums.map((album) => (
    //         <Card className="albumCard animate__animated animate__fadeIn" style={{ width: "18rem" }} key={album._id}>
    //           <Card.Img
    //             variant="top"
    //             src={album.art}
    //             style={{ height: "300px" }}
    //           />
    //           <Card.Body>
    //             <Card.Title>{album.title}</Card.Title>
    //             <Card.Text>{album.description}</Card.Text>
    //             <Button value={album._id} className="albumBtn" onClick={albumFunction}> Details </Button>
    //             {/* <Link to={"/albums/" + album._id}> */}
    //             <Details id={album._id} show={currentSong.modalShow} onHide={() => updateCurrentSong({ ...currentSong, modalShow: false })} />
    //             {/* </Link> */}
    //           </Card.Body>
    //           <Card.Footer>
    //             <small className="text-muted">Added {album.date}</small>
    //           </Card.Footer>
    //           <ReactJkMusicPlayer {...options} onAudioPlay={chargeListenerToken} onAudioPause={skipChargeOnResume} />
    //         </Card>
    //       ))}
    //     </CardColumns>
    //   ) : (
    //       <h3>No albums available.</h3>
    //     )}
    // </Container>
  );
}

export default AlbumList;
