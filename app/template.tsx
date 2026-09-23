import PageCurtain from "@/components/motion/PageCurtain";

// Templates remount on every navigation, which is what triggers the curtain.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageCurtain />
      {children}
    </>
  );
}
