
# FemSTEM
A web application that serves as an inclusive, supportive tech community focusing strictly on women and non-binaries. Our app offers mentorship opportunities, women-led tutorials, a hall of fame section and an opportunity of finding other female or non-binary teammates.

### Demo link
https://fem-stem.herokuapp.com/

Our official Fem STEM Discord server:
https://discord.com/invite/CBteqBHz3b

## Features we've implemented
- Our Fem STEM homepage has a list of introductory materials and a few links to donate in organizations who are empowering young women in the tech industry.
- In the Help section, users (mentors) can create group doubt solving threads for helping other members of the community with their tech doubts.
- Tutorials section to fetch only women made tech tutorials on relevant topics.
- Opportunities section for users to add hackathon or other opportunities to help others.
- Also, a Hall of Fame section highlighting our users' achievements.
- Profile dashboard to display all details.
- UserWay plugin to make our web app more accessible to users with visual impairment or other similar issues.

## How we built it
- Front-end was designed using Express, CSS3, Javascript, Jquery and Bootstrap framework.
- Back-end was supported using Node.js
- We used the Youtube Data v3 API for fetching the women made tech tutorials.
- MongoDB database is used to store the registered users and their details as well as the groups and their comments for the mentor/mentee page.
- We used bcrypt.js to hash the passwords in our database to ensure security of out users against any kind of data breach
- We used passport.js to authenticate our users
- We used UserWay plugin to make our web app more accessible to users with visual impairment or other similar issues.
- We used Canva to create our app logo as well as all the designs used on our web page.
- We used Heroku to host our web app.


## How to run on your local machine?
- Please make sure that you already have Node.js installed in your system.
- Next, type: 
`git clone https://github.com/Swatilekha-Roy/Fem-STEM` on your command prompt.
- Once your repo is cloned, run `npm i` on yiur prompt.
- Type `node app.js` or `npm run dev` (latter suggested) on your prompt.
- The app must be running on `localhost:3000` on your system. 
- Open any broswer and type `localhost:3000` and enjoy. :)
