import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";

const StatusModal = () => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const refCanvas = useRef();
  const [tracks, setTracks] = useState("");

  const handleChangeImage = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      // console.log(file)
      if (!file) return (err = "File does not exist");
      if (file.type !== "image/jpeg" && file.type !== "image/jpge") {
        return (err = "Image format is incorrect");
      }

      return newImages.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index) => {
    // console.log(index);
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        }).catch((err) => console.log(err));

    }
  };

  const handleCapture = () => {
      const width = videoRef.current.clientWidth;
      const height = videoRef.current.clientHeight;

      refCanvas.current.setAttribute("width", width);
      refCanvas.current.setAttribute("height", height);
      const ctx = refCanvas.current.getContext("2d");
      ctx.drawImage(videoRef.current, 0,0, width, height)
      let URL = refCanvas.current.toDataURL()
      setImages([...images, {camera: URL}])

  }

  const handleStopStream = () => {
     tracks.stop()
     setStream(false)
  }

  return (
    <div className="status-modal">
      <form>
        <div className="status-header">
          <h5 className="m-0">Create Post</h5>
          <span
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS,
                payload: false,
              })
            }
          >
            &times;
          </span>
        </div>

        <div className="status-body">
          <textarea
            name="content"
            value={content}
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="show-images">
            {images.map((img, index) => (
              <div key={index} id="file-img">
                <img
                  src={img.camera ? img.camera : URL.createObjectURL(img)}
                  alt="images"
                  className="img-thumbnai rounded"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%" height="100%"
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
              />
              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{display:"none"}} />
            </div>
          )}
          <div className="input-images">
            {
              stream ? <i className="fas fa-camera" onClick={handleCapture} />
              : <>
              <i className="fas fa-camera" onClick={handleStream}/>
            <div className="file-upload">
              <i className="fas fa-images" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
                onChange={handleChangeImage}/>
            </div>

              </>
            }
            
          </div>
          
        </div>

        <div className="status-footer">
          <button className="btn btn-secondary w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
