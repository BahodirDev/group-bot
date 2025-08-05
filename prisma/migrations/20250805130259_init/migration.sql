-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('PROCESS', 'CANCEL', 'DONE');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(26) NOT NULL,
    "phone" VARCHAR(26) NOT NULL,
    "company" VARCHAR(26) NOT NULL,
    "status" "public"."UserStatus" NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
