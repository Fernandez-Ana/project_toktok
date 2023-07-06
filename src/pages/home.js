import React, { useState, useEffect } from "react";
import "../css/home.css";
import "../css/likeButton.css";
import axios from "axios";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import "../css/commentButton.css";
import commentButton3 from "../resource/images/commentButton3.svg";
import commentButton4 from "../resource/images/commentButton4.svg";
import toktokLogo from "../resource/logos/toktokLogo.png";
import Heart from "../resource/images/Heart.png";
import redHeart from "../resource/images/redHeart.png";
import annyPhoto from "../resource/images/annyPhoto.png";
import albertPhoto from "../resource/images/albertPhoto.png";
import himePhoto from "../resource/images/himePhoto.png";
import image1 from "../resource/images/image1.png";
import image2 from "../resource/images/image2.png";
import image3 from "../resource/images/image3.png";
import FooterNavbar from "../components/FooterNavbar";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import { GoHeart } from "react-icons/go";
import CustomizedSwitches from "../components/CustomizedSwitches";
import { Link, useNavigate } from "react-router-dom";

function Home({ darkLight, setDarkLight }) {
  const [persons, setPersons] = useState([
    {
      avatar: annyPhoto,
      username: "anny-wilson",
      activity: "Marketing Coordinator",
      mainImg: image1,
      heartImg: Heart,
      redHeartImg: redHeart,
      likeCount: 44389,
      commentCount: 26376,
      isLiked: false,
      content:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
    },
    {
      avatar: himePhoto,
      username: "hime-tonuki",
      activity: "Marketing Coordinator",
      mainImg: image2,
      heartImg: Heart,
      redHeartImg: redHeart,
      likeCount: 41381,
      commentCount: 19387,
      isLiked: false,
      content:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
    },
    {
      avatar: albertPhoto,
      username: "albert-hawkins",
      activity: "President of Sales",
      mainImg: image3,
      heartImg: Heart,
      redHeartImg: redHeart,
      likeCount: 55799,
      commentCount: 11336,
      isLiked: false,
      content:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam",
    },
  ]);
  const [clickHeart, setClickHeart] = useState(true);
  const [posts, setPosts] = useState({});
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

  // useEffect(() => {
  //   const getUserProfile = async () => {
  //     try {
  //       const response = await axios.get("/api/user");
  //       setUsers(response.data);
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Fehler beim Abrufen der Benutzerdaten", error);
  //     }
  //   };
  //   console.log(users);
  //   getUserProfile();
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/:user/posts");
        setPosts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten", error);
      }
    };
    console.log(posts);
    fetchPosts();
  }, []);

  const handleCommentClick = (userName) => {
    const filteredPerson = persons.find((p) => p.username === userName);
    console.log(filteredPerson);
    navigate("/commentsPage", { state: { person: filteredPerson } });
  };

  const handleCommentClickDB = () => {
    navigate("/commentsPage", { state: { person: users } });
  };

  const [clickLike, setClickLike] = useState(false);
  const [likeCount, setLikeCount] = useState(12);

  const handleLikeToggle = () => {
    if (clickLike) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setClickLike(!clickLike);
  };


  return (
    <div className="home-container">
      <header className="header">
        <div className="left-box">
          <img src={toktokLogo} alt="logo" className="logo" />
          <h1 className="title">TokTok</h1>
        </div>
        <CustomizedSwitches darkLight={darkLight} setDarkLight={setDarkLight} />

        <button
          className="main-heart-button"
          onClick={() => setClickHeart(!clickHeart)}
        >
          {clickHeart ? (
            <GoHeart
              size={27}
              style={{ color: !darkLight ? "white" : "black" }}
            />
          ) : (
            <img src={redHeart} alt="redHeart" />
          )}
        </button>
      </header>
      {/* <div>
        <img src={user.avatar} alt="" />
        <p>{posts[posts.length - 1]?.content}</p>
      </div> */}

      <main className="home-main">
        <div key={users._id} className="person-main-container">
          <section className="header-section">
            <div className="person-left-side">
              <img src={users.avatar} alt="photo1" className="person-photo" />
              <div className="name-box">
                <h3 className="name">{users.name}</h3>
                <h5 className="position">{users.activity}</h5>
              </div>
            </div>
            <Link to="/settingsPage" className="settings-container">
              {darkLight ? (
                <img src={commentButton1} alt="commentButton1" />
              ) : (
                <img src={commentButton2} alt="commentButton2" />
              )}
            </Link>
          </section>
        </div>

        <section className="main-section">
          <img src={posts[posts.length - 1]?.image} alt="image1" />
        </section>
        <section className="main-footer-section">
          <LikeButton person={posts} setPersons={setPosts} id={posts._id} />
          <CommentButton
            person={posts}
            darkLight={darkLight}
            setDarkLight={setDarkLight}
            onclick={handleCommentClickDB}
          />
          <div className="like-section">
            <div
              className="like-section"
              onClick={handleLikeToggle}
            >
              {clickLike ? (
                <img src={redHeart} alt="redHeart" />
              ) : (
                <GoHeart
                  size={27}
                  style={{ color: !darkLight ? "white" : "black" }}
                />
              )}
              <p>{likeCount}</p>
            </div>
          </div>


          <div className="comment-button-section">
            <Link to="/commentsPage" className="commentButtonLink">
              {darkLight ? (
                <img src={commentButton3} alt="commentButton3" />
              ) : (
                <img src={commentButton4} alt="commentButton4" />
              )}
            </Link>
            <p>2</p>
          </div>
        </section>

        <div className="scrollable">
          {persons.map((person, index) => (
            <div key={index} className="person-main-container">
              <section className="header-section">
                <div className="person-left-side">
                  <img
                    src={person.avatar}
                    alt="photo1"
                    className="person-photo"
                  />
                  <div className="name-box">
                    <h3 className="name">{person.username}</h3>
                    <h5 className="position">{person.activity}</h5>
                  </div>
                </div>
                <Link
                  to="/settingsPage"
                  className="settings-container"
                  // onClick={() => handleClickCommentButton(person.name)}
                >
                  {darkLight ? (
                    <img src={commentButton1} alt="commentButton1" />
                  ) : (
                    <img src={commentButton2} alt="commentButton2" />
                  )}
                </Link>
              </section>
              <section className="main-section">
                <img src={person.mainImg} alt="image1" />
              </section>
              <section className="main-footer-section">
                <LikeButton
                  person={person}
                  setPersons={setPersons}
                  index={index}
                />
                <CommentButton
                  person={person}
                  darkLight={darkLight}
                  onclick={handleCommentClick}
                />
              </section>
            </div>
          ))}
        </div>
      </main>

      <FooterNavbar />
    </div>
  );
}

export default Home;
