-- CreateTable
CREATE TABLE "websites" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "keywords" TEXT[],

    CONSTRAINT "websites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "websites_name_key" ON "websites"("name");

-- CreateIndex
CREATE UNIQUE INDEX "websites_link_key" ON "websites"("link");
