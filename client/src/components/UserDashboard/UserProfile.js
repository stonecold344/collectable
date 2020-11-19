import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import { uploadAvatar } from "../../api/auth";
import { showErrMessage, showSuccessMessage } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import { getUser } from "../../api/auth";

const UserProfile = () => {
  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    getUser(user._id)
      .then((res) => {
        console.log(res);
        setUserInfo({
          ...res.data,
          firstName: res.userData.firstName,
          lastName: res.userData.lastName,
          username: res.userData.username,
          email: res.userData.email,
          avatar: res.userData.avatar.data,
        });
      })
      .catch((err) => console.log(err));
  }, [user._id]);

  console.log(userInfo);

  const handleMessages = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
  };
  const onChangeImage = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    setPreview(null);
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onSubmitImage = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      uploadAvatar(preview)
        .then((res) => {
          console.log(res);
          setLoading(false);
          setPreview(null);
          getUser(user._id)
            .then((res) => {
              console.log(res);
              setUserInfo({
                ...res.data,
                firstName: res.userData.firstName,
                lastName: res.userData.lastName,
                username: res.userData.username,
                email: res.userData.email,
                avatar: res.userData.avatar.data,
              });
            })
            .catch((err) => console.log(err));
          setSuccessMsg("Avatar uploaded!");
        })
        .catch((err) => {
          console.log(err)
          setLoading(false);
          setPreview(null);
          setErrorMsg("Error! Image is too large !");
        });
    } catch (err) {
      console.log("Upload image error:", err);
      setErrorMsg("Upload image error !");
    }
  };

  return (
    <div
      className="d-flex container justify-content-center my-3"
      onClick={handleMessages}
    >
      <div className="card border border-dark rounded">
        <div className="card-header">
          <div className="card-img">
            <div className="flip-card d-flex justify-content-center">
              <div className="flip-card-inner">
                <div className="flip-card-front d-flex justify-content-center">
                  {userInfo.avatar === null ? (
                    <img
                      src="../../images/user-image.png"
                      alt="Avatar"
                      className="border border-dark rounded"
                      style={{ width: "300px", height: "300px" }}
                      id="avatar-image"
                    />
                  ) : (
                    <img
                      src={userInfo.avatar}
                      alt="Avatar"
                      className="border border-dark rounded avatar-img"
                    //   style={{ width: "300px", height: "300px" }}
                      id="avatar-image"
                    />
                  )}
                </div>
                <div className="flip-card-back ">
                  {errorMsg && showErrMessage(errorMsg)}
                  {successMsg && showSuccessMessage(successMsg)}
                  {loading ? (
                    <div className="text-center pb-4">{showLoading()}</div>
                  ) : (
                    <Fragment>
                      <div
                        className="text-center color-dark py-1 text-capitalize"
                        id="avatar-img"
                      >
                        change your avatar
                      </div>
                      <div className="custom-file py-1">
                        <form
                          onSubmit={onSubmitImage}
                          encType="multipart/form-data"
                        >
                          <input
                            type="file"
                            className="custom-file-input"
                            name="avatarImage"
                            onChange={onChangeImage}
                          />
                          <label
                            className="custom-file-label"
                            style={{ textAlign: "left" }}
                          >
                            {/* <span>
                              {avatarImage === null
                                ? "Choose file"
                                : "File ready"}
                            </span> */}
                          </label>
                          <button className="btn btn-info btn-sm" type="submit">
                            Change
                          </button>
                        </form>
                      </div>
                      <div className="avatar-preview ">
                        {preview !== null ? (
                          <img
                            src={preview}
                            alt="preview"
                            className="responsive border border-dark rounded"
                            style={{ width: "150px", height: "150px" }}
                          />
                        ) : null}
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="card-content">
            <div className="card-title text-center">
              <h4>
                <strong>Your Profile</strong>
              </h4>
            </div>
            <div className="row d-flex justify-content-center align-items-center ">
              <label className="text-capitalize mx-3 text-center ">
                first name:{" "}
                <div className="text-info">{userInfo.firstName}</div>
              </label>
              <label className="text-capitalize mr-2 text-center">
                last name: <div className="text-info">{userInfo.lastName}</div>
              </label>
              <label className="text-capitalize mx-3 text-center">
                Username: <div className="text-info">{userInfo.username}</div>
              </label>
              <label className="text-capitalize mr-2 text-center">
                E-Mail: <div className="text-info">{userInfo.email}</div>
              </label>
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
