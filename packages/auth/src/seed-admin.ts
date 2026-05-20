import { auth } from "@Depilacion/auth";
import { prisma } from "@Depilacion/db";

async function run() {
  const email = "zafirobeauty@gmail.com";
  const password = "password123";
  const name = "Admin Zafiro";

  console.log("Creando admin...");

  try {
    // Delete if exists so we can recreate
    await prisma.user.deleteMany({ where: { email } });

    // Let better-auth handle hashing and creation
    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      }
    });

    if (res.user) {
      // Update role to admin
      await prisma.user.update({
        where: { id: res.user.id },
        data: { role: "ADMIN" }
      });
      console.log("✅ Admin creado correctamente.");
      console.log("Email: ", email);
      console.log("Password: ", password);
    } else {
      console.error("No se pudo crear el usuario");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

run();
