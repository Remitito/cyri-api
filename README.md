**Can You Read It**

This is the back end of Can You Read It, a website that helps language teachers check their reading material is suitable for students and helps language learners find content at their level.

**Live Version**

The live version can be found at: https://can-you-read-it-atd5.onrender.com/

**Client / Front end**

Can You Read It's front end repo can be found here: https://github.com/Remitito/cyri-client

**Functions of the API**

- The words in the digital text sent via Axios from the frontend are compared to each CEFR vocabulary list stored on the backend, the lowest level that contains at least 80% of the words in the text is chosen as the difficulty level.
- The CEFR vocabulary list was built using web scraping and combining words found on other websites and documents; I could not find an existing official list.

**Tech Stack**

- Node and Express are used alongside Mongoose for interacting with MongoDB where the texts are user information is stored. Cheerio was used for web scraping to build the CEFR lists.
