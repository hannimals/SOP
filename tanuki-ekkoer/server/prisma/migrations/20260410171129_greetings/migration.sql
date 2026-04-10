-- CreateTable
CREATE TABLE "greeting_message" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "message_json" JSONB NOT NULL,
    "message_text" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "greeting_message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_messages_user_id" ON "greeting_message"("user_id");
