import { Review } from "../model/reviewModel";
import { Submission } from "../model/submissionModel";
import { Comment } from "../model/commentModel";

export function calculateAverageReviewTime(
  submissions: Submission[],
  reviews: Review[]
): number {
  let totalHours = 0;
  let count = 0;

  submissions.forEach((sub) => {
    const relatedReviews = reviews
      .filter((rev) => rev.submission_id === sub.id)
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );

    if (relatedReviews.length > 0) {
      const reviewTime =
        (new Date(relatedReviews[0].created_at).getTime() -
          new Date(sub.created_at).getTime()) /
        36e5; 

      totalHours += reviewTime;
      count++;
    }
  });

  return count === 0 ? 0 : totalHours / count;
}



export function calculateApprovalRejectionRate(reviews: Review[]) {
  const total = reviews.length;

  if (total === 0) {
    return { approvalRate: 0, rejectionRate: 0 };
  }

  const approved = reviews.filter((r) => r.decision === "approved").length;
  const rejected = reviews.filter((r) => r.decision === "rejected").length;

  return {
    approvalRate: (approved / total) * 100,
    rejectionRate: (rejected / total) * 100,
  };
}

export function calculateReviewerActivity(reviews: Review[]) {
  const activity: Record<number, number> = {};

  reviews.forEach((r) => {
    activity[r.reviewer_id] = (activity[r.reviewer_id] || 0) + 1;
  });

  return activity;
}



export function calculateTopCommentedSubmissions(comments: Comment[]) {
  const counter: Record<number, number> = {};

  comments.forEach((c) => {
    counter[c.submission_id] = (counter[c.submission_id] || 0) + 1;
  });

  const sorted = Object.entries(counter)
    .map(([submission_id, count]) => ({
      submission_id: Number(submission_id),
      commentCount: count,
    }))
    .sort((a, b) => b.commentCount - a.commentCount);

  return sorted;
}
