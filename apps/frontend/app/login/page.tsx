import { LoginForm } from "@/components/login-form";

const containerClass = "bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10";
const wrapperClass = "w-full max-w-sm md:max-w-3xl";

export default function LoginPage() {
  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        <LoginForm />
      </div>
    </div>
  )
}
