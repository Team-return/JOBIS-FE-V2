import { useReviewDetail, useReviewList } from "@jobis/api";
import {
  Container,
  Flex,
  ReviewAccordion,
  Skeleton,
  Text,
  useTheme
} from "@jobis/design-system";
import { useLoaderData } from "react-router-dom";
import type { LoaderData } from "apps/student/src/utils";

const ReviewItem = ({
  reviewId,
  year,
  major,
  writer
}: {
  reviewId: number;
  year: number;
  major: string;
  writer: string;
}) => {
  const { data, isPending } = useReviewDetail(String(reviewId));

  if (isPending || !data) {
    return <Skeleton width="100%" height={52} $radius={8} />;
  }

  return (
    <ReviewAccordion
      question={data.question}
      answer={data.answer}
      year={year}
      major={major}
      writer={writer}
    />
  );
};

export const CompanyInterviewReview = () => {
  const { params: companyId } = useLoaderData() as LoaderData<number>;
  const { currentTheme: theme } = useTheme();

  const { data: reviewListData, isPending } = useReviewList({
    company_id: companyId
  });

  const reviews = reviewListData?.reviews ?? [];
  const isEmpty = !isPending && reviews.length === 0;

  return (
    <Container $maxWidth={960} $padding={[56, 0, 120, 0]}>
      <Flex $direction="column" $align="center" $gap={28}>
        <Text $size="h4" $weight="bold" $color={theme.color.grayScale[90]}>
          면접 후기
        </Text>

        {isPending && (
          <Flex $direction="column" $gap={8} style={{ width: "100%" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} width="100%" height={52} $radius={8} />
            ))}
          </Flex>
        )}

        {isEmpty && (
          <Flex $justify="center" $align="center" style={{ padding: "48px 0" }}>
            <Text
              $size="h6"
              $weight="regular"
              $color={theme.color.grayScale[60]}
            >
              등록된 면접 후기가 없습니다.
            </Text>
          </Flex>
        )}

        {reviews.length > 0 && (
          <Flex $direction="column" $gap={8} style={{ width: "100%" }}>
            {reviews.map(review => (
              <ReviewItem
                key={review.review_id}
                reviewId={review.review_id}
                year={review.year}
                major={review.major}
                writer={review.writer}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Container>
  );
};
