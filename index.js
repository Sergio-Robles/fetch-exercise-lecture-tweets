document.addEventListener("DOMContentLoaded", () => {

  const TWEETS_URL = "http://localhost:3000/tweets";

  const tweetsList = document.querySelector("ul");
  const form = document.querySelector("form");


  fetch(TWEETS_URL)
    .then(response => {
      return response.json();
    })
    .then(tweets => {
      displayTweets(tweets);
    });

    const displayTweets = tweets => {
      tweets.forEach(tweet => displayTweet(tweet)
      )};
      
      
        const displayTweet = tweet => {

          const li = document.createElement("li");

          li.innerText = `${tweet.content}`;

          const likeButton = document.createElement("button")
          likeButton.style.background = "green"
          likeButton.innerText = tweet.likes

          likeButton.addEventListener("click", () => {
            tweet.likes++;
            console.log("like this tweet", tweet);

            fetch(`${TWEETS_URL}/${tweet.id}`, {
              method: "PATCH",
              body: JSON.stringify({ likes: tweet.likes }),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            }).then(likeButton.innerText = tweet.likes)
          });

          const deleteButton = document.createElement("button");

          deleteButton.innerText = "X";

          deleteButton.style.background = "red";
          deleteButton.style.color = "white";

          // EVENTS BUBBLE UP
          deleteButton.addEventListener("click", event => {
            event.stopPropagation();
            console.log("delete the tweet", tweet);

            li.remove();

            fetch(`${TWEETS_URL}/${tweet.id}`, {
              method: "DELETE"
            });
          });

          li.append(likeButton, deleteButton);

          tweetsList.append(li);
        };
    

        form.addEventListener("submit", event => {
          event.preventDefault();
          console.log(event.target);
          const contentField = event.target.content;
          const userField = event.target.user;
          const likesField = event.target.likes;
          const retweetsField = event.target.retweets;
          //   {
          //     "id": 1,
          //     "user": "trump",
          //     "content": "corona isn't real",
          //     "likes": 55535,
          //     "retweets": 12040
          //   },

          const newTweet = {
            user: userField.value,
            content: contentField.value,
            likes: likesField.value,
            retweets: retweetsField.value
          };
          console.log("form is submitted", newTweet);

          //   method: HTTP method or verb to use in thie request
          //   body: the data we are sending
          //   headers: telling the server something at the start of the request
          //   processing

          //   application/json is as MIMEType

          fetch(TWEETS_URL, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newTweet)
          }).then(displayTweet(newTweet));
      });

      JSON.parse("{}");

})
