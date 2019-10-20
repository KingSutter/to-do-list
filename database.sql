CREATE TABLE to_dos(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"completed" boolean DEFAULT FALSE
);

INSERT INTO to_dos (task, completed) VALUES ('Drink coffee',TRUE);
INSERT INTO to_dos (task, completed) VALUES ('Drive home from school',FALSE);
INSERT INTO to_dos (task, completed) VALUES ('Workout and play basketball',FALSE);
INSERT INTO to_dos (task, completed) VALUES ('Get homework done',FALSE);