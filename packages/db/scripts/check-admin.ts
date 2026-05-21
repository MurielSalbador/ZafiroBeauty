import { prisma } from "../src/prisma.js";

async function run() {
  const email = "zafirobeauty@gmail.com";
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("❌ Admin user not found!");
  } else {
    console.log("✅ Admin user found:");
    console.log("- ID:", user.id);
    console.log("- Email:", user.email);
    console.log("- Name:", user.name);
    console.log("- Role:", user.role);
    console.log("- Password (first 10 chars):", user.password?.substring(0, 15));
    console.log("- Is hashed:", user.password?.startsWith("$") || user.password?.startsWith("scrypt:"));
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
