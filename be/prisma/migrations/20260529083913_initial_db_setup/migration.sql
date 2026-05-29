-- CreateTable
CREATE TABLE "url_shorteners" (
    "id" TEXT NOT NULL,
    "original_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "url_shorteners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "url_shorteners_short_url_original_url_idx" ON "url_shorteners"("short_url", "original_url");
