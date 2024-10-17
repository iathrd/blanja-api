/*
  Warnings:

  - You are about to drop the column `primaryAdress` on the `ShippingAddress` table. All the data in the column will be lost.
  - Added the required column `primaryAddress` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShippingAddress" DROP COLUMN "primaryAdress",
ADD COLUMN     "primaryAddress" BOOLEAN NOT NULL;
