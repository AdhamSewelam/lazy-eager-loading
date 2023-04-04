import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import './Posts.css';

const Posts = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/photos`).then((res) => {
      const imgs = res.data.map((photo) => photo.url);
      setImages(imgs);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '10px',
        }}
      >
        <div>
          <h1>Eager Loading</h1>
          <ul style={{ listStyleType: 'none', textAlign: 'center' }}>
            {images.map((url, index) => (
              <React.Fragment key={index}>
                <img src={url} alt={`URL ${index}`} />
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className="lazyLoading">
          <h1>Lazy Loading</h1>
          <ul style={{ listStyleType: 'none', textAlign: 'center' }}>
            {images.map((url, index) => (
              <React.Fragment key={index}>
                <LazyLoad key={index} height={200} once>
                  <li>
                    <img src={url} alt={`URL ${index}`} />
                  </li>
                </LazyLoad>
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Posts;
