
import ButtonLink from "@/components/Elements/ButtonLink";

const LoginPopup = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white p-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-popup-title"
      >
        <h2 id="login-popup-title" className="text-lg font-semibold">
          Login required
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Please login first to add products to your cart.
        </p>

        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <ButtonLink to="/login">Login</ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
