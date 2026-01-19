CREATE TABLE "movies" (
	"id" serial PRIMARY KEY NOT NULL,
	"make" text NOT NULL,
	"name" text NOT NULL,
	"year" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
