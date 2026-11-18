import type { PurchaseErrorProps } from "../types";

export function PurchaseError({
  message,
  buttonText,
  onRetry,
}: PurchaseErrorProps) {
  return (
    <div className="alert alert-danger mt-4" role="alert">
      {message}

      <button
        type="button"
        className="btn btn-sm btn-outline-danger ms-3"
        onClick={onRetry}
      >
        {buttonText}
      </button>
    </div>
  );
}
