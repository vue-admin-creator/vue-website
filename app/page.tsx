import type { Metadata } from "next";
import { VueSite } from "./vue-site";

export const metadata: Metadata = {
  title: "VUE 臻域國際不動產｜一站式全球置產",
  description:
    "專注留學生家庭與國際家庭的全球置產規劃，以遠見、極致與專業，為您的每一份海外資產穩健護航。",
};

export default function Home() {
  return <VueSite />;
}
