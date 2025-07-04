/*
  Warnings:

  - You are about to alter the column `image` on the `crypto_market` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `symbol` on the `crypto_market` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `trend` on the `crypto_market` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `tag` on the `crypto_market` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "crypto_market" ALTER COLUMN "image" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "symbol" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "trend" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "is_current" SET DEFAULT true,
ALTER COLUMN "tag" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE INDEX "idx_name" ON "crypto_market"("name");

-- CreateIndex
CREATE INDEX "idx_tag" ON "crypto_market"("tag");

-- CreateIndex
CREATE INDEX "idx_trend" ON "crypto_market"("trend");

-- CreateIndex
CREATE INDEX "idx_signal" ON "crypto_market"("signal");

-- CreateIndex
CREATE INDEX "idx_is_current" ON "crypto_market"("is_current");
