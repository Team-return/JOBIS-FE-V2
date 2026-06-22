import { describe, it, expect } from "vitest";
import { connectReviewLoader } from "./loader";

function makeRequest(url: string): Request {
  return new Request(url);
}

describe("connectReviewLoader", () => {
  describe("companyName param", () => {
    it("returns the companyName from the URL search params", async () => {
      const request = makeRequest(
        "https://example.com?companyName=삼성전자"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.companyName).toBe("삼성전자");
    });

    it("defaults companyName to '회사' when the param is absent", async () => {
      const request = makeRequest("https://example.com");
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.companyName).toBe("회사");
    });

    it("defaults companyName to '회사' when companyName param is an empty string", async () => {
      const request = makeRequest(
        "https://example.com?companyName="
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.companyName).toBe("회사");
    });

    it("returns companyName with spaces preserved", async () => {
      const request = makeRequest(
        "https://example.com?companyName=DS+Mentoring"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.companyName).toBe("DS Mentoring");
    });
  });

  describe("interviewId param", () => {
    it("returns interviewId from the URL search params", async () => {
      const request = makeRequest(
        "https://example.com?companyName=TechCorp&interviewId=42"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.interviewId).toBe("42");
    });

    it("returns undefined for interviewId when the param is absent", async () => {
      const request = makeRequest(
        "https://example.com?companyName=TechCorp"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.interviewId).toBeUndefined();
    });

    it("returns undefined for interviewId when the param is an empty string", async () => {
      const request = makeRequest(
        "https://example.com?companyName=TechCorp&interviewId="
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.interviewId).toBeUndefined();
    });
  });

  describe("documentNumberId param", () => {
    it("returns documentNumberId from the URL search params", async () => {
      const request = makeRequest(
        "https://example.com?companyName=TechCorp&documentNumberId=99"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.documentNumberId).toBe("99");
    });

    it("returns undefined for documentNumberId when the param is absent", async () => {
      const request = makeRequest(
        "https://example.com?companyName=TechCorp"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.documentNumberId).toBeUndefined();
    });

    it("returns undefined for documentNumberId when the param is empty string", async () => {
      const request = makeRequest(
        "https://example.com?companyName=TechCorp&documentNumberId="
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.documentNumberId).toBeUndefined();
    });
  });

  describe("combined params", () => {
    it("returns all three params when all are provided", async () => {
      const request = makeRequest(
        "https://example.com?companyName=카카오&interviewId=7&documentNumberId=13"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result).toEqual({
        companyName: "카카오",
        interviewId: "7",
        documentNumberId: "13"
      });
    });

    it("returns default companyName with interviewId when companyName is missing", async () => {
      const request = makeRequest(
        "https://example.com?interviewId=5&documentNumberId=10"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.companyName).toBe("회사");
      expect(result.interviewId).toBe("5");
      expect(result.documentNumberId).toBe("10");
    });

    it("returns undefined for both optional params when only companyName is provided", async () => {
      const request = makeRequest(
        "https://example.com?companyName=네이버"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result.companyName).toBe("네이버");
      expect(result.interviewId).toBeUndefined();
      expect(result.documentNumberId).toBeUndefined();
    });

    it("returns a plain object matching the ConnectReviewLoaderData shape", async () => {
      const request = makeRequest(
        "https://example.com?companyName=LG&interviewId=1"
      );
      const result = await connectReviewLoader({
        request,
        params: {},
        context: {}
      });
      expect(result).toHaveProperty("companyName");
      expect(result).toHaveProperty("interviewId");
      expect(result).toHaveProperty("documentNumberId");
    });
  });
});