import {ConsoleLogger, DefaultDeviceController, LogLevel} from 'amazon-chime-sdk-js';
import {useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';


export default function Home() {
  const videoRef = useRef();
  const location = useLocation();

  let dc; 
  async function startVideoPreview() {
    dc = new DefaultDeviceController(new ConsoleLogger('test-device-controller', LogLevel.WARN), { enableWebAudio: false});
    const audioInputs = await dc.listAudioInputDevices();
    const videoInputs = await dc.listVideoInputDevices();
    const audioOutputs = await dc.listAudioOutputDevices();
    await dc.chooseAudioInputDevice(audioInputs[0].deviceId);
    await dc.chooseVideoInputDevice(videoInputs[0].deviceId);
    await dc.chooseAudioOutputDevice(audioOutputs[0].deviceId);
    dc.startVideoPreviewForVideoInput(videoRef.current);
  }

  async function stopVideoPreview(videoElement) {
    dc.stopVideoPreviewForVideoInput(videoElement);
    await dc.chooseAudioInputDevice(null);
    await dc.chooseVideoInputDevice(null);
    await dc.chooseAudioOutputDevice(null);
    dc = undefined;
  }
  
  useEffect(() => {
    // This is important. We need to store the ref created since the useEffect's cleanup function runs after the component is un-mounted.
    // Since the "video" element un-mounts early, the ref.current will hold "null" and hence result in not cleaning of video correctly.
    const videoElement = videoRef.current;
    if (location.pathname.includes('home')) {
      startVideoPreview();
      return () => {
        stopVideoPreview(videoElement);
      }
    }
  }, [location.pathname]);

  return (
    <div className="Home">
      <h1>Home</h1>
      <div style={{width: '400px', height: '300px'}}>
        <video ref={videoRef}></video>
      </div>
    </div>
  )
}