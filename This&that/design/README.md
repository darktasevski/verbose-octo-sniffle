Design Questions
==

## Guides

- https://github.com/donnemartin/system-design-primer
- https://www.palantir.com/2011/10/how-to-rock-a-systems-design-interview/

## Specific Topics

- URL Shortener
  - http://stackoverflow.com/questions/742013/how-to-code-a-url-shortener
  - http://blog.gainlo.co/index.php/2016/03/08/system-design-interview-question-create-tinyurl-system/
- Collaborative Editor
  - http://blog.gainlo.co/index.php/2016/03/22/system-design-interview-question-how-to-design-google-docs/
- Photo Sharing App
  - http://blog.gainlo.co/index.php/2016/03/01/system-design-interview-question-create-a-photo-sharing-app/
- Social Network Feed
  - http://blog.gainlo.co/index.php/2016/02/17/system-design-interview-question-how-to-design-twitter-part-1/
  - http://blog.gainlo.co/index.php/2016/02/24/system-design-interview-question-how-to-design-twitter-part-2/
  - http://blog.gainlo.co/index.php/2016/03/29/design-news-feed-system-part-1-system-design-interview-questions/
- Trending Algorithm
  - http://blog.gainlo.co/index.php/2016/05/03/how-to-design-a-trending-algorithm-for-twitter/
- Facebook Chat
  - http://blog.gainlo.co/index.php/2016/04/19/design-facebook-chat-function/
- Key Value Store
  - http://blog.gainlo.co/index.php/2016/06/14/design-a-key-value-store-part-i/
  - http://blog.gainlo.co/index.php/2016/06/21/design-key-value-store-part-ii/
- Recommendation System
  - http://blog.gainlo.co/index.php/2016/05/24/design-a-recommendation-system/
- Cache System
  - http://blog.gainlo.co/index.php/2016/05/17/design-a-cache-system/
- E-commerce Website
  - http://blog.gainlo.co/index.php/2016/08/22/design-ecommerce-website-part/
  - http://blog.gainlo.co/index.php/2016/08/28/design-ecommerce-website-part-ii/
- Web Crawler
  - http://blog.gainlo.co/index.php/2016/06/29/build-web-crawler/
- YouTube
  - http://blog.gainlo.co/index.php/2016/10/22/design-youtube-part/
  - http://blog.gainlo.co/index.php/2016/11/04/design-youtube-part-ii/
- Hit Counter
  - http://blog.gainlo.co/index.php/2016/09/12/dropbox-interview-design-hit-counter/

## Flow

**A. Understand the problem and scope:**

- Define the use cases, with interviewer's help
- Suggest additional features
- Remove items that interviewer deems out of scope
- Assume high availability is required, add as a use case

**B. Think about constraints:**

- Ask how many requests per month
- Ask how many requests per second (they may volunteer it or make you do the math)
- Estimate reads vs. writes percentage
- Keep 80/20 rule in mind when estimating
- How much data written per second
- Total storage required over 5 years
- How much data reads per second

**C. Abstract design:**

- Layers (service, data, caching)
- infrastructure: load balancing, messaging
- Rough overview of any key algorithm that drives the service
- Consider bottlenecks and determine solutions

Source: https://github.com/jwasham/coding-interview-university#system-design-scalability-data-handling

## Airbnb

- Design an Internationalization System.
- Rebuild Twitter from the ground up.

## Facebook

- Design recommended friends feature.
- Design the Google search bar that prompts you with suggestions as you type in it. These suggestions are not personalized but based on most popular queries in the past by all Google users. e.g. as you type "Fac" in the search bar the drop down prompts you with "Facebook" or "Facts about Great Britain" and so on based on recent most.
- Design a proximity service.
- Design a news feed that retrieves pictures on each post.
- Design a self-driving car with artificial intelligence.
- Design a chat architecture.
- How would you design a url-shortening service?
