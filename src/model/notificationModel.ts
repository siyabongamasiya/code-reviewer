interface Notification {
  user_id: number;
  type: string;
  message: string;
  is_read: boolean;
}

// Notification
// id (PK)
// user_id (FK → User.id)
// type (comment, status_change, review)
// message
// is_read
