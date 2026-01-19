import { pgTable, serial, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';

export const movies = pgTable('movies', {
  id: serial('id').primaryKey(),
  make: text('make').notNull(),
  name: text('name').notNull(),
  year: integer('year').notNull(),
  price: numeric('price', {precision: 10, scale: 2}).notNull(),
  createdAt: timestamp('created_at').defaultNow()
});