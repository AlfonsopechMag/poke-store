import css from "./modal.module.scss";

export default function Modal({ handleClose, show, children, cartItems }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className={cartItems ? css.modal_cart : css.modal_main}>
        {children}
        <div className={css.close_row}>
          <button type="button" className={css.close_button} onClick={handleClose}>
            Close
          </button>
        </div>        
      </section>
    </div>
  );
};
