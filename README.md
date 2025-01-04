<p align="center">
  <img src="https://github.com/Akash-Peace/REACT-CHART-GENERATIVE-AI/blob/main/Frontend/src/assets/project_logo.png" alt="Logo" width="150" height="150">
  <h3 align="center">Image to Chart</h3>
  <p align="center">
    <span><strong>Convert chart image to custom charts (BETA)</strong></span>
    <br />
    <br />
    <a href="https://image-to-chart.web.app/">View Webapp</a>
    ·
    <a href="https://github.com/Akash-Peace/REACT-CHART-GENERATIVE-AI/issues">Report Bug</a>
    ·
    <a href="https://github.com/Akash-Peace/REACT-CHART-GENERATIVE-AI/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#use-cases">Use Cases</a></li>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#powered-by">Powered By</a></li>
    <li><a href="#frontend-technology">Frontend Technology</a></li>
    <li><a href="#backend-technology">Backend Technology</a></li>
    <li><a href="#monorepo-management">Monorepo Management</a></li>
    <li><a href="#hosting-and-deployments">Hosting and Deployments</a></li>
    <li><a href="#advancements-in-multimedia-processing">Advancements in Multimedia Processing</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#development-environment">Development Environment</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

Image to Chart is a web application that allows users to upload chart image and convert them into fully customizable charts. The uploaded image is analyzed using generative AI to extract the underlying data, which is then utilized to recreate the chart. The application currently supports three chart types: Column, Bar, and Line charts. Users can edit the chart's x-axis and legends, as well as further enhance and personalize the chart with a wide range of customization options.

## Use Cases

* Customize online chart images: Tailor existing chart images with a wide range of configurable options.
* Enhance hand-drawn charts: Refine and improve charts captured from photographs or existing images.
* Generate versatile charts: Convert images into customizable charts and easily capture screenshots for various uses.

## Built With

* [React](https://react.dev/)
* [Highcharts](https://www.highcharts.com/)
* [Gemini](https://ai.google.dev/)
* [GraphQL](https://graphql.org/)
* [ExpressJS](https://expressjs.com/)
* [JavaScript](https://www.javascript.com/)
* [HTML](https://html.com/)
* [CSS](https://css-tricks.com/)

## Powered By

* [Apollo Client](https://www.apollographql.com/docs/react/)
* [Firebase](https://firebase.google.com/docs/hosting)
* [Vercel](https://vercel.com/)
* [React drag drop files](https://www.npmjs.com/package/react-drag-drop-files)
* [Lodash](https://lodash.com/)

## Frontend Technology

* Utilized React for web development, incorporating React Hooks and the Context API for efficient state management and sharing across components.
* Integrated Highcharts for data visualization, enabled extensive custom configurations to make chart more interactive.
* Implemented client-side caching to minimize analysis time and computational load, followed LRU mechanisms to manage cache effectively. Additionally, leveraged browser-built-in crypto hashing for optimal data caching.
* Used Apollo Client to manage GraphQL queries seamlessly.
* Integrated the react-drag-drop-files library to allow users to upload images and utilized Lodash for deep cloning, preventing unintended data mutations.

## Backend Technology

* Used ExpressJS in combination with GraphQL, managing and maintaining GraphQL schemas effectively.
* Leveraged Google's Generative AI (Gemini) to analyze images sent in Base64 format from the client.
* Performed prompt engineering to achieve accurate results, optimizing and refining prompts to minimize token usage and reduce billable costs in enterprise setups.
* Seperated system prompts to sequentially process each analysis based on intermediate outputs.
* Configured CORS to enable secure Cross-Origin Resource Sharing.

## Monorepo Management

* Both frontend and backend projects reside within the same git repository.
* Defined folder-specific paths to ensure isolated deployments for the frontend and backend.

## Hosting and Deployments

1.&nbsp;Frontend hosting on Firebase:

  * Deployed the frontend project on firebase.
  * Since firebase does not natively sync with repositories, I configured github actions for continuous integration and deployment (CI/CD).
* Set up a github actions workflow to build and deploy the frontend project based on updates to the frontend folder.
* Ensured that only the frontend project is deployed when the frontend folder is modified, while the backend remains unaffected.

2.&nbsp;Backend hosting on Vercel:

* Deployed the backend project on vercel.
* Synced vercel directly with the git repository.
* Configured vercel deployment rules to target the backend folder within the monorepo.
* Established deployment rules such that updates to the backend folder trigger vercel deployments, while github actions remain inactive.

## Advancements in Multimedia Processing

[OpenCV](https://opencv.org/) was my go-to tool in my past couple of projects focused on media extraction, I used it extensively for all my image and video processing needs. However for my current project centered on image data extraction, Generative AI has proven to be a game changer.

* There is no longer a need to write complex code for reading, processing, filtering, and tuning images.
* Traditional algorithmic analysis to achieve context-based data extraction is no longer required.
* With generative AI, the focus shifts to framing the prompts, providing relevant context, and interacting with the LLM model.
* AI handles all levels of image processing and delivers accurate results.
* It significantly reduces the time and effort previously spent on manual image processing.
* Additionally, prompt optimization ensures better control over the results.

While generative AI has transformed my approach to media data extraction but OpenCV remains a valuable tool, particularly for foundational image processing tasks and real-time applications that require precise algorithmic control.

## Screenshots

View [Screenshots](https://github.com/Akash-Peace/REACT-CHART-GENERATIVE-AI/tree/main/Screenshots) here.

## License

Distributed under the MIT License. See [LICENSE](https://github.com/Akash-Peace/REACT-CHART-GENERATIVE-AI/blob/main/LICENSE) for more information.

<!-- MY SYSTEM SPEC -->
## Development Environment

**OS:** [Ubuntu](https://ubuntu.com/)\
**System:** Customized PC\
**Processor:** Intel i5 13th gen\
**Ram:** DDR5 16GB\
**Disk:** NVMe 100GB

## Contact

Akash A\
Computer Science Engineer\
akashcse2000@gmail.com\
8608550403\
Chennai, TN, India

Follow me on

[<img src='https://github.com/Akash-Peace/INDUSTRIAL-WEBSITE/blob/main/images/linkedin.png' alt='linkedin' height='40'>](https://www.linkedin.com/in/akash-2000-cse) &nbsp; &nbsp; &nbsp; [<img src='https://github.com/Akash-Peace/INDUSTRIAL-WEBSITE/blob/main/images/instagram.png' alt='instagram' height='40'>](https://www.instagram.com/akash.a.2000) &nbsp; &nbsp; &nbsp; [<img src='https://github.com/Akash-Peace/INDUSTRIAL-WEBSITE/blob/main/images/facebook.png' alt='facebook' height='40'>](https://www.facebook.com/profile.php?id=100061841000593) &nbsp; &nbsp; &nbsp; [<img src='https://github.com/Akash-Peace/REACT-CHART-GENERATIVE-AI/blob/main/Test%20images/twitter.png' alt='twitter' height='40'>](https://twitter.com/AkashA53184506) &nbsp; &nbsp; &nbsp; [<img src='https://github.com/Akash-Peace/INDUSTRIAL-WEBSITE/blob/main/images/pypi.png' alt='pypi' height='50'>](https://pypi.org/user/Akash-Peace/) &nbsp; &nbsp; &nbsp; [<img src='https://github.com/Akash-Peace/INDUSTRIAL-WEBSITE/blob/main/images/youtube.png' alt='youtube' height='45'>](https://www.youtube.com/channel/UCmugCO6k7hgSZqaI1jzbelw/featured)
