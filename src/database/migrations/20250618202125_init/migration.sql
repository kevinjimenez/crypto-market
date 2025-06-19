-- CreateTable
CREATE TABLE "crypto_market" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "image" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "current_price" DOUBLE PRECISION NOT NULL,
    "high_1h" DOUBLE PRECISION NOT NULL,
    "low_1h" DOUBLE PRECISION NOT NULL,
    "avg" DOUBLE PRECISION NOT NULL,
    "signal" VARCHAR(1) NOT NULL,
    "trend" TEXT NOT NULL,
    "is_current" BOOLEAN NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "crypto_market_pkey" PRIMARY KEY ("id")
);
