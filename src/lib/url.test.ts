import { describe, expect, it } from "vitest";
import { contact } from "@/content";
import { heroView, seoView } from "@/lib/selectors";
import { absoluteAsset, asset, basePath, siteUrl } from "@/lib/url";

describe("url helpers with empty basePath", () => {
  it("defaults NEXT_PUBLIC_BASE_PATH to an empty string", () => {
    expect(basePath).toBe("");
    expect(process.env.NEXT_PUBLIC_BASE_PATH ?? "").toBe("");
  });

  it("keeps public assets root-relative", () => {
    expect(asset("/resume.pdf")).toBe("/resume.pdf");
    expect(asset("og.png")).toBe("/og.png");
    expect(asset(contact.resumePdf)).toBe("/resume.pdf");
  });

  it("resolves resume and OG through selectors without a /Jobhuntsite prefix", () => {
    expect(heroView.primaryCta.href).toBe("/resume.pdf");
    expect(heroView.primaryCta.href).not.toContain("/Jobhuntsite");
    expect(seoView.ogImage.url).toBe(absoluteAsset("/og.png"));
    expect(seoView.ogImage.url).not.toContain("/Jobhuntsite");
    expect(seoView.siteUrl.href).toBe(siteUrl.href);
    expect(siteUrl.pathname).toBe("/");
  });
});
