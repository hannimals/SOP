-- CreateTable
CREATE TABLE "user_profiles" (
    "user_id" UUID NOT NULL,
    "voice" VARCHAR(20) NOT NULL,
    "message_tone" VARCHAR(20) NOT NULL,
    "user_choice" BOOLEAN NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);
