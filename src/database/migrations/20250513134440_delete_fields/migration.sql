/*
  Warnings:

  - You are about to drop the column `high24h` on the `CryptoCurrency` table. All the data in the column will be lost.
  - You are about to drop the column `low24h` on the `CryptoCurrency` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CryptoCurrency" DROP COLUMN "high24h",
DROP COLUMN "low24h";
