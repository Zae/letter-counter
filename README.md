# Vowels and Consonants

A silly application that counts the number of vowels and consonants in the sentence that you
type into the textarea. Also provides a top3 occurrences of each.

Uses only jQuery for DOM and event handling and lodash for utility functions.

# Running the app

Because the index.html file uses a relative url scheme it's not possible to simply open the index.html file
and start running it, because the relative path will be wrong.

## Gulp

You can use gulp to start a node.js web server that will recompile all assets and serve the application in your
browser, because this uses browser-sync it has the added benefit of synchronising the application between all
users that are connected, so you can test the application in multiple browsers at the same time. Also any changes to
the source code will immediately be reflected in your browser.

```
npm install && gulp #npm install is only needed the first time.
```

## PHP

Since PHP5.4, php has a build in development server that can be used to serve the application.

```
php -S localhost:1337 -t ./public/
```