import { useRef, useEffect, useState } from 'react';

export default function TestVideoComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState('Loading...');

  const testUrls = [
    'https://cdn.pixabay.com/video/2019/06/25/24687-343567659_large.mp4',
    'https://cdn.pixabay.com/video/2016/12/26/6946-196001617_large.mp4',
    'https://cdn.pixabay.com/video/2020/05/17/39886-420019291_large.mp4',
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://sample-videos.com/zip/10/mp4/480/BigBuckBunny_320x180_1mb.mp4'
  ];

  const [currentUrl, setCurrentUrl] = useState(testUrls[0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setStatus('Can play - attempting to start');
      video.play().then(() => {
        setStatus('Playing successfully');
      }).catch((err) => {
        setStatus(`Play failed: ${err.message}`);
      });
    };

    const handleError = () => {
      setStatus('Video failed to load');
    };

    const handleLoadStart = () => {
      setStatus('Load started...');
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
    };
  }, [currentUrl]);

  return (
    <div className="fixed top-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg max-w-sm">
      <h3 className="font-bold mb-2">Video Test</h3>
      <div className="mb-2">Status: {status}</div>
      
      <select 
        value={currentUrl} 
        onChange={(e) => setCurrentUrl(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      >
        {testUrls.map((url, i) => (
          <option key={i} value={url}>Test Video {i + 1}</option>
        ))}
      </select>

      <video
        ref={videoRef}
        src={currentUrl}
        className="w-full h-32 object-cover border rounded"
        muted
        loop
        playsInline
        controls
      />
      
      <div className="text-xs mt-2 break-all">{currentUrl}</div>
    </div>
  );
}