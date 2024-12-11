-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hardskills" TEXT[],
    "softskills" TEXT[],
    "projects" TEXT[],

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");
