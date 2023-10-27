-- CreateTable
CREATE TABLE "MatchRequest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "complexity" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "correlationId" TEXT NOT NULL,
    "replyTo" TEXT NOT NULL,

    CONSTRAINT "MatchRequest_pkey" PRIMARY KEY ("id")
);
