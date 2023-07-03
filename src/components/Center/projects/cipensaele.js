import React from 'react';
import ImageGallery from 'react-image-gallery';
import First from '../../images/1.png'
import Second from '../../images/2.png'
import Third from '../../images/3.png'

function Cipensaele() {
  const images = [
    {
      original: First,
      thumbnail: First,
      originalWidth: '10rem',
      thumbnailWidth: '20px',
    },
    {
      original: Second,
      thumbnail: Second,
      originalWidth: '10rem',
      thumbnailWidth: '20px',
    },
    {
      original: Third,
      thumbnail: Third,
      originalWidth: '10rem',
      thumbnailWidth: '20px',
    },
  ];


  return (
    <>
      <h3 className='center-title'>Ci Pensa Ele</h3>
      <div className='project-description'>
        <p>This application is a web-based calendar and scheduling system that consists of a React frontend and a Node.js backend. The frontend is responsible for rendering the user interface and handling user interactions, while the backend handles the logic and data management.
          <br /><br />
          The React frontend utilizes components and state management to create a responsive and interactive user interface. It includes features such as displaying a calendar view, scheduling appointments, managing reservations, and generating reports. The frontend communicates with the backend through HTTP requests to fetch and update data.
          <br /><br />
          On the backend, Node.js is used to build a server-side application that handles the business logic and data operations. It provides APIs for the frontend to interact with, enabling functionalities such as creating, updating, and deleting calendar events, managing user authentication and authorization, and handling various data-related operations. The backend communicates with a database to store and retrieve data securely.
          <br /><br />
          The application implements various features to enhance user experience and performance. Caching strategies are utilized to optimize data retrieval and minimize server requests. The application also incorporates encryption techniques to secure sensitive data, ensuring confidentiality and integrity.
          <br /><br />
          The <b>code</b> is hosted on my Github and is private.
        </p>
      </div>
      <div className='project-carousel'>
        <ImageGallery items={images} thumbnailPosition="bottom"
          showPlayButton={false}
          showThumbnails={false}
        />
      </div>
    </>
  );
}

export default Cipensaele;
