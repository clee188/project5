import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./userPhotos.css";

/**
 * Define UserPhotos, a React component of Project 4.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      user: null,
      loading: true,
      error: "",
    };
  }

  componentDidMount() {
    this.loadUserPhotos();
  }

  componentDidUpdate(prevProps) {
    const oldUserId = prevProps.match.params.userId;
    const newUserId = this.props.match.params.userId;

    if (oldUserId !== newUserId) {
      this.loadUserPhotos();
    }
  }

  loadUserPhotos() {
    const userId = this.props.match.params.userId;

    this.setState({
      loading: true,
      error: "",
      photos: [],
      user: null,
    });

    Promise.all([
      axios.get(`/photosOfUser/${userId}`),
      axios.get(`/user/${userId}`),
    ])
      .then(([photosResponse, userResponse]) => {
        this.setState({
          photos: photosResponse.data,
          user: userResponse.data,
          loading: false,
        });

        if (this.props.setTopBarContext && userResponse.data) {
          this.props.setTopBarContext(
            `Photos of ${userResponse.data.first_name} ${userResponse.data.last_name}`
          );
        }
      })
      .catch((err) => {
        const message =
          err.response
            ? `Failed to load photos: ${err.response.statusText || err.response.status}`
            : `Failed to load photos: ${err.message || "Unknown error"}`;
        this.setState({
          error: message,
          loading: false,
        });
      });
  }

  static formatDate(dateString) {
    return new Date(dateString).toLocaleString();
  }

  renderComments(comments) {
    if (!comments || comments.length === 0) {
      return <p className="no-comments">No comments yet.</p>;
    }

    return comments.map((comment) => (
      <div key={comment._id} className="comment-card">
        <div className="comment-header">
          <Link to={`/users/${comment.user._id}`} className="comment-user-link">
            {comment.user.first_name} {comment.user.last_name}
          </Link>
          <span className="comment-date">{this.UserPhotos.formatDate(comment.date_time)}</span>
        </div>
        <p className="comment-text">{comment.comment}</p>
      </div>
    ));
  }

  render() {
    const { photos, user, loading, error } = this.state;

    if (loading) {
      return <div className="user-photos-container">Loading photos...</div>;
    }

    if (error) {
      return <div className="user-photos-container error-text">{error}</div>;
    }

    return (
      <div className="user-photos-container">
        {user && (
          <div className="photos-page-header">
            <h2>
              Photos of {user.first_name} {user.last_name}
            </h2>
          </div>
        )}

        {photos.length === 0 ? (
          <p>No photos found for this user.</p>
        ) : (
          photos.map((photo) => (
            <div key={photo._id} className="photo-card">
              <img
                src={`../../images/${photo.file_name}`}
                alt="User upload"
                className="photo-image"
              />

              <div className="photo-meta">
                <span className="photo-date">
                  Posted: {this.UserPhotos.formatDate(photo.date_time)}
                </span>
              </div>

              <div className="comments-section">
                <h3>Comments</h3>
                {this.renderComments(photo.comments)}
              </div>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default UserPhotos;
