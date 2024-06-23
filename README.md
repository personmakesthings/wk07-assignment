# wk07-assignment
This is for the following assignment: Week 7 - Build a Database Driven Full Stack React & Express App.


Deployed on Render:
- Client: https://wk07-assignment-client.onrender.com/
- Server, root route: https://wk07-assignment-server.onrender.com
    - "/posts" route: https://wk07-assignment-server.onrender.com/posts



Other links for README.md:
- [Copy of SQL code](./README/SQL-code.sql)
- [Front page wireframe](./README/wireframe_pg1.png)



# Reflection

As of this project, I think I'm starting to push my limits with coding and designing every aspect of a site by myself. I did not have the time to put extra effort into styling this week beyond making the website legible and to the point. Otherwise, I wouldn't have been able to properly focus on the functionality of the website and understanding React, Supabase, and PostgreSQL.

Also, React Router just kinda feels nice from a UX perspective. Being able to see pages dynamically swap in and out while other aspects of the site stay loaded in just feels cool for some reason. When I have a chance to play around and research styling more, I'm wondering if I could make pages fade in and out, or put any kind of transition between them? Other than that, I would have liked to have tried out more features with the package, but we didn't get around to covering it beyond setting up basic routes, unfortunately.


### Some features I implemented
- I managed to get category sorting of posts working on the website. I did it by setting up a database query on the server-side which can take a category ID in its URL. I then set up buttons on the client that can change the value of that URL in the `fetch` request client-side, which causes a set of posts selected by category to be fetched and rendered on the page.

- There's a route on the server-side which can delete posts in the submission tables by their ID, with a button on each post that lets the user delete it. Obviously, this is a crude implementation of this feature that's open to abuse; anyone who knows the delete route can send a delete request. In the future, I would want to have accounts set up so that only users with certain privileges (e.g., admin or moderator accounts, or the user who made the post) can perform certain actions on posts.

- My database has a junction table which links together submissions by category using `FOREIGN KEY`. Due to this, I had to find a way to handle the following two things:
    - Deletion of posts would need to delete both the row in the submissions table, and also delete the row's related entry on the junction table. I found out that I could add the clause `ON DELETE CASCADE` when initially creating the tables to handle this.
    - When a user submits a new post/a new row is added to the submissions table, the junction table would have to be updated as well. I found that I could handle this with SQL functions, which you can conditionally set to trigger upon events occurring with the database, such as a row being inserted into one table. I've put notes all over the function and tried to break down the syntax to further understand it, but I didn't write this myself from scratch, I repurposed someone else's code from Stack Exchange. It works though.
    - Generally, I'm very curious to learn more about SQL in the future and getting the database itself to automate certain useful tasks.


### Issues
- There seems to be an issue with the way Render works with React Router: if you try to directly load a particular website path via the address bar, it causes a 404 Not Found error. I don't know why this occurs or how to correct it. As a stop-gap measure, I have set up redirects on the website that go to the home page if an attempt is made to load a page from its address directly, instead of showing a blank error page.

- The `useEffect` hooks with `fetch()` *constantly* make network requests to the server if the state variable they modify is placed in the dependency array. This can lead to several problems, such as performance issues and risking bandwidth limits. I removed the state variable to prevent this, but this caused other problems, such as not letting the posts automatically reload when a user deletes a post. I did a hack-y workaround by putting `location.reload()` in the delete post button, but I realise this is unideal and doesn't take advantage of state in React. I tried passing props between the parent/child components to get the page to refresh, but it didn't end up working, so I removed that code.

- I did have a 'technically working' like button for each post, but I removed it as I ran out of time trying to code a function that would disable it and store that disabled state in local storage (to prevent like spamming). This is why you will see a 'likes' column in the submissions table that has gone unused. I also think this is another thing that would be better handled by user accounts in the future.



And that's it for this week.