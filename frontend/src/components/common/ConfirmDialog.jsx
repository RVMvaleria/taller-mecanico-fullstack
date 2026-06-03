import Modal from './Modal.jsx';

export default function ConfirmDialog({ open, title = 'Confirmar acción', message, confirmText = 'Confirmar', cancelText = 'Cancelar', loading, danger = false, onConfirm, onCancel }) {
  return (
    <Modal open={open} title={title} onClose={onCancel} size="max-w-md">
      <p className="text-sm leading-6 text-slate-600">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-secondary" disabled={loading}>{cancelText}</button>
        <button type="button" onClick={onConfirm} className={danger ? 'btn-danger' : 'btn-primary'} disabled={loading}>
          {loading ? 'Procesando...' : confirmText}
        </button>
      </div>
    </Modal>
  );
}
