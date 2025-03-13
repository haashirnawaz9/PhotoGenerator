import Footer from "@/components/ui/footer";
import { ClerkLoaded } from "@clerk/nextjs";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <div className="flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ClerkLoaded>
  );
}

export default DashboardLayout;
