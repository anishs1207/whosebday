/*
  Warnings:

  - You are about to drop the column `date` on the `Birthday` table. All the data in the column will be lost.
  - Added the required column `day` to the `Birthday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Birthday` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Birthday" DROP COLUMN "date",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL;
