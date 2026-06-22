import { describe, it, expect } from "vitest";
import { interviewsKeys } from "./keys";

describe("interviewsKeys", () => {
  describe("studentInterviews", () => {
    it("returns the correct query key array", () => {
      const key = interviewsKeys.studentInterviews();
      expect(key).toEqual(["student-interviews"]);
    });

    it("returns an array with a single string element", () => {
      const key = interviewsKeys.studentInterviews();
      expect(key).toHaveLength(1);
      expect(key[0]).toBe("student-interviews");
    });

    it("returns a new array each invocation", () => {
      const key1 = interviewsKeys.studentInterviews();
      const key2 = interviewsKeys.studentInterviews();
      expect(key1).toEqual(key2);
      expect(key1).not.toBe(key2);
    });

    it("is a function", () => {
      expect(typeof interviewsKeys.studentInterviews).toBe("function");
    });
  });
});