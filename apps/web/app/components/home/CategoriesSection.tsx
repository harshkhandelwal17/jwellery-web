import CategoriesClient from "./CategoriesClient";

interface Props {
  categoryImages?: Record<string, string | undefined>;
}

export default function CategoriesSection({ categoryImages = {} }: Props) {
  return <CategoriesClient categoryImages={categoryImages} />;
}
