import dynamic from "next/dynamic";

const DynamicForm = dynamic(() => import("../components/Form"), {
  ssr: false,
});

export default function Home() {
  return <DynamicForm />;
}
