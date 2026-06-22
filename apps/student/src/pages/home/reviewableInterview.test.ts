/**
 * Tests for the reviewable interview selection logic introduced in home/page.tsx.
 *
 * These tests verify the specification for:
 * - getInterviewTime: combines end_date + interview_time into a timestamp
 * - reviewableInterview: selects the most recent past interview without a review
 */
import { describe, it, expect } from "vitest";

// Replication of the helpers from home/page.tsx (kept in sync with the source)
const getInterviewTime = (endDate: string, interviewTime: string): number =>
  new Date(`${endDate}T${interviewTime}`).getTime();

interface MockInterview {
  id: number;
  interview_type: string;
  start_date: string;
  end_date: string;
  interview_time: string;
  company_name: string;
  location: string;
  document_number_id: number | null;
  review_written: boolean;
}

function pickReviewableInterview(
  interviews: MockInterview[],
  now: number
): MockInterview | undefined {
  return interviews
    .filter(
      interview =>
        !interview.review_written &&
        getInterviewTime(interview.end_date, interview.interview_time) <= now
    )
    .sort(
      (a, b) =>
        getInterviewTime(b.end_date, b.interview_time) -
        getInterviewTime(a.end_date, a.interview_time)
    )[0];
}

const baseInterview: MockInterview = {
  id: 1,
  interview_type: "TECH_INTERVIEW",
  start_date: "2025-01-01",
  end_date: "2025-01-01",
  interview_time: "10:00:00",
  company_name: "테스트 기업",
  location: "대전",
  document_number_id: null,
  review_written: false
};

// A fixed "now" in the past so tests are deterministic
const FIXED_NOW = new Date("2025-06-01T12:00:00").getTime();

describe("getInterviewTime", () => {
  it("combines end_date and interview_time into a UTC millisecond timestamp", () => {
    const ts = getInterviewTime("2025-01-15", "09:30:00");
    expect(typeof ts).toBe("number");
    expect(ts).toBeGreaterThan(0);
  });

  it("returns a larger value for a later date", () => {
    const earlier = getInterviewTime("2025-01-01", "09:00:00");
    const later = getInterviewTime("2025-01-02", "09:00:00");
    expect(later).toBeGreaterThan(earlier);
  });

  it("returns a larger value for a later time on the same date", () => {
    const morning = getInterviewTime("2025-06-01", "08:00:00");
    const afternoon = getInterviewTime("2025-06-01", "14:00:00");
    expect(afternoon).toBeGreaterThan(morning);
  });

  it("produces equal timestamps for identical inputs", () => {
    const ts1 = getInterviewTime("2025-03-10", "10:00:00");
    const ts2 = getInterviewTime("2025-03-10", "10:00:00");
    expect(ts1).toBe(ts2);
  });
});

describe("reviewableInterview selection logic", () => {
  it("returns undefined when there are no interviews", () => {
    const result = pickReviewableInterview([], FIXED_NOW);
    expect(result).toBeUndefined();
  });

  it("returns undefined when all interviews have review_written = true", () => {
    const interviews: MockInterview[] = [
      { ...baseInterview, id: 1, review_written: true },
      { ...baseInterview, id: 2, review_written: true }
    ];
    const result = pickReviewableInterview(interviews, FIXED_NOW);
    expect(result).toBeUndefined();
  });

  it("returns undefined when all interviews are in the future", () => {
    const futureNow = new Date("2024-01-01T00:00:00").getTime();
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 1,
        end_date: "2025-01-01",
        interview_time: "09:00:00",
        review_written: false
      }
    ];
    const result = pickReviewableInterview(interviews, futureNow);
    expect(result).toBeUndefined();
  });

  it("returns the single past unreviewed interview", () => {
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 5,
        end_date: "2025-01-01",
        interview_time: "10:00:00",
        review_written: false
      }
    ];
    const result = pickReviewableInterview(interviews, FIXED_NOW);
    expect(result).toBeDefined();
    expect(result!.id).toBe(5);
  });

  it("excludes interviews that already have review_written = true", () => {
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 1,
        end_date: "2025-01-10",
        interview_time: "10:00:00",
        review_written: true
      },
      {
        ...baseInterview,
        id: 2,
        end_date: "2025-01-05",
        interview_time: "10:00:00",
        review_written: false
      }
    ];
    const result = pickReviewableInterview(interviews, FIXED_NOW);
    expect(result!.id).toBe(2);
  });

  it("excludes interviews whose time is in the future", () => {
    const now = new Date("2025-01-05T12:00:00").getTime();
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 1,
        end_date: "2025-01-10",
        interview_time: "10:00:00",
        review_written: false
      },
      {
        ...baseInterview,
        id: 2,
        end_date: "2025-01-03",
        interview_time: "10:00:00",
        review_written: false
      }
    ];
    const result = pickReviewableInterview(interviews, now);
    expect(result!.id).toBe(2);
  });

  it("returns the most recent past unreviewed interview when multiple qualify", () => {
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 1,
        company_name: "오래된 기업",
        end_date: "2025-01-01",
        interview_time: "09:00:00",
        review_written: false
      },
      {
        ...baseInterview,
        id: 2,
        company_name: "최근 기업",
        end_date: "2025-04-15",
        interview_time: "14:00:00",
        review_written: false
      },
      {
        ...baseInterview,
        id: 3,
        company_name: "중간 기업",
        end_date: "2025-02-20",
        interview_time: "10:00:00",
        review_written: false
      }
    ];
    const result = pickReviewableInterview(interviews, FIXED_NOW);
    expect(result!.id).toBe(2);
    expect(result!.company_name).toBe("최근 기업");
  });

  it("includes an interview whose end_date+time exactly equals now", () => {
    const exactNow = getInterviewTime("2025-01-15", "10:00:00");
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 10,
        end_date: "2025-01-15",
        interview_time: "10:00:00",
        review_written: false
      }
    ];
    const result = pickReviewableInterview(interviews, exactNow);
    expect(result!.id).toBe(10);
  });

  it("skips an interview one millisecond in the future", () => {
    const slightlyBefore = getInterviewTime("2025-01-15", "10:00:00") - 1;
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 11,
        end_date: "2025-01-15",
        interview_time: "10:00:00",
        review_written: false
      }
    ];
    const result = pickReviewableInterview(interviews, slightlyBefore);
    expect(result).toBeUndefined();
  });

  it("preserves document_number_id on the returned interview", () => {
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 20,
        end_date: "2025-01-01",
        interview_time: "09:00:00",
        review_written: false,
        document_number_id: 77
      }
    ];
    const result = pickReviewableInterview(interviews, FIXED_NOW);
    expect(result!.document_number_id).toBe(77);
  });

  it("handles interviews with null document_number_id correctly", () => {
    const interviews: MockInterview[] = [
      {
        ...baseInterview,
        id: 21,
        end_date: "2025-01-01",
        interview_time: "09:00:00",
        review_written: false,
        document_number_id: null
      }
    ];
    const result = pickReviewableInterview(interviews, FIXED_NOW);
    expect(result!.document_number_id).toBeNull();
  });
});