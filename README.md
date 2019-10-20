# To-Do List

An application for managing a simple to-do list.

## Installation

1. [Install Node.js](https://nodejs.org/en/download/)
2. Open the terminal
3. Use the command line to navigate to the project folder
    - Use the command `cd  ~/` and type the file path to the project after the forward slash `/`
4. Use the command line to install the following modules using the command `npm install`:
    - Express
    - body-parser
    - pg
5. Set up a database using Postgre for storing to-dos
    - I used [Postico](https://eggerapps.at/postico/) for the set-up
    - Create a database named `to_do_list`
    - Copy-paste the sequel commands in the database.sql file and run them for ease of use
6. Run the program using the following on the command line: `npm start`
    - If this doesn't work, try `node server/server.js`
7. Open a browser and head to [http://localhost:5000](http://localhost:5000).

## Usage

- Users can add to-dos to the list by typing into the last line of the list and hitting the "**Submit**" button on the right.
- Once they complete a task, they can click on the task text or the checkbox on the left and the task will be marked as complete. 
- If a user wants to delete a task permanently, they can click the "**Remove**" button on the right side.

![Preview](/images/preview.gif)