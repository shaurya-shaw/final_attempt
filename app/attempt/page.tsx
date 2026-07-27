import DraggableCardDemo from "@/components/choose-attempt/attempt";

export default function AttemptPage() {
  return (
    <>
      <p className="pt-10 text-center text-3xl font-caveat text-neutral-400 md:text-4xl">
        Select your attempt :
      </p>
      <DraggableCardDemo />
    </>
  );
}
