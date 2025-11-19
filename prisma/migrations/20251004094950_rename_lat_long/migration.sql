/*
  Warnings:

  - You are about to drop the column `lat` on the `Well` table. All the data in the column will be lost.
  - You are about to drop the column `long` on the `Well` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Well" DROP COLUMN "lat",
DROP COLUMN "long",
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;
