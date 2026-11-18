import type { PurchaseButtonProps } from "../types";

export function PurchaseButton({
  isLoading,
  isSoldOut,
  isSuccess,
  onPurchase,
}: PurchaseButtonProps) {
  return (
    <button
      type="button"
      className="btn btn-primary btn-lg buy-button w-100"
      onClick={onPurchase}
      disabled={isLoading || isSoldOut || isSuccess}
    >
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
          />
          Processing...
        </>
      ) : isSoldOut ? (
        "Sold Out"
      ) : isSuccess ? (
        "Ticket Purchased"
      ) : (
        "Buy Now"
      )}
    </button>
  );
}
