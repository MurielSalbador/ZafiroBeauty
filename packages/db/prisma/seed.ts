import { prisma } from '../src/prisma.js';

async function main() {
  console.log('Seeding database...');
  
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'zafirobeauty@gmail.com' },
    update: {
      role: 'ADMIN',
    },
    create: {
      email: 'zafirobeauty@gmail.com',
      password: 'Zafiro@beauty', // Note: Ideally hashed, but following user request for seed
      name: 'Admin Zafiro',
      role: 'ADMIN',
    },
  });

  // Services Data
  const services = [
    // COMBOS
    { name: "Bozo + Mentón", price: 13000, category: "COMBO" },
    { name: "Rostro completo", price: 17000, category: "COMBO" },
    { name: "Cavado completo + Axilas + Brazos", price: 24000, category: "COMBO" },
    { name: "Cavado completo + Axilas + Media pierna", price: 24000, category: "COMBO" },
    { name: "Rostro + Axilas + Media pierna", price: 26000, category: "COMBO" },
    { name: "Cavado bikini + Glúteos + Tira de cola", price: 18000, category: "COMBO" },
    { name: "Bozo + Axilas + Media pierna", price: 20000, category: "COMBO" },
    { name: "Piernas completas + Axilas", price: 24000, category: "COMBO" },
    { name: "Piernas completas + Axilas + Cavado bikini", price: 26000, category: "COMBO" },
    { name: "Rostro completo + Axilas", price: 22000, category: "COMBO" },
    { name: "Cuerpo Completo (Promo)", price: 38000, category: "COMBO" },
    { name: "Piernas completas", price: 24000, category: "COMBO" },
    { name: "Pecho + Abdomen", price: 24000, category: "COMBO" },
    { name: "Pecho + Abdomen + Espalda", price: 30000, category: "COMBO" },
    { name: "Rostro + Axilas", price: 16000, category: "COMBO" },
    { name: "Pecho", price: 13000, category: "COMBO" },
    { name: "Espalda + Medio brazo", price: 22000, category: "COMBO" },
    { name: "Pecho + Abdomen + Medio brazo", price: 26000, category: "COMBO" },
    { name: "Espalda + Hombros + Brazos", price: 26000, category: "COMBO" },
    { name: "Pecho + Abdomen + Brazos", price: 26000, category: "COMBO" },
    { name: "Espalda + Brazos + Axilas", price: 26000, category: "COMBO" },
    { name: "Cuerpo Completo Masculino", price: 43000, category: "COMBO" },

    // COMBOS INICIO
    { name: "Bozo + Axilas", price: 10500, category: "COMBO_INICIO" },
    { name: "Axilas + Media Pierna", price: 13500, category: "COMBO_INICIO" },
    { name: "Cavado Simple + Axilas", price: 14500, category: "COMBO_INICIO" },
    { name: "Piernas Completas + Axilas + Bozo", price: 19500, category: "COMBO_INICIO" },
    { name: "Pecho + Abdomen (Inicio)", price: 15000, category: "COMBO_INICIO" },
    { name: "Espalda Completa (Inicio)", price: 17500, category: "COMBO_INICIO" },
    { name: "Axilas + Pecho (Inicio)", price: 13000, category: "COMBO_INICIO" },
    { name: "Piernas Completas (Inicio)", price: 20500, category: "COMBO_INICIO" },

    // ZONAS SEPARADAS
    { name: "Bozo", price: 5000, category: "ZONAS" },
    { name: "Mentón", price: 5000, category: "ZONAS" },
    { name: "Axilas", price: 7000, category: "ZONAS" },
    { name: "Media pierna", price: 9000, category: "ZONAS" },
    { name: "Piernas completas", price: 14000, category: "ZONAS" },
    { name: "Cavado simple", price: 8000, category: "ZONAS" },
    { name: "Cavado completo", price: 11000, category: "ZONAS" },
    { name: "Tira de cola", price: 6000, category: "ZONAS" },
    { name: "Glúteos", price: 8000, category: "ZONAS" },
    { name: "Brazos completos", price: 18000, category: "ZONAS" },
    { name: "Medio brazo", price: 12000, category: "ZONAS" },
    { name: "Espalda completa", price: 20000, category: "ZONAS" },
    { name: "Pecho (Zona)", price: 13000, category: "ZONAS" },
    { name: "Abdomen (Zona)", price: 11000, category: "ZONAS" },
    { name: "Hombros", price: 8000, category: "ZONAS" },

    // FACIAL
    { name: "Limpieza facial profunda", price: 15000, category: "FACIAL" },
    { name: "Hidratación facial", price: 12000, category: "FACIAL" },
    { name: "Punta diamante + Hidratación", price: 18000, category: "FACIAL" },
  ];

  // Clean existing services to avoid duplicates on re-seed
  await prisma.service.deleteMany({});

  for (const service of services) {
    await prisma.service.create({
      data: service as any,
    });
  }

  // Create default Schedule (Mon-Fri 09:00 - 18:00)
  const defaultSchedule = [];
  for (let i = 1; i <= 5; i++) {
    defaultSchedule.push({
      dayOfWeek: i,
      startTime: "09:00",
      endTime: "18:00",
      slotDuration: 60,
    });
  }
  
  await prisma.scheduleConfig.deleteMany({});
  for (const sched of defaultSchedule) {
    await prisma.scheduleConfig.create({
      data: sched,
    });
  }

  console.log('Database seeded successfully!', { 
    admin: admin.email, 
    servicesCount: services.length 
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
