>### Tech-stack
    Front-end: React
    Back-end: Express.js
    Database: MySQL
    (with XAMPP as the web server)

>### Tables

1. **folders**

    Query to create the table:
    ```
    CREATE TABLE `folders` (
    `id` varchar(10) NOT NULL,
    `user_id` int(11) NOT NULL DEFAULT 1,
    `folder_name` varchar(200) NOT NULL DEFAULT 'Untitled folder',
    `parent_folder` varchar(200) NOT NULL,
    `creation_date` bigint(30) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ```

2. **notepads**

    Query to create the table:
    ```
    CREATE TABLE `notepads` (
    `id` varchar(10) NOT NULL,
    `user_id` int(11) NOT NULL DEFAULT 1,
    `file_name` varchar(200) NOT NULL DEFAULT 'Untitled notepad',
    `font_size` int(11) NOT NULL DEFAULT 18,
    `font_family` varchar(50) NOT NULL DEFAULT 'sans-serif',
    `bold` tinyint(1) NOT NULL DEFAULT 0,
    `italic` tinyint(1) NOT NULL DEFAULT 0,
    `content` mediumtext NOT NULL DEFAULT '',
    `parent_folder` varchar(30) NOT NULL,
    `ext` varchar(10) NOT NULL DEFAULT '.txt',
    `creation_date` bigint(20) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ```

3. **Media**

    Query to create the table:
    ```
    CREATE TABLE `media` (
    `id` varchar(10) NOT NULL,
    `user_id` int(11) NOT NULL DEFAULT 1,
    `file_name` varchar(50) NOT NULL,
    `url` mediumtext NOT NULL,
    `parent_folder` varchar(10) NOT NULL,
    `ext` varchar(10) NOT NULL,
    `formatted_date` varchar(20) NOT NULL,
    `creation_date` bigint(20) NOT NULL,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ```
    

> ### Current list of features:

1. **Google Drive UI**
    - 1.1: Display data in a Last-Created-First-Displayed fashion

2. **Folders**
    - 2.1: Create folders

    - 2.2: Create nested sub-folders

    - 2.3: Rename folders

    - 2.4: Delete folders (with all of its sub-folders and sub-files)

3. **Notepads**
    - 3.1: Open new Notepad

    - 3.2: Edit notepad content

    - 3.3: Edit notepad style

            3.3.1: Change font family

            3.3.2: Change font size

            3.3.3: Make text bold and revert it back to normal

            3.3.4: Make text italic and revert it back to normal

            3.3.5: Rename file
    
    - 3.4: Save Notepad in the database

4. **Search**
    - 4.1: Real-time search inside the current folder

    - 4.2: Clear search bar button   

5. **Media**
    - 5.1: Save Images in the database
        
> ### How to run the application:

- Install NPM, XAMPP, and git on your device
- Open XAMPP and start Apache and MySql servers
- Create the necessary tables
    - You may use phpMyAdmin GUI create the tables or the queries given above
- Clone the respository by running `git clone https://github.com/arindamkeswani/Google-Drive.git`
- Navigate to Backend folder using the terminal
    - run `npm install` to install all the dependencies
    - run `npm start` to start the server
- Navigate to frontend folder using the terminal
    - run `npm install` to install all the dependencies
    - run `npm start` to run react's scripts. This will open the UI on your browser.


