-- AlterTable
ALTER TABLE `users` MODIFY `name` VARCHAR(255) NULL,
    MODIFY `otp` INTEGER NULL,
    MODIFY `otp_expiration_date` INTEGER NULL,
    MODIFY `phone_number` INTEGER NULL;
