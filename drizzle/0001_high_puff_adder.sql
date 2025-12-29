CREATE TABLE `contest_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contestId` int NOT NULL,
	`userId` int NOT NULL,
	`teamId` int NOT NULL,
	`points` decimal(8,2) DEFAULT '0',
	`rankPosition` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contest_entries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` varchar(128) NOT NULL,
	`name` varchar(255) NOT NULL,
	`entryFee` int NOT NULL DEFAULT 0,
	`prizePool` int NOT NULL DEFAULT 0,
	`maxEntries` int NOT NULL DEFAULT 100,
	`currentEntries` int NOT NULL DEFAULT 0,
	`status` enum('upcoming','live','completed') NOT NULL DEFAULT 'upcoming',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `team_players` (
	`id` int AUTO_INCREMENT NOT NULL,
	`teamId` int NOT NULL,
	`playerId` varchar(128) NOT NULL,
	`playerName` varchar(255),
	`playerRole` varchar(64),
	`credits` decimal(4,2) DEFAULT '8.0',
	CONSTRAINT `team_players_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_teams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`matchId` varchar(128) NOT NULL,
	`name` varchar(255) NOT NULL,
	`captainId` varchar(128) NOT NULL,
	`viceCaptainId` varchar(128) NOT NULL,
	`totalCreditsUsed` decimal(5,2) NOT NULL DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_teams_id` PRIMARY KEY(`id`)
);
