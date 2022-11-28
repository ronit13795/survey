import dynamic from "next/dynamic";

const DynamicSurvey = dynamic(() => import("../components/Admin"), {
  ssr: false,
});

export default function Home() {
  return <DynamicSurvey />;
}
