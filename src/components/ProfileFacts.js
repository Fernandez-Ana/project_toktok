
import { Link } from 'react-router-dom';

// Import - Images -----------------------------------

import profile_image from "../resource/images/Ellipseprofile_image_small.png";
import profile_edit_icon from "../resource/icons/Edit Squareprofile_image_edit_icon.png";

// ---------------------------------------------------

const ProfileFacts = ({ click, setClick }) => {
  return (
    <div>
      <article className="profile_article">
        <div className="image-container">
          <img
            src={profile_image}
            className="profile_img"
            alt="profile_image_user"
          />
         <Link to="/editprofile"><img src={profile_edit_icon} className='edit_icon' alt="edit_icon" /></Link>
        </div>
        <h1>John Doe</h1>
        {!click ? <h3>UI/UX Designer</h3> : ""}
        {!click ? (
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio magni
            totam, harum exercitationem accusamus facere praesentium expedita.
          </p>
        ) : (
          ""
        )}
        {!click ? <p>www.toktok.com</p> : ""}
      </article>
      {!click ? (
        <section className="follower_section">
          <div className="posts">
            <h5>356</h5>
            <p>Posts</p>
          </div>
          <div className="followers">
            <h5>46,379</h5>
            <p>Followers</p>
          </div>
          <div className="following">
            <h5>318</h5>
            <p>Following</p>
          </div>
        </section>
      ) : (
        ""
      )}
      <div className="follower_section_line"></div>
    </div>
  );
};

export default ProfileFacts;
