-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `user` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`updated_at` timestamp DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP,
	`created_at` timestamp DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);

*/