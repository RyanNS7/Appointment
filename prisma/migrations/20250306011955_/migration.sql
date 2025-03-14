-- CreateTable
CREATE TABLE "CostumerPhone" (
    "phone" INTEGER NOT NULL,
    "validated" BOOLEAN NOT NULL,

    CONSTRAINT "CostumerPhone_pkey" PRIMARY KEY ("phone")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house_number" INTEGER,
    "Phone" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,
    "Phone" INTEGER NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CostumerPhone_phone_key" ON "CostumerPhone"("phone");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_Phone_fkey" FOREIGN KEY ("Phone") REFERENCES "CostumerPhone"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_Phone_fkey" FOREIGN KEY ("Phone") REFERENCES "CostumerPhone"("phone") ON DELETE RESTRICT ON UPDATE CASCADE;
