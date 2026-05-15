import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { useEffect } from "react";
import { Button } from "./ui/button";

export default function SignInForm({
  onSwitchToSignUp,
}: {
  onSwitchToSignUp: () => void;
}) {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: localStorage.getItem("remembered_email") || "",
      password: "",
      rememberMe: true,
    },
    onSubmit: async ({ value }) => {
      if (value.rememberMe) {
        localStorage.setItem("remembered_email", value.email);
      } else {
        localStorage.removeItem("remembered_email");
      }

      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: (ctx) => {
            const user = ctx.data.user as any;
            if (user.role === 'ADMIN') {
              navigate("/admin");
            } else {
              navigate("/dashboard");
            }
            toast.success("Ingreso exitoso");
          },
          onError: (error) => {
            toast.error(error.error.message || "Error al ingresar");
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
        rememberMe: z.boolean(),
      }),
    },
  });

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-brand-dark/5 p-10 flex flex-col items-center">
      {/* Logo */}
      <div className="w-24 h-24 rounded-full bg-[#fdf6f5] border border-brand-dark/10 p-1 mb-6 overflow-hidden flex items-center justify-center shadow-inner">
         <div className="w-full h-full rounded-full border border-brand-dark/5 flex flex-col items-center justify-center bg-white">
            <span className="font-serif text-[10px] italic text-brand-dark leading-none">Zafiro</span>
            <span className="font-serif text-[10px] italic text-brand-muted leading-none">Beauty</span>
         </div>
      </div>

      <h1 className="font-serif text-3xl text-brand-text mb-2">Ingresar</h1>
      <p className="font-serif italic text-brand-muted text-sm mb-10 text-center">
        Tu mejor versión empieza hoy ♡
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="w-full space-y-5"
      >
        <div className="space-y-1">
          <form.Field name="email">
            {(field) => (
              <input
                id={field.name}
                name={field.name}
                type="email"
                placeholder="Email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full bg-[#fdf6f5] border-none rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/50 focus:ring-2 focus:ring-brand-muted/20 outline-none transition-all"
              />
            )}
          </form.Field>
        </div>

        <div className="space-y-1">
          <form.Field name="password">
            {(field) => (
              <input
                id={field.name}
                name={field.name}
                type="password"
                placeholder="Contraseña (mín 6)"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full bg-[#fdf6f5] border-none rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/50 focus:ring-2 focus:ring-brand-muted/20 outline-none transition-all"
              />
            )}
          </form.Field>
        </div>

        <form.Subscribe>
          {(state) => (
            <button
              type="submit"
              disabled={state.isSubmitting}
              className="w-full bg-[#7b5c4e] text-white py-4 rounded-2xl font-sans text-xs tracking-[0.2em] font-bold hover:bg-[#5c4033] transition-all disabled:opacity-50 mt-4 shadow-lg shadow-brand-dark/10"
            >
              {state.isSubmitting ? "INGRESANDO..." : "INGRESAR"}
            </button>
          )}
        </form.Subscribe>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onSwitchToSignUp}
          className="text-[13px] text-brand-text/70 hover:text-brand-dark transition-colors"
        >
          ¿No tenés cuenta? <span className="font-semibold">Crear una</span>
        </button>
      </div>
    </div>
  );
}
