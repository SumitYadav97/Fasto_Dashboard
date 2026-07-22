// app/page.js

import LoginForm from "./(dashboard)/auth/login/page";

export default function Home() {
  return (
    <main className="container py-5">
      <LoginForm />
    </main>
  );
}