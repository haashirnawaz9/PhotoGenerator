import { ClerkLoaded } from "@clerk/nextjs";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <div className="flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
      </div>
    </ClerkLoaded>
  );
}

export default DashboardLayout;
