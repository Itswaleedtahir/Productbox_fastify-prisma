/*
  Warnings:

  - A unique constraint covering the columns `[phone_number]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `user_name_key` ON `user`;

-- CreateIndex
CREATE UNIQUE INDEX `user_phone_number_key` ON `user`(`phone_number`);
