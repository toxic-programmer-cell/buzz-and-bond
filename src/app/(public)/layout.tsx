import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-black min-h-screen text-white flex flex-col justify-between">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
