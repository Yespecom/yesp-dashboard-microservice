// This file can be used to store various constants like subscription statuses,
// payment statuses, roles, etc.

const SUBSCRIPTION_STATUSES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  TRIAL: "trial",
  CANCELLED: "cancelled",
}

const PAYMENT_STATUSES = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
}

module.exports = {
  SUBSCRIPTION_STATUSES,
  PAYMENT_STATUSES,
  // Add other constants as needed
}
