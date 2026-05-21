import { prisma } from "../src/prisma.js";

async function run() {
  const email = "zafirobeauty@gmail.com";
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("❌ User not found!");
    return;
  }

  console.log("✅ User found:", user.id);

  // Check Account table
  // Note: Better-auth usually calls it 'account' or 'Account' in Prisma schema.
  // Let's find what tables are in the prisma client.
  const accounts = await (prisma as any).account.findMany({
    where: { userId: user.id },
  });

  if (accounts.length === 0) {
    console.log("❌ No Better Auth accounts found for this user!");
  } else {
    console.log(`✅ Found ${accounts.length} Better Auth accounts:`);
    accounts.forEach((acc: any, i: number) => {
      console.log(`Account ${i + 1}:`);
      console.log("- Provider:", acc.provider);
      console.log("- Account ID:", acc.id);
      console.log("- Password hash exists:", !acc.password); // Better Auth password field might be 'password'
    });
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
