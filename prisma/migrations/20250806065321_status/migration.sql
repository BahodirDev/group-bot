/*
  Warnings:

  - The values [CANCEL] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."UserStatus_new" AS ENUM ('NEW', 'PROCESS', 'DONE', 'CANCELED');
ALTER TABLE "public"."users" ALTER COLUMN "status" TYPE "public"."UserStatus_new" USING ("status"::text::"public"."UserStatus_new");
ALTER TYPE "public"."UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "public"."UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "public"."UserStatus_old";
COMMIT;
