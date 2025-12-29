ALTER TABLE `contests` ADD `description` varchar(500);--> statement-breakpoint
ALTER TABLE `users` ADD `totalPoints` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `contests` DROP COLUMN `entryFee`;--> statement-breakpoint
ALTER TABLE `contests` DROP COLUMN `prizePool`;