import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const confirmDialog = async ({
  title = 'Are you sure?',
  text = "You won't be able to revert this!",
  icon = 'warning',
  confirmButtonText = 'Yes, proceed',
  cancelButtonText = 'Cancel',
  confirmButtonColor = '#4f46e5', // Indigo-600 (Primary)
}: {
  title?: string
  text?: string
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question'
  confirmButtonText?: string
  cancelButtonText?: string
  confirmButtonColor?: string
}) => {
  return MySwal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor,
    cancelButtonColor: '#9ca3af', // Gray-400
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    customClass: {
      popup: 'rounded-2xl border-none',
      confirmButton: 'px-6 py-2.5 rounded-xl font-bold transition-all shadow-md',
      cancelButton: 'px-6 py-2.5 rounded-xl font-bold transition-all',
    },
  })
}

export default MySwal
