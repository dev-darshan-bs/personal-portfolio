import { Metadata } from "next";

import { ErrorPage } from "@/components/layouts/error-page";

export const metadata: Metadata = {
  title: "404 | Redacted",
};

export default function NotFound() {
  return (
    <ErrorPage
      status={404}
      summary="Error: redacted"
      message="This page could not be found. It either doesn’t exist or was deleted. Or perhaps you don’t exist and this webpage couldn’t find you."
    />
  );
}
