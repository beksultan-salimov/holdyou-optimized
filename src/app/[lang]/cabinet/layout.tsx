import { Metadata } from "next";
import Header from "@/cabinet/views/Header/Header";
import Sidebar from "@/cabinet/views/Sidebar/Sidebar";
import GlobalCabinetComponents from "@/views/GlobalCabinetComponents";
import '@/cabinet/static/scss/main.scss'

export const metadata: Metadata = {
  title: 'Кабінет HoldYou',
  description: '',
  keywords: 'психолог, психотерапевт, психолог онлайн, психолог Київ, консультація психолога, записатися до психолога, допомога психолога, онлайн допомогу психолога',
};

export default function CabinetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="cabinet cabinet-layout">
      <div className="cabinet-wrapper">
        <Header />
        <div className="cabinet-body">
          <aside className="cabinet-sidebar">
            <Sidebar />
          </aside>
          <main className="cabinet-main">
            {children}
          </main>
        </div>
      </div>
      <GlobalCabinetComponents />
    </div>
  );
}
