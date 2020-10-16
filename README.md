# URL Shortner
A URL shortener is a simple tool that takes a long URL and turns it a short URL.

It's much simpler to share Short URLs than a lengthy one.

Also, monitoring the effectivness of your links is in many cases the most important reason for using URL shortener
<br/>This data, about your clicks is extremely helpful when it comes to analyzing the effectivness of your content.
It's sometimes crucial to measure the effectiveness of your social media posts or a campaign.
### URL shortner service using Node.js, Express, and MonogDB


Visit the live website Here:
https://amey-url-shortner.herokuapp.com/

If you want to run the application at locally,
1. Clone the repository and run npm install in command line
2. Run 'npm start' in command line
3. Now open the application on Port 4000 or click the link at http://localhost:4000/

I have a database with 2 documents:
1. One document will store the User Details like name,email,password(hashed),and date(when the account was created)
* I have used passport to authenticate the user and protect certain routes
* Whenever the user comes, he will have to log in, if the account doesn't exist, the user will have to register and create an account

2. I have Other document with four fields:
* User id, Long URL and Short URL and Clicks(to show no. of clicks) 
* Just take any URL and click submit to shorten it.
* When a user logs in, his entire history with clicks will be shown.


<br> Whenever a User enters a URL and clicks the submit button, a ShortURL will be generated which will be hashed with the LongURL entered.
<br> Whenever a user clicks on the ShortURL, he will be redirected to the LongURL. 
