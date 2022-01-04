#Query for creating folders table 
- CREATE TABLE `gdrive`.`folders` ( `id` VARCHAR(10) NOT NULL , `user_id` INT NOT NULL DEFAULT '1' , `folder_name` VARCHAR(200) NOT NULL DEFAULT 'Untitled folder' , `parent_folder` VARCHAR(200) NOT NULL , `children` VARCHAR(30000) NOT NULL DEFAULT '[]' , PRIMARY KEY (`id`)) ENGINE = InnoDB;

#Query for creating notepad table
- CREATE TABLE `gdrive`.`notepads` ( `id` VARCHAR(10) NOT NULL , `file_name` VARCHAR(200) NOT NULL DEFAULT 'Untitled notepad' , `font_size` INT NOT NULL DEFAULT '18' , `font_family` VARCHAR(50) NOT NULL DEFAULT 'sans-serif' , `bold` BOOLEAN NOT NULL DEFAULT FALSE , `italic` BOOLEAN NOT NULL DEFAULT FALSE , `content` VARCHAR(30000) NOT NULL DEFAULT '' , `parent` VARCHAR(30) NOT NULL , `ext` VARCHAR(10) NOT NULL DEFAULT '.txt' , `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;

