import React, { useState, useEffect } from "react";
import "../css/home.css";
import "../css/likeButton.css";
import axios from "axios";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import "../css/commentButton.css";
import toktokLogo from "../resource/logos/toktokLogo.png";
import Heart from "../resource/images/Heart.png";
import redHeart from "../resource/images/redHeart.png";
import FooterNavbar from "../components/FooterNavbar";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import { GoHeart } from "react-icons/go";
import CustomizedSwitches from "../components/CustomizedSwitches";
import { Link, useNavigate } from "react-router-dom";

function Home({ darkLight, setDarkLight }) {
 

  const [clickHeart, setClickHeart] = useState(true);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
        console.log(response);
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten", error);
      }
    };
    console.log(posts);
    fetchPosts();
  }, []);

  // const handleCommentClick = (userName) => {
  //   const filteredPerson = persons.find((p) => p.username === userName);
  //   console.log(filteredPerson);
  //   navigate("/commentsPage", { state: { person: filteredPerson } });
  // };

  const handleCommentClickDB = (id) => {
    const filteredPerson = posts.find((post) => post._id === id);
    console.log(filteredPerson);
    navigate("/commentsPage", { state: { post: filteredPerson } });
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

      <main className="home-main">
        <section className="main-section">
          <div key={posts._id} className="person-main-container">
            {posts.map((post) => {
              console.log(post?.user?.avatar);
              return (
                <div key={post._id} className="post-container">
                  <section className="header-section">
                    <Link to="/settingsPage" className="settings-container">
                      {darkLight ? (
                        <img src={commentButton1} alt="commentButton1" />
                      ) : (
                        <img src={commentButton2} alt="commentButton2" />
                      )}
                    </Link>
                  </section>
                  <div className="person-left-side">
                    <img
                      src={post?.user?.avatar}
                      alt="photo1"
                      className="person-photo"
                    />
                    <div className="name-box">
                      <h3 className="name">{post?.user?.name}</h3>
                      <h5 className="position">{post?.user?.activity}</h5>
                    </div>
                  </div>
                  <div className="post-header">
                    <h3 className="post-author">{post.name}</h3>
                  </div>
                  <img
                    src={post.image}
                    alt="user-avatar"
                    className="user-avatar"
                  />
                  <LikeButton
                    person={posts}
                    setPersons={setPosts}
                    id={posts._id}
                  />
                  <CommentButton
                    post={post}
                    darkLight={darkLight}
                    setDarkLight={setDarkLight}
                    handleCommentClickDB={handleCommentClickDB}
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* <section className="main-footer-section">
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
        </section> */}

        {/* <div className="scrollable">
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
        </div> */}
      </main>

      <FooterNavbar />
    </div>
  );
}

export default Home;
