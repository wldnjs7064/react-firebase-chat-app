import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import firebase from "../../../firebase";
import { useSelector } from "react-redux";
function MessageForm() {
  const chatRoom = useSelector((state) => state.chatRoom.currentChatRoom);
  const user = useSelector((state) => state.user.currentUser);
  const [percentage, setPercentage] = useState(0);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesRef = firebase.database().ref("messages");
  const typingRef = firebase.database().ref("typing");
  const inputOpenImageRef = useRef();
  const storageRef = firebase.storage().ref();
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const isPrivateChatRoom = useSelector(
    (state) => state.chatRoom.isPrivateChatRoom
  );
  const createMessage = (fileURL = null) => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: user.uid,
        name: user.displayName,
        image: user.photoURL,
      },
    };
    if (fileURL !== null) {
      message["image"] = fileURL;
    } else {
      message["content"] = content;
    }
    return message;
  };
  const handleSubmit = async () => {
    if (!content) {
      setErrors((prev) => prev.concat("Type contents first"));
      return;
    }
    setLoading(true);

    try {
      await messagesRef.child(chatRoom.id).push().set(createMessage());
      typingRef.child(chatRoom.id).child(user.uid).remove();
      setLoading(false);
      setContent("");
      setErrors([]);
    } catch (error) {
      setErrors((pre) => pre.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([]);
      }, 5000);
    }
  };
  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };
  const getPath = () => {
    if (isPrivateChatRoom) {
      return `/message/private/${chatRoom.id}`;
    } else {
      return `/message/public`;
    }
  };
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];

    const filePath = `${getPath()}/${file.name}`;
    const metadata = { contentType: file.type };
    setLoading(true);

    try {
      let uploadTask = storageRef.child(filePath).put(file, metadata);
      uploadTask.on(
        "state_changed",
        (UploadTaskSnapshot) => {
          const percentage = Math.round(
            (UploadTaskSnapshot.bytesTransferred /
              UploadTaskSnapshot.totalBytes) *
              100
          );
          setPercentage(percentage);
        },
        (err) => {
          console.error(err);
          setLoading(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            messagesRef
              .child(chatRoom.id)
              .push()
              .set(createMessage(downloadURL));
            setLoading(false);
          });
        }
      );
    } catch (error) {
      alert(error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }

    if (content) {
      typingRef.child(chatRoom.id).child(user.uid).set(user.displayName);
    } else {
      typingRef.child(chatRoom.id).child(user.uid).remove();
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            onKeyDown={handleKeyDown}
            value={content}
            onChange={handleChange}
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Form>
      {!(percentage === 0 || percentage === 100) && (
        <ProgressBar
          variant="warning"
          label={`${percentage}%`}
          now={percentage}
        />
      )}

      <div>
        {errors.map((errorMsg) => (
          <p style={{ color: "red" }} key={errorMsg}>
            {errorMsg}
          </p>
        ))}
      </div>
      <Row>
        <Col>
          <button
            onClick={handleSubmit}
            className="message-form-button"
            style={{ width: "100%" }}
            disabled={loading ? true : false}
          >
            SEND
          </button>
        </Col>
        <Col>
          <button
            onClick={handleOpenImageRef}
            className="message-form-button"
            style={{ width: "100%" }}
            disabled={loading ? true : false}
          >
            UPLOAD
          </button>
        </Col>
      </Row>
      <input
        accept="image/jpeg, image/png"
        style={{ display: "none" }}
        type="file"
        ref={inputOpenImageRef}
        onChange={handleUploadImage}
      />
    </div>
  );
}

export default MessageForm;
