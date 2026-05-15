import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export default function SignUpForm({
  onSwitchToSignIn,
}: {
  onSwitchToSignIn: () => void;
}) {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
        },
        {
          onSuccess: () => {
            navigate("/dashboard");
            toast.success("Cuenta creada exitosamente");
          },
          onError: (error) => {
            toast.error(error.error.message || "Error al registrarse");
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(2, "El nombre es muy corto"),
        email: z.string().email("Email inválido"),
        password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
      }),
    },
  });

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-brand-dark/5 p-10 flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-[#fdf6f5] border border-brand-dark/10 p-1 mb-6 overflow-hidden flex items-center justify-center shadow-inner">
         <div className="w-full h-full rounded-full border border-brand-dark/5 flex flex-col items-center justify-center bg-white">
            <span className="font-serif text-[10px] italic text-brand-dark leading-none">Zafiro</span>
            <span className="font-serif text-[10px] italic text-brand-muted leading-none">Beauty</span>
         </div>
      </div>

      <h1 className="font-serif text-3xl text-brand-text mb-2">Crear Cuenta</h1>
      <p className="font-serif italic text-brand-muted text-sm mb-10 text-center">
        Comenzá tu transformación ♡
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
          <form.Field name="name">
            {(field) => (
              <input
                id={field.name}
                name={field.name}
                type="text"
                placeholder="Nombre completo"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full bg-[#fdf6f5] border-none rounded-2xl py-4 px-6 text-brand-text placeholder:text-brand-muted/50 focus:ring-2 focus:ring-brand-muted/20 outline-none transition-all"
              />
            )}
          </form.Field>
        </div>

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
              {state.isSubmitting ? "REGISTRANDO..." : "REGISTRARSE"}
            </button>
          )}
        </form.Subscribe>
      </form>

      <div className="mt-8 text-center">
        <button
          onClick={onSwitchToSignIn}
          className="text-[13px] text-brand-text/70 hover:text-brand-dark transition-colors"
        >
          ¿Ya tenés cuenta? <span className="font-semibold">Ingresar</span>
        </button>
      </div>
    </div>
  );
}
