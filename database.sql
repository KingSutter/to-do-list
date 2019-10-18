CREATE TABLE to_dos(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"completed" VARCHAR (80) DEFAULT 'false'
);