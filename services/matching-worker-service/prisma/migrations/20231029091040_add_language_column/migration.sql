/*
  Warnings:

  - Added the required column `language` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "language" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MatchRequest" ADD COLUMN     "languages" TEXT[];
